package com.mezos.cart.service;

import com.mezos.cart.exception.NotFoundException;

public interface ICartItemService {

	void deleteCartProduct(Long id) throws NotFoundException;
}
