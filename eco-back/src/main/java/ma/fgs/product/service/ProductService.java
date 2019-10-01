package ma.fgs.product.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

import javax.persistence.criteria.Predicate;

import org.apache.commons.lang.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import ma.fgs.product.domain.Product;
import ma.fgs.product.domain.dto.ProductSearchDto;
import ma.fgs.product.repository.ProductRepository;
import ma.fgs.product.service.api.IProductService;
import ma.fgs.product.service.exception.NotFoundException;

@Service
public class ProductService implements IProductService {

	private ProductRepository repo;

	public ProductService(ProductRepository repo) {
		this.repo = repo;
	}

	@Override
	public Product addProduct(Product product) {
		product.setAddedDate(new Date());
		Product createdProduct = repo.save(product);
		return createdProduct;
	}

	@Override
	public Product findProduct(String id) throws NotFoundException {
		if (!repo.existsById(id))
			throw new NotFoundException("PRODUCT.FIND.ERROR", "Product does not exist :" + id);
		Product product = repo.findById(id).get();
		return product;
	}

	@Override
	public Page<Product> findAllProducts(int page, int size) {
		Page<Product> products = repo.findAll(PageRequest.of(page, size));
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

		return products;
	}

}
