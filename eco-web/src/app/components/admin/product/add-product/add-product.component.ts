import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from '../../../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../domain/product';
import { BrandService } from '../../../../services/brand.service'
import 'rxjs/add/operator/take';
import { Brand } from '../../../../domain/brand';
import { UUID } from 'angular2-uuid';
import { Category } from '../../../../domain/category';
import { CategoryService } from '../../../../services/category.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

	brands: Array<Brand> = [];
	categories: Array<Category> = [];
	product: Product = new Product();
	attachments: any[] = [];

	constructor(private router: Router,
				private route: ActivatedRoute,
				private productService: ProductService,
				private brandService: BrandService,
				private categoryService: CategoryService,
				private toastr: ToastrService) {}

	ngOnInit() {
		this.loadBrands();
		this.loadCategories();
		this.generateUUID();
	}

	uploadPhotos(event) {
		if(event.files)
			if (event.files.length < 3 || event.files.length > 7)
				this.toastr.error("You must select between 3 and 7 images");
			else{
				// this.productService.uploadPhotos(event.files).subscribe(result => {
				// 	console.log(result);
				// }, error => {
				// 	this.toastr.error(String(error));
				// });
				this.attachments.push(event.files);
			}
	}

	saveProduct(){
		this.productService.save(this.product, this.attachments).subscribe(result => {
			this.toastr.success('Product added successfully !');
			this.router.navigate(['/admin/products']);
		});
	}

	loadBrands(){
		this.brandService.loadBrands().subscribe((result:Array<Brand>) => {
			this.brands = result;
			this.loadProductToEdit();
		}, error => {
			this.toastr.error(String(error));
		})
	}

	loadCategories(){
		this.categoryService.loadCategories().subscribe((result:Array<Category>) => {
			this.categories = result;
			this.loadProductToEdit();
		}, error => {
			this.toastr.error(String(error));
		})
	}

	loadProductToEdit(){
		let id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.productService.getProduct(id).take(1).subscribe((result: Product) => {
				this.product = result;
				// There has to be a better way to do the 2 way binding .. 
				if(this.brands) {
					const p = this.product;
					let match;
					this.brands.forEach(function(br){
						if(br.id == p.brand.id){
							match = br;
						}
					})
					this.product.brand = match;
				}
			}, error => {
				this.toastr.error(String(error));
			});
		}
	}

	generateUUID() {
		localStorage.removeItem("uuid");
		let uuid = UUID.UUID();
		localStorage.setItem("uuid", uuid);
	}

}
