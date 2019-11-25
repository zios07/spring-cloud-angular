package ma.fgs.product.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ma.fgs.product.domain.Category;
import ma.fgs.product.service.api.ICategoryService;
import ma.fgs.product.service.exception.NotFoundException;

@RestController
@RequestMapping(value = "/api/v1/category")
public class CategoryController {

	@Autowired
	private ICategoryService service;

	@GetMapping
	@PreAuthorize(value = "hasRole('user')")
	public List<Category> loadCategorys() {
		return service.findCategories();
	}

	@GetMapping(value = "{id}")
	@PreAuthorize(value = "hasRole('USER')")
	public Category getCategory(@PathVariable Long id) throws NotFoundException {
		return service.findCategory(id);
	}

	@PostMapping
	@Secured(value = { "" })
	public Category saveCategory(@RequestBody Category category) {
		return service.createCategory(category);
	}

	@DeleteMapping(value = "{id}")
	public void deleteCategory(@PathVariable Long id) throws NotFoundException {
		service.deleteCategory(id);
	}
}
