import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import { AuthenticationService } from '../../services/authentication.service';
import { environment } from '../../../environments/environment';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartProducts: Array<Product> = [];
  totalPrice: number;
  username: string;
  $cart;  

  constructor(private http: AuthHttp, 
              private toastr: ToastrService,
              private productService: ProductService,
              private authService: AuthenticationService,
              private cartService: CartService) { }
            
  ngOnInit() {
    this.username = this.authService.getConnectedUsername();
    this.loadCart();
  }

  // Product as parameter to update its availability to add to cart (quantity in store)
  loadCart(product?: Product){ 
    this.$cart = this.cartService.loadCart(this.username);
    this.$cart.subscribe((result: any) => {
      this.cartProducts = result.products;
      this.calculateTotalPrice(this.cartProducts);
      this.updateProductsAvailability();
      }, error => {
        if(error.status !== 404)
          this.toastr.error(error);
      }
    );
  }

  calculateTotalPrice(args){
    this.totalPrice = 0;
    args.forEach(cartProduct => {
      this.totalPrice += cartProduct.product.price * cartProduct.quantity;
    })
  }

  plusProduct(product){
    this.productService.addProductToCart(product, this.username).subscribe(result => {
      this.loadCart(product);
    }, error => {
      this.toastr.error(String(error));
    });
  }

  // TODO: disable minus and plus when attending 1 and max stock quantity

  minusProduct(product){
    this.productService.minusProductFromCart(product, this.username).subscribe(result => {
      this.loadCart();
    }, error => {  
      this.toastr.error(String(error));
    });
  }
 
  deleteProductFromCart(product) {
    this.productService.deleteProductFromCart(product, this.username).subscribe(result => {
      this.toastr.success('Product removed from cart')
      this.loadCart();
    }, error => {
      this.toastr.error(String(error));
    });
  }

  updateProductsAvailability() {
    this.$cart.subscribe((result: any) => {
      this.cartProducts = result.products;
      this.cartProducts.forEach((cp : any) => {
        let product:Product = cp.product;
        if(product.qteStock <= cp.quantity) {
          cp.unavailable = true;
        }
      })
    }, error => {
      if(error.status !== 404)
        this.toastr.error(error);
    });
  }

  checkout() {
    this.toastr.info(" not implemented yet !");
  }
  
}
