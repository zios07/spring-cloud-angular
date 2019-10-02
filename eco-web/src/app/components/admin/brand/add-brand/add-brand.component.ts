import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../../../services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Brand } from '../../../../domain/brand';

@Component({
	selector: 'app-add-brand',
	templateUrl: './add-brand.component.html',
	styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

	brand: Brand = new Brand();

	constructor(private brandService: BrandService,
		private router: Router,
		private productService: ProductService,
		private toastr: ToastrService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.loadBrandToEdit();
	}


	saveBrand() {
		this.brandService.saveBrand(this.brand).subscribe(result => {
			this.toastr.success('Brand created');
			this.router.navigate(['/admin/brands']);
		}, error => {
			this.toastr.error(String(error));
		});
	}

	loadBrandToEdit() {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.brandService.getBrand(id).subscribe((result: Brand) => {
				this.brand = result;
			}, error => {
				this.toastr.error(String(error));
			});
		}
	}
}
