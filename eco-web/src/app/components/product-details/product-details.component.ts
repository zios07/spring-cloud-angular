import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../domain/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  images = [];

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.productService.getProduct(id).subscribe((result: Product) => {
        this.product = result;
        if(this.product && this.product.images) {
          this.product.images.forEach(image => {
            this.images.push({
              source:"data:image/jpeg;base64,"+image.content 
            });
            if(image.main)
              this.product.mainImage = image;
          });
        }
      }, error  => {
        this.toastr.error(String(error));
      })
    }
  }

}
