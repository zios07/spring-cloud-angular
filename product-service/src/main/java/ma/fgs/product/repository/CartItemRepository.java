package ma.fgs.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ma.fgs.product.domain.CartItem;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

}
