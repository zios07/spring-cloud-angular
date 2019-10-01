package ma.fgs.product.rest.controller;

import java.util.List;

import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ma.fgs.product.domain.Product;
import ma.fgs.product.domain.dto.ProductSearchDto;
import ma.fgs.product.proxy.AttachmentProxy;
import ma.fgs.product.publisher.AttachmentPublisher;
import ma.fgs.product.service.api.IProductService;
import ma.fgs.product.service.exception.NotFoundException;

@RestController
@RefreshScope
@RequestMapping("api/v1/products")
public class ProductController {

	private IProductService service;
	private AttachmentPublisher attachmentPublisher;
	
	public ProductController(IProductService service, AttachmentPublisher attachmentPublisher) {
		this.service = service;
		this.attachmentPublisher = attachmentPublisher;
	}

	@GetMapping(value = "{id}")
	public ResponseEntity<Product> findProduct(@PathVariable String id) throws NotFoundException {
		Product product = service.findProduct(id);
		publishAttachment(product.getAttachments());
		return new ResponseEntity<>(product, HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity<Page<Product>> findAllProducts(@RequestParam(required = false) int page,
			@RequestParam(required = false) int size) {
		Page<Product> products = service.findAllProducts(page, size);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<Product> addProduct(@RequestBody Product product) {
		Product savedProduct = service.addProduct(product);
		return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
	}

	@DeleteMapping(value = "{id}")
	public ResponseEntity<Void> deleteProduct(@PathVariable String id) throws NotFoundException {
		service.deleteProduct(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping(value = "/search")
	public ResponseEntity<Page<Product>> searchProducts(@RequestBody ProductSearchDto dto, @RequestParam int page,
			@RequestParam int size) throws NotFoundException {
		Page<Product> products = service.searchProducts(dto, page, size);
		return new ResponseEntity<>(products, HttpStatus.OK);
	}

	private void publishAttachment(List<AttachmentProxy> attachments) {
		attachmentPublisher.send(attachments);
	}
}
