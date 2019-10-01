package ma.fgs.product.service.api;

import java.util.List;

import ma.fgs.product.domain.Category;
import ma.fgs.product.service.exception.NotFoundException;

public interface ICategoryService {

  Category createCategory(Category category);

  Category updateCategory(Category category) throws NotFoundException;

  void deleteCategory(Long id) throws NotFoundException;

  Category findCategory(Long id) throws NotFoundException;

  List<Category> findCategories();

}
