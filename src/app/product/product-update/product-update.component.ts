import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit{

  model: Product = new Product();
  constructor(private productService:ProductService, 
    private alertifyService: AlertifyService,
    private route: ActivatedRoute){}

  ngOnInit(): void {
    this.getProduct()
  }
  getProductId():number{
    const currentUrl = this.route.snapshot.url.join("/")
    let urlArray = currentUrl.split("/")
    let id = urlArray[urlArray.length-1]
    return Number(id)
  }
  getProduct(){
    this.productService.getProduct(this.getProductId()).subscribe(data => {
      this.model.id = data.id
      this.model.name = data.name
      this.model.imageUrl = data.imageUrl
    })
  }
  update(form: NgForm) {
    const formData = form.value
    this.model.name = formData.name
    this.model.imageUrl = formData.imageUrl
    this.productService.updateProduct(this.model).subscribe(data => {
        this.alertifyService.success(`${data.name} Başarılı bir şekilde güncellendi.`)
    })
  }


}
