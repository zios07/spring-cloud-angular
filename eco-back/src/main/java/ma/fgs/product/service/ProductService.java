package ma.fgs.product.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.criteria.Predicate;

import org.apache.commons.io.FilenameUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import ma.fgs.product.domain.Product;
import ma.fgs.product.domain.dto.ProductSearchDto;
import ma.fgs.product.proxy.AttachmentProxy;
import ma.fgs.product.publisher.AttachmentPublisher;
import ma.fgs.product.repository.ProductRepository;
import ma.fgs.product.rest.feign.AttachmentFeignClient;
import ma.fgs.product.service.api.IProductService;
import ma.fgs.product.service.exception.NotFoundException;

@Service
public class ProductService implements IProductService {

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);

	private ProductRepository repo;
	private AttachmentPublisher attachmentPublisher;
	private AttachmentFeignClient attachmentFeignClient;

	public ProductService(ProductRepository repo, AttachmentPublisher attachmentPublisher,
			AttachmentFeignClient attachmentFeignClient) {
		this.repo = repo;
		this.attachmentPublisher = attachmentPublisher;
		this.attachmentFeignClient = attachmentFeignClient;
	}

	@Override
	public Product addProduct(Product product, MultipartFile[] files) throws IOException {
		product.setAddedDate(new Date());
		Product createdProduct = repo.save(product);
		publishAttachment(product, files);
		return createdProduct;
	}

	public void publishAttachment(Product product, MultipartFile[] files) throws IOException {
		List<AttachmentProxy> attachments = new ArrayList<>();
		for (MultipartFile file : files) {
			attachments.add(attachmentFromMultipartFile(product, file));
		}
		if (!attachments.isEmpty()) {
			attachmentPublisher.send(attachments);
		}
	}

	@Override
	public Product findProduct(String id) throws NotFoundException {
		if (!repo.existsById(id))
			throw new NotFoundException("PRODUCT.FIND.ERROR", "Product does not exist :" + id);
		Product product = repo.findById(id).get();
		fetchProductsAttachments(Arrays.asList(product));
		return product;
	}

	@Override
	public Page<Product> findAllProducts(int page, int size) {
		Page<Product> products = repo.findAll(PageRequest.of(page, size));
		fetchProductsAttachments(products.getContent());
		return products;
	}

	@Override
	public void deleteProduct(String id) throws NotFoundException {
		if (!repo.existsById(id))
			throw new NotFoundException("PRODUCT.DELETE.ERROR", "Product does not exist :" + id);
		repo.deleteById(id);
	}

	@Override
	public Page<Product> searchProducts(ProductSearchDto dto, int page, int size) {
		Page<Product> products = repo.findAll((root, cq, cb) -> {
			final Collection<Predicate> predicates = new ArrayList<>();
			Collection<Predicate> brandPredicates = new ArrayList<>();

			if (!StringUtils.isEmpty(dto.getProductLabel())) {
				Predicate predicate = cb.like(root.get("label"), "%" + dto.getProductLabel() + "%");
				predicates.add(predicate);
			}

			if (dto.getMaxPrice() == null && dto.getMinPrice() != null) {
				Predicate predicate = cb.greaterThan(root.get("price"), dto.getMaxPrice());
				predicates.add(predicate);
			}

			if (dto.getMaxPrice() != null && dto.getMinPrice() == null) {
				Predicate predicate = cb.lessThan(root.get("price"), dto.getMaxPrice());
				predicates.add(predicate);
			}

			if (dto.getMaxPrice() != null && dto.getMinPrice() != null) {
				Predicate predicate = cb.between(root.get("price"), dto.getMinPrice(), dto.getMaxPrice());
				predicates.add(predicate);
			}

			if (dto.getBrands() != null && !dto.getBrands().isEmpty()) {
				brandPredicates = dto.getBrands().stream().map(brand -> {
					Predicate predicate = cb.equal(root.get("brand").get("id"), brand.getId());
					return predicate;
				}).collect(Collectors.toList());
			}

			Predicate orPredicate = cb.or(brandPredicates.toArray(new Predicate[brandPredicates.size()]));
			Predicate andPredicate = cb.and(predicates.toArray(new Predicate[predicates.size()]));

			if (!brandPredicates.isEmpty())
				return cb.and(new Predicate[] { andPredicate, orPredicate });
			return cb.and(new Predicate[] { andPredicate });
		}, PageRequest.of(page, size));

		fetchProductsAttachments(products.getContent());
		return products;
	}

	private AttachmentProxy attachmentFromMultipartFile(Product product, MultipartFile file) throws IOException {
		AttachmentProxy attachment = new AttachmentProxy();
		attachment.setClassName(product.getClass().getName());
		attachment.setContent(file.getBytes());
		attachment.setEntityId(product.getId());
		attachment.setExtension(FilenameUtils.getExtension(file.getOriginalFilename()));
		attachment.setMimeType(file.getContentType());
		attachment.setDescription(null);
		attachment.setName(file.getOriginalFilename());
		return attachment;
	}

	private void fetchProductsAttachments(List<Product> list) {
		for (Product product : list) {
			try {
				product.setAttachments(
						attachmentFeignClient.getAttachmentsByEntity(Product.class.getName(), product.getId()));
			} catch (Exception ex) {
				LOGGER.error("Could not fetch attachments for product {} : {}", product.getId(), ex.getMessage());
			}
		}
	}
}
