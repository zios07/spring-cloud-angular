package ma.fgs.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.fgs.product.domain.Category;
import ma.fgs.product.repository.CategoryRepository;
import ma.fgs.product.service.api.ICategoryService;
import ma.fgs.product.service.exception.NotFoundException;

@Service
public class CategoryService implements ICategoryService {

  @Autowired
  private CategoryRepository repo;

  @Override
  public Category createCategory(Category category) {
    return repo.save(category);
  }

  @Override
  public Category updateCategory(Category category) throws NotFoundException {
    if (!repo.existsById(category.getId()))
      throw new NotFoundException("CATEGORY.UPDATE.ERROR", "Category not found : " + category.getId());
    return repo.save(category);
  }

  @Override
  public void deleteCategory(Long id) throws NotFoundException {
    if (!repo.existsById(id))
      throw new NotFoundException("CATEGORY.UPDATE.ERROR", "Category not found : " + id);
    repo.deleteById(id);
  }

  @Override
  public Category findCategory(Long id) throws NotFoundException {
    if (!repo.existsById(id))
      throw new NotFoundException("CATEGORY.UPDATE.ERROR", "Category not found : " + id);
    return repo.findById(id).get();
  }

  @Override
  public List<Category> findCategories() {
    return repo.findAll();
  }
}
