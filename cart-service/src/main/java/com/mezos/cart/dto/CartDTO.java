package com.mezos.cart.dto;

public class CartDTO {

	private long userId;

	private String username;

	private long productId;

	public CartDTO() {}
	
	public CartDTO(long userId, String username, long productId) {
		super();
		this.userId = userId;
		this.username = username;
		this.productId = productId;
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

	public long getProductId() {
		return productId;
	}

	public void setProductId(long productId) {
		this.productId = productId;
	}
	
}
