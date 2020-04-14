package com.mezos.cart.domain;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "CART")
public class Cart {

	@Id
	@GeneratedValue
	private Long id;
	
	private long userId;

	private String username;

	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinTable( name = "CART_CART_ITEM", 
				joinColumns = @JoinColumn(name = "CART_ID"), 
				inverseJoinColumns = @JoinColumn(name = "CART_ITEM_ID"))
	private List<CartItem> cartItems;

	private Double totalPrice;

	public Cart(Long id, long userId, String username, List<CartItem> cartItems, Double totalPrice) {
		super();
		this.id = id;
		this.userId = userId;
		this.username = username;
		this.cartItems = cartItems;
		this.totalPrice = totalPrice;
	}

	public Cart() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public Double getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

}