import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../domain/category';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

	items: Category[] = [];
	itemsCount: number;
	tableResource: DataTableResource<Category>;

	constructor(private categoryService: CategoryService,
				private toastr: ToastrService) { }

	ngOnInit() {
		this.loadCategories();
	}

	addCategory(category) {
		this.categoryService.saveCategory(category).subscribe(result => {
			this.toastr.success('Category created');
		}, error => {
			this.toastr.error(String(error));
		})
	}

	deleteCategory(id) {
		this.categoryService.deleteCategory(id).subscribe(result => {
			this.loadCategories();
			this.toastr.info('Category deleted');
		}, error => {
			if(error.error)
				if(error.error.code === "SERVER.EXCEPTION")
					this.toastr.error("Cannot delete this category because is linked to some products. Delete those products first and try again ");
		})
	}

	loadCategories() {
		this.categoryService.loadCategories().subscribe((result:any) => {
			this.initializeDataTable(result);
		}, error => {
			this.toastr.error(String(error));
		})
	}

	reloadItems(params) {
		if(this.tableResource)
			this.tableResource.query(params)
				.then(items => this.items = items);
	}

	initializeDataTable(categories: Category[]) {
		this.tableResource = new DataTableResource(categories);
		this.tableResource.query({offset: 0})
			.then(items => this.items = items);
		this.tableResource.count()
			.then(count => this.itemsCount = count );
	}
}
