package com.mezos.cart.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mezos.cart.domain.Cart;
import com.mezos.cart.dto.CartDTO;
import com.mezos.cart.exception.NotFoundException;
import com.mezos.cart.service.ICartService;

@RestController
@RequestMapping(value = "/api/v1/cart")
public class CartController {

	@Autowired
	private ICartService service;

	@RequestMapping(method = RequestMethod.GET, value = "{id}")
	public Cart findCart(@PathVariable Long id) throws NotFoundException {
		return service.findCart(id);
	}

	@RequestMapping(method = RequestMethod.POST, value = "add-item")
	public Cart addToCart(@RequestBody CartDTO dto) {
		return service.addToCart(dto);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "minus-item")
	public Cart minusProductFromCart(@RequestBody CartDTO dto) throws NotFoundException {
		return service.minusProductFromCart(dto);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "delete-item")
	public void deleteProductFromCart(@RequestParam long productid, @RequestParam String username) {
		service.deleteProductFromCart(productid, username);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "{id}")
	public void deleteCart(@PathVariable Long id) throws NotFoundException {
		service.deleteCart(id);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/by-username/{username}")
	public Cart findByUsername(@PathVariable String username) throws NotFoundException {
		return service.findByUsername(username);
	}

}
