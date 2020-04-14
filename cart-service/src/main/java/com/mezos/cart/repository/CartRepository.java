package com.mezos.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mezos.cart.domain.Cart;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {

	Cart findByUsername(String username);

	Cart findByUserId(Long id);

}
