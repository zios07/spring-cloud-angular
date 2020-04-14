package com.mezos.cart.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mezos.cart.domain.CartItem;
import com.mezos.cart.exception.NotFoundException;
import com.mezos.cart.repository.CartItemRepository;
import com.mezos.cart.service.ICartItemService;

@Service
public class CartItemService implements ICartItemService {

	@Autowired
	private CartItemRepository cartProductRepo;

	@Override
	public void deleteCartProduct(Long id) throws NotFoundException {
		if (!cartProductRepo.existsById(id))
			throw new NotFoundException("NOT.FOUND", "Cart product not found");
		CartItem cp = cartProductRepo.findById(id).get();
		cartProductRepo.delete(cp);
	}

}
