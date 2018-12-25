import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BrandService } from '../../services/brand.service'
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../services/product.service';
import { Product } from '../../domain/product';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	
	constructor(private brandService: BrandService,
				private toastr: ToastrService,
				private productService: ProductService) {

	}

	ngOnInit() {
	}
}
