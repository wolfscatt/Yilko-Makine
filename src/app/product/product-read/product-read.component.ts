import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from 'src/app/services/product.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.css']
})
export class ProductReadComponent implements OnInit {
  ngOnInit(): void {
    this.loadProduct()
  }
  constructor(private productService: ProductService,
    private alertifyService: AlertifyService) { }

  products: Product[]

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(data => {
      this.alertifyService.error(`${product.name} Başarılı bir şekilde silindi.`)
      this.loadProduct()
    })
  }

  loadProduct(){
    this.productService.getProducts().subscribe(data =>{
      this.products = data
    })
  }
}
