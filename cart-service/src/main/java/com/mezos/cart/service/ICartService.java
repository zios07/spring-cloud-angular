package com.mezos.cart.service;

import java.util.List;

import com.mezos.cart.domain.Cart;
import com.mezos.cart.dto.CartDTO;
import com.mezos.cart.exception.NotFoundException;

public interface ICartService {

	Cart addToCart(CartDTO cart);
	
	Cart minusProductFromCart(CartDTO cart) throws NotFoundException;

	Cart findCart(long id) throws NotFoundException;

	List<Cart> findAllCarts();

	void deleteCart(long id) throws NotFoundException;

	List<Cart> searchCarts(Cart cartDto) throws NotFoundException;

	Cart findByUserId(Long userId) throws NotFoundException;

	void deleteProductFromCart(long productId, String username);

	Cart findByUsername(String username) throws NotFoundException;

}
