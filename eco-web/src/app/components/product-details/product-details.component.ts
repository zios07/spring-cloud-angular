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
  attachments = [];

  constructor(private productService: ProductService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProduct(id).subscribe((result: Product) => {
        this.product = result;
        if (this.product && this.product.attachments) {
          this.product.attachments.forEach(image => {
            this.attachments.push({
              source: "data:image/jpeg;base64," + image.content
            });
            // if (image.main) {
            //   this.product.mainImage = image;
            // }
          });
          this.product.mainImage = this.attachments[0];        
        }
      }, error => {
        this.toastr.error(String(error));
      })
    }
  }

}
