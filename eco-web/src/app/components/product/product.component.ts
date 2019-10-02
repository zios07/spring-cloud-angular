import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../domain/product';
import { AuthenticationService } from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from '../../services/brand.service'
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Array<Product> = [];
  brands: Array<any> = [];
  productSearchDto: any = { brands: Array(), minPrice: 0, maxPrice: 100000 };
  currentPage: number = 0;
  size: number = 100;
  rangeValues: number[] = [0, 100000];
  username: string;
  connectedUserCart;
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
      if (error.status !== 404)
        this.toastr.error(error);
    }
    );
  }

  loadProducts(page, size) {
    this.$products = this.productService.loadProducts(page, size);
    this.$products.subscribe((result: any) => {
      this.products = result;
      // this.setMainImageForeachProduct();
      this.updateProductAvailability(result);
    })
  }

  addToCart(product) {
    let username: string = this.authService.getConnectedUsername();
    this.productService.addProductToCart(product, username).subscribe(result => {
      this.toastr.success("Product added to cart");
      this.products.forEach(p => {
        this.cartService.loadCart(username).subscribe((cart: any) => {
          cart.products.forEach(cartProduct => {
            if (cartProduct.product.id == product.id && cartProduct.quantity >= product.qteStock) {
              product.unavailable = true;
            }
          });
        })
      });
    }, error => {
      this.toastr.error(String(error));
    });
  }

  loadBrands() {
    this.brandService.loadBrands().subscribe((result: any) => {
      this.brands = result;
    }, error => {
      this.toastr.error(String(error));
    });
  }

  priceRangeChanged(event) {
    this.productSearchDto.minPrice = event.values[0];
    this.productSearchDto.maxPrice = event.values[1];
  }

  onSearch() {
    this.productService.search(this.productSearchDto, this.currentPage, this.size).subscribe((result: any) => {
      this.products = result;
      // this.setMainImageForeachProduct();
      this.updateProductAvailability(result);
    }, error => {
      this.toastr.error(String(error));
    });
  }

  brandChanged(event, brand) {
    if (event.srcElement.checked)
      this.productSearchDto.brands.push(brand);
    else
      this.productSearchDto.brands.splice(this.productSearchDto.brands.indexOf(brand), 1);
  }

  updateProductAvailability(productList) {
    if (this.connectedUserCart) {
      let cartProducts = this.connectedUserCart.products;
      cartProducts.forEach((cp: any) => {
        let pCart: Product = cp.product;
        if (productList) {
          productList.forEach(product => {
            if (pCart.id == product.id) {
              if (product.qteStock <= cp.quantity) {
                product.unavailable = true;
              }
            }
          });
        }
      })
    }
  }

}
