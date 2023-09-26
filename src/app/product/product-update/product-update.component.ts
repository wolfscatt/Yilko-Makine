import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  model: Product = new Product();
  constructor(private productService: ProductService,
    private alertifyService: AlertifyService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
    this.getProduct()
  }
  getProductName(): string {
    const currentUrl = this.route.snapshot.url.join("/")
    let urlArray = currentUrl.split("/")
    let name = urlArray[urlArray.length - 1]
    console.log(name);
    return name
  }
  getProduct() {
    this.productService.getProduct(this.getProductName()).subscribe(data => {
      this.model._id = data._id
      this.model.name = data.name
      this.model.imageUrl = data.imageUrl
    })
  }
  update(form: NgForm) {
    const formData = form.value
    this.model.name = formData.name
    this.model.imageUrl = formData.imageUrl
    this.productService.updateProduct(this.getProductName(),this.model).subscribe({
      next: result => {
        this.alertifyService.success(`${result.name} başarılı bir şekilde güncellendi.`)
      },
      error: error => {
        this.alertifyService.error("Ürün Güncellenirken bir hata oluştu.")
      },
      complete: () => {
        this.router.navigate(["ymadmin"])
      }
    })
  }


}
