package ma.fgs.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.fgs.product.domain.Cart;
import ma.fgs.product.domain.CartItem;
import ma.fgs.product.domain.User;
import ma.fgs.product.domain.dto.CartDto;
import ma.fgs.product.repository.CartItemRepository;
import ma.fgs.product.repository.CartRepository;
import ma.fgs.product.repository.UserRepository;
import ma.fgs.product.service.api.ICartService;
import ma.fgs.product.service.exception.NotFoundException;

@Service
public class CartService implements ICartService {

	@Autowired
	private CartRepository repo;

	@Autowired
	private CartItemRepository cartProductRepository;

	@Autowired
	private UserRepository userRepository;

	boolean foundProduct = false;

	@Override
	public Cart addToCart(CartDto dto) {

		double totalPrice = 0;
		foundProduct = false;

		User user = userRepository.findByAccountUsername(dto.getUsername());
		Cart cart = user.getCart();

		if (cart != null) {
			List<CartItem> cartProducts = cart.getProducts();

			// If product already exist in cart, increment quantity
			cartProducts.forEach(p -> {
				if (p.getProduct().equals(dto.getProduct())) {
					foundProduct = true;
					p.setQuantity(p.getQuantity() + 1);
				}
			});

			// else add new product to cart
			if (!foundProduct) {
				CartItem cartProduct = new CartItem();
				cartProduct.setProduct(dto.getProduct());
				cartProduct.setQuantity(1);
				cartProducts.add(cartProduct);
			}

			for (CartItem cProduct : cart.getProducts()) {
				totalPrice += cProduct.getProduct().getPrice();
			}

			cart.setTotalPrice(totalPrice);
			return repo.save(cart);

		} else {

			cart = new Cart();

			List<CartItem> products = new ArrayList<>();
			CartItem cartProduct = new CartItem();
			cartProduct.setProduct(dto.getProduct());
			cartProduct.setQuantity(1);
			products.add(cartProduct);

			totalPrice = products.get(0).getProduct().getPrice();

			cart.setProducts(products);
			cart.setTotalPrice(totalPrice);

			user.setCart(cart);
			userRepository.save(user);
			// return repo.save(cart);
			return user.getCart();
		}
	}

	@Override
	public Cart minusProductFromCart(CartDto dto) throws NotFoundException {
		User user = userRepository.findByAccountUsername(dto.getUsername());
		Cart cart = null;
		if (user != null) {
			cart = user.getCart();
		}

		if (cart != null) {
			List<CartItem> cartProducts = new ArrayList<>(cart.getProducts());
			cartProducts.forEach(cartProduct -> {
				if (cartProduct.getProduct() != null
						&& cartProduct.getProduct().getId().equals(dto.getProduct().getId())) {
					if (cartProduct.getQuantity() > 1)
						cartProduct.setQuantity(cartProduct.getQuantity() - 1);
					else {
						cartProductRepository.deleteById(cartProduct.getId());
					}
				}
			});
		} else {
			throw new NotFoundException("NOT.FOUND", "Cart not found for user with username: " + dto.getUsername());
		}
		return repo.save(cart);
	}

	@Override
	public Cart findCart(long id) throws NotFoundException {
		if (!repo.existsById(id))
			throw new NotFoundException("code", "message");
		return repo.findById(id).get();
	}

	@Override
	public List<Cart> findAllCarts() {
		return repo.findAll();
	}

	@Override
	public void deleteCart(long id) throws NotFoundException {
		if (!repo.existsById(id))
			throw new NotFoundException("code", "message");
		repo.deleteById(id);
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
	public void deleteProductFromCart(String productId, String username) {
		Cart target = getUserCart(username);
		List<CartItem> cartProducts = target.getProducts();
		if (!cartProducts.isEmpty()) {
      Optional<CartItem> match = cartProducts.stream().filter(cp -> (cp.getProduct().getId().equals(productId)))
					.findFirst();
			target.getProducts().set(cartProducts.indexOf(match.get()), null);
		}
		repo.save(target);
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
		User user = userRepository.findByAccountUsername(username);
		Cart cart = null;
		if (user != null) {
			cart = user.getCart();
		}
		return cart;
	}

	private Cart getUserCart(Long id) {
		User user = userRepository.findById(id).get();
		Cart cart = null;
		if (user != null) {
			cart = user.getCart();
		}
		return cart;
	}

}
