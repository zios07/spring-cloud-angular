import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../domain/product';
import { AuthenticationService } from '../../services/authentication.service';
import { BrandService } from '../../services/brand.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<Product> = [];
  $brands;
  productSearchDto: any = { brands: Array(), minPrice: 0, maxPrice: 100000 };
  currentPage = 0;
  size = 100;
  rangeValues: number[] = [0, 100000];
  username: string;
  connectedUserCart;
  productsLoaded = false;
  $products;

  constructor(private productService: ProductService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private brandService: BrandService,
    private cartService: CartService) { }

  ngOnInit() {
    this.username = this.authService.getConnectedUsername();
    this.loadProducts(this.currentPage, this.size);
    this.loadBrands();
    this.loadConnectedUserCart();
  }

  loadConnectedUserCart() {
    this.cartService.loadCart(this.username).subscribe((result: any) => {
      this.connectedUserCart = result;
    }, error => {
      if (error.status !== 404) {
        this.toastr.error(error);
      }
    }
    );
  }

  loadProducts(page, size) {
    this.$products = this.productService.loadProducts(page, size);
    this.$products.subscribe((result: any) => {
      this.products = result.content;
      this.setMainImageForeachProduct();
      this.updateProductAvailability();
      this.productsLoaded = true;
    });
  }

  addToCart(product) {
    const username: string = this.authService.getConnectedUsername();
    this.productService.addProductToCart(product, username).subscribe(result => {
      this.toastr.success('Product added to cart');
      this.products.forEach(p => {
        this.cartService.loadCart(username).subscribe((cart: any) => {
          cart.products.forEach(cartProduct => {
            if (cartProduct.product.id === product.id && cartProduct.quantity >= product.qteStock) {
              product.unavailable = true;
            }
          });
        });
      });
    }, error => {
      this.toastr.error(String(error));
    });
  }

  loadBrands() {
    this.$brands = this.brandService.loadBrands();

  }

  priceRangeChanged(event) {
    this.productSearchDto.minPrice = event.values[0];
    this.productSearchDto.maxPrice = event.values[1];
  }

  onSearch() {
    this.productService.search(this.productSearchDto, this.currentPage, this.size).subscribe((result: any) => {
      this.products = result.content;
      this.setMainImageForeachProduct();
      this.updateProductAvailability();
    }, error => {
      this.toastr.error(String(error));
    });
  }

  brandChanged(event, brand) {
    if (event.srcElement.checked) {
      this.productSearchDto.brands.push(brand);
    } else {
      this.productSearchDto.brands.splice(this.productSearchDto.brands.indexOf(brand), 1);
    }
  }

  setMainImageForeachProduct() {
    this.products.forEach(product => {
      if (product.attachments && product.attachments.length > 0) {
        product.mainImage = product.attachments[0];
      }
    });
    console.log(this.products);
  }

  // TODO: to be moved to the backend
  updateProductAvailability() {
  }

}
