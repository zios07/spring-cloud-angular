package com.mezos.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mezos.cart.domain.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
