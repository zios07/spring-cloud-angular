package ma.fgs.product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ma.fgs.product.domain.Brand;
import ma.fgs.product.repository.BrandRepository;
import ma.fgs.product.service.api.IBrandService;
import ma.fgs.product.service.exception.NotFoundException;

@Service
public class BrandService implements IBrandService {
	
	@Autowired
	private BrandRepository repo;

	@Override
	public Brand addBrand(Brand brand) {
		return repo.save(brand);
	}

	@Override
	public Brand findBrand(long id) throws NotFoundException {
		if(!repo.existsById(id))
			throw new NotFoundException("code", "message");
		return repo.findById(id).get();
	}

	@Override
	public List<Brand> findAllBrands() {
		return repo.findAll();
	}

	@Override
	public void deleteBrand(long id) throws NotFoundException {
		if(!repo.existsById(id))
			throw new NotFoundException("code", "message");
		repo.deleteById(id);
	}

	@Override
	public List<Brand> searchBrands(Brand brandDto) throws NotFoundException {
		// TODO Auto-generated method stub
		return null;
	}

}
