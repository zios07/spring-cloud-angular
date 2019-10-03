import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../domain/product';
import { BrandService } from '../../../../services/brand.service';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

	items: Product[] = [];
	itemsCount: number;
	products$;
	page: number = 0;
	size: number = 10;

	constructor(private router: Router,
		private productService: ProductService,
		private brandService: BrandService,
		private toastr: ToastrService) { }

  	ngOnInit() {
	  	this.loadProducts();
  	}

  	loadProducts() {
		this.productService.loadProducts(this.page, this.size).subscribe((result: any) => {
			this.initializeDataTable(result);
		}, error => {
			this.toastr.error(String(error));
		});
	}
	  
	deleteProduct(id) {
		this.productService.deleteProduct(id).subscribe((result: any) => {
			this.loadProducts();
			this.toastr.info('Product deleted');
		}, error => {
			this.toastr.error(String(error));
		});
	}

	reloadItems(params) {
		// if(this.tableResource)
		// 	this.tableResource.query(params)
		// 		.then(items => this.items = items);
	}

	initializeDataTable(products: Product[]) {
		// this.tableResource = new DataTableResource(products);
		// this.tableResource.query({offset: 0})
		// 	.then(items => this.items = items);
		// this.tableResource.count()
		// 	.then(count => this.itemsCount = count);
	}
}
