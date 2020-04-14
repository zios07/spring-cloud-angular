package com.mezos.cart.rest;

import java.util.List;

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

	@RequestMapping(method = RequestMethod.GET, value = "all")
	public List<Cart> findAllCarts() {
		return service.findAllCarts();
	}

	@RequestMapping(method = RequestMethod.PUT, value = "product/add")
	public Cart addToCart(@RequestBody CartDTO dto) {
		return service.addToCart(dto);
	}

	@RequestMapping(method = RequestMethod.PUT, value = "product/minus")
	public Cart minusProductFromCart(@RequestBody CartDTO dto) throws NotFoundException {
		return service.minusProductFromCart(dto);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "product/delete")
	public void deleteProductFromCart(@RequestParam long productid, @RequestParam String username) {
		service.deleteProductFromCart(productid, username);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "{id}")
	public void deleteCart(@PathVariable Long id) throws NotFoundException {
		service.deleteCart(id);
	}

	@RequestMapping(method = RequestMethod.GET, value = "/user/{username}")
	public Cart findByUsername(@PathVariable String username) throws NotFoundException {
		return service.findByUsername(username);
	}

}
