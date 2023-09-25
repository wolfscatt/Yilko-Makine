import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path = "http://localhost:3000/products"
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.path)
    .pipe(tap(data=> console.log(JSON.stringify(data))), catchError(this.handleError));
  }

  addProduct(product: Product): Observable<Product>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':'Blank'
      })
    }
    return this.http.post<Product>(this.path, product, httpOptions)
    .pipe(tap(data=> console.log(JSON.stringify(data))), catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<Product> {
    const url = `${this.path}/${productId}`; // Silinecek ürünün URL'sini oluşturun

    return this.http.delete<Product>(url)
      .pipe(
        tap(() => console.log(`Ürün (ID: ${productId}) başarıyla silindi.`)),
        catchError(this.handleError)
      );
  }

  updateProduct(product:Product): Observable<Product>{
    const url = `${this.path}/${product.id}`

    return this.http.put<Product>(url, product)
    .pipe(tap(() => console.log(`Ürün (ID: ${product.id}) başarıyla güncellendi.`)),catchError(this.handleError))
  }
  getProduct(productId:number): Observable<Product>{
    const url = `${this.path}/${productId}`;
    return this.http.get<Product>(url)
    .pipe(tap(data=> console.log(`Ürün (ID: ${productId}) başarıyla alındı.`)), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
    let errorMsg = ""
    if(error.error instanceof ErrorEvent){
        errorMsg = `Ürünler gelirken bir hata oluştu. -> ${error.error.message}`
    }else{
        errorMsg = "Sistemsel bir hata oluştu."
    }

    return throwError(errorMsg) 
  }
}
