package ma.fgs.product.service.api;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import ma.fgs.product.domain.Product;
import ma.fgs.product.domain.dto.ProductSearchDto;
import ma.fgs.product.service.exception.NotFoundException;

public interface IProductService {

	Product addProduct(Product product, MultipartFile[] attachments) throws IOException;

	Product findProduct(String id) throws NotFoundException;

	Page<Product> findAllProducts(int page, int size);

	void deleteProduct(String id) throws NotFoundException;

	Page<Product> searchProducts(ProductSearchDto dto, int page, int size) throws NotFoundException;

}
