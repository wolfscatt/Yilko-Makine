import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../product/product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path = environment.path + "/products"
  constructor(private http: HttpClient, private injector: Injector) { }
  accountService = this.injector.get(AccountService)

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.path )
    .pipe(tap(data=> console.log("Data alındı")), catchError(this.handleError));
  }

  addProduct(product: Product): Observable<Product>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`${this.accountService.token}`
      })
    }
    return this.http.post<Product>(this.path + "/add", product, httpOptions)
    .pipe(tap(data=> console.log(JSON.stringify(data))), catchError(this.handleError));
  }

  deleteProduct(productId: number): Observable<Product> {
    const url = `${this.path}/delete/${productId}`; // Silinecek ürünün URL'sini oluşturun

    return this.http.delete<Product>(url)
      .pipe(
        tap(() => console.log(`Ürün (ID: ${productId}) başarıyla silindi.`)),
        catchError(this.handleError)
      );
  }

  updateProduct(productName:string, product:Product): Observable<Product>{
    const url = `${this.path}/update/${productName}`
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':`${this.accountService.token}`
      })
    }
    return this.http.put<Product>(url, product, httpOptions)
    .pipe(tap(() => console.log(`Ürün (İsim: ${product.name}) başarıyla güncellendi.`)),catchError(this.handleError))
  }

  getProduct(productName:string): Observable<Product>{
    const url = `${this.path}/${productName}`;
    return this.http.get<Product>(url)
    .pipe(tap(data=> console.log(`Ürün (İsim: ${data.name}) başarıyla alındı.`)), catchError(this.handleError));
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
