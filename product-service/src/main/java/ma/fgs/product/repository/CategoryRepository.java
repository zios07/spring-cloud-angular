package ma.fgs.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.fgs.product.domain.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
