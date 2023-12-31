import { Component } from '@angular/core';
import { Product } from '../product';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
  providers: [ProductService]
})
export class ProductAddComponent {
  model: Product = new Product();
  constructor(private productService: ProductService,
    private alertifyService: AlertifyService) { }

  add(form: NgForm) {
    this.productService.addProduct(this.model).subscribe({
      next: result =>{
        this.alertifyService.success(`${this.model.name} başarılı bir şekilde eklendi.`)
      },
      error: error => {
        this.alertifyService.error("ürün eklenirken bir hata oluştu.")
      },
    })
  }

}
