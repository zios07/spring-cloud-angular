package ma.fgs.product.service.api;

import ma.fgs.product.service.exception.NotFoundException;

public interface ICartItemService {

	void deleteCartProduct(Long id) throws NotFoundException;
	
}
