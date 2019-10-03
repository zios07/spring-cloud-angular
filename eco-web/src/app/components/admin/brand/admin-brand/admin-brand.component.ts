import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Brand } from '../../../../domain/brand';
import { BrandService } from '../../../../services/brand.service';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.css']
})
export class AdminBrandComponent implements OnInit {

	items: Brand[] = [];
	itemsCount: number;
	// tableResource: DataTableResource<Brand>;

	constructor(private brandService: BrandService,
				private toastr: ToastrService) { }

	ngOnInit() {
		this.loadBrands();
	}

	addBrand(brand) {
		this.brandService.saveBrand(brand).subscribe(result => {
			this.toastr.success('Brand created');
		}, error => {
			this.toastr.error(String(error));
		})
	}

	deleteBrand(id) {
		this.brandService.deleteBrand(id).subscribe(result => {
			this.loadBrands();
			this.toastr.info('Brand deleted');
		}, error => {
			if(error.error)
				if(error.error.code === "SERVER.EXCEPTION")
					this.toastr.error("Cannot delete this brand because is linked to some products. Delete those products first and try again ");
		})
	}

	loadBrands() {
		this.brandService.loadBrands().subscribe((result:any) => {
			this.initializeDataTable(result);
		}, error => {
			this.toastr.error(String(error));
		})
	}

	reloadItems(params) {
		// if(this.tableResource)
		// 	this.tableResource.query(params)
		// 		.then(items => this.items = items);
	}

	initializeDataTable(brands: Brand[]) {
		// this.tableResource = new DataTableResource(brands);
		// this.tableResource.query({offset: 0})
		// 	.then(items => this.items = items);
		// this.tableResource.count()
		// 	.then(count => this.itemsCount = count);
	}
}
