package ma.fgs.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.fgs.product.domain.CartItem;
import ma.fgs.product.repository.CartItemRepository;
import ma.fgs.product.service.api.ICartItemService;
import ma.fgs.product.service.exception.NotFoundException;

@Service
public class CartItemService implements ICartItemService {

	@Autowired
	private CartItemRepository  cartProductRepo;

	@Override
	public void deleteCartProduct(Long id) throws NotFoundException {
 		if(!cartProductRepo.existsById(id))
			throw new NotFoundException("NOT.FOUND", "Cart product not found");
 		CartItem cp = cartProductRepo.findById(id).get();
		cartProductRepo.delete(cp);
	}
	
}
