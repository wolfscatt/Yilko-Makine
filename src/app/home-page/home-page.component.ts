import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../product/product';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  products: Product[] = []
  randomProducts: Product[] = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProduct()
  }

  loadProduct() {
    this.productService.getProducts().subscribe(data => {
      this.products = data

      // Rastgele 5 ürün seçme
      this.randomProducts = this.getRandomProducts(this.products, 5);
    })
  }

  getRandomProducts(products: Product[], count: number): Product[] {
    if (count >= products.length) {
      return products; // Eğer ürün sayısı talep edilen sayıdan azsa, tüm ürünleri döndürün.
    }

    const randomProducts: Product[] = [];
    const shuffledProducts = [...products]; // Ürünleri karıştırabilmek için bir kopya oluşturun.

    // Ürünleri karıştırın
    for (let i = shuffledProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledProducts[i], shuffledProducts[j]] = [shuffledProducts[j], shuffledProducts[i]];
    }

    // İlk 'count' ürünü alın
    for (let i = 0; i < count; i++) {
      randomProducts.push(shuffledProducts[i]);
    }

    return randomProducts;
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max)
  }

}
