package com.mezos.cart.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mezos.cart.domain.Cart;
import com.mezos.cart.domain.CartItem;
import com.mezos.cart.dto.CartDTO;
import com.mezos.cart.exception.NotFoundException;
import com.mezos.cart.repository.CartItemRepository;
import com.mezos.cart.repository.CartRepository;
import com.mezos.cart.service.ICartService;

@Service
public class CartService implements ICartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private CartItemRepository cartItemRepository;

	boolean foundProduct = false;

	@Override
	public Cart addToCart(CartDTO dto) {

//		double totalPrice = 0;
		foundProduct = false;

		Cart cart = getUserCart(dto.getUsername());

		// User already has a cart
		if (cart != null) {
			List<CartItem> cartProducts = cart.getCartItems();

			// If product already exist in cart, increment quantity
			cartProducts.forEach(p -> {
				if (p.getProductId() == dto.getProductId()) {
					foundProduct = true;
					p.setQuantity(p.getQuantity() + 1);
				}
			});

			// else add new product to cart
			if (!foundProduct) {
				CartItem cartProduct = new CartItem();
				cartProduct.setProductId(dto.getProductId());
				cartProduct.setQuantity(1);
				cartProducts.add(cartProduct);
			}

			// I don't have the price of the product here, so it need to be calculated
			// somewhere else (product-service)
//			for (CartItem cProduct : cart.getCartItems()) {
//				totalPrice += cProduct.getPrice();
//			}

//			cart.setTotalPrice(totalPrice);
			return cartRepository.save(cart);

		}
		// User doesn't have a cart
		else {

			cart = new Cart();

			List<CartItem> products = new ArrayList<>();
			CartItem cartProduct = new CartItem();
			cartProduct.setProductId(dto.getProductId());
			cartProduct.setQuantity(1);
			products.add(cartProduct);

			cart.setCartItems(products);
//			cart.setTotalPrice(totalPrice);
			return cartRepository.save(cart);

		}
	}

	@Override
	public Cart minusProductFromCart(CartDTO dto) throws NotFoundException {
		Cart cart = getUserCart(dto.getUsername());
		if (cart != null) {
			List<CartItem> cartProducts = new ArrayList<>(cart.getCartItems());
			cartProducts.forEach(cartProduct -> {
				if (cartProduct.getProductId() == (dto.getProductId())) {
					if (cartProduct.getQuantity() > 1)
						cartProduct.setQuantity(cartProduct.getQuantity() - 1);
					else {
						cartItemRepository.deleteById(cartProduct.getId());
					}
				}
			});
		} else {
			throw new NotFoundException("NOT.FOUND", "Cart not found for user with username: " + dto.getUsername());
		}
		return cartRepository.save(cart);
	}

	@Override
	public Cart findCart(long id) throws NotFoundException {
		if (!cartRepository.existsById(id))
			throw new NotFoundException("code", "message");
		return cartRepository.findById(id).get();
	}

	@Override
	public List<Cart> findAllCarts() {
		return cartRepository.findAll();
	}

	@Override
	public void deleteCart(long id) throws NotFoundException {
		if (!cartRepository.existsById(id))
			throw new NotFoundException("code", "message");
		cartRepository.deleteById(id);
	}

	@Override
	public Cart findByUserId(Long userId) throws NotFoundException {
		Cart cart = getUserCart(userId);
		if (cart == null)
			throw new NotFoundException("USER.CART.NOT.FOUND", "No cart found for user with id: " + userId);
		return cart;
	}

	@Override
	public List<Cart> searchCarts(Cart cartDto) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteProductFromCart(long productId, String username) {
		Cart target = getUserCart(username);
		List<CartItem> cartProducts = target.getCartItems();
		if (!cartProducts.isEmpty()) {
			Optional<CartItem> match = cartProducts.stream().filter(cp -> (cp.getProductId() == productId)).findFirst();
			target.getCartItems().set(cartProducts.indexOf(match.get()), null);
		}
		cartRepository.save(target);
	}

	@Override
	public Cart findByUsername(String username) throws NotFoundException {
		Cart cart = getUserCart(username);
		if (cart == null) {
			throw new NotFoundException("USER.CART.NOT.FOUND", "No cart found for user with username: " + username);
		}
		return cart;
	}

	private Cart getUserCart(String username) {
		return cartRepository.findByUsername(username);
	}

	private Cart getUserCart(Long id) {
		return cartRepository.findByUserId(id);
	}

}
