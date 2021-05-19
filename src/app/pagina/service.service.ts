import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  getCateg():Observable<any>{
    let adresa="http://localhost/WebSemantic/Proiect/select_categories.php";
    return this.http.get(adresa).pipe(map((res:Response)=>{
      let arr = [];  
      Object.keys(res).map(function(key){  
          arr.push([key,res[key]]);  
      });  
      return arr;
    }));
  }

  selectCateg(category:string):Observable<any>{
    let adresa="http://localhost/WebSemantic/Proiect/choose_category.php?item="+ category;
    return this.http.get(adresa).pipe(map((res)=>{
      console.log(res);
      let arr = [];  
      Object.keys(res).map(function(key){  
          arr.push([key,res[key]]);  
      });  
      return arr;
    }));
  }

  deleteProdus(nume):Observable<any>{
    let adresa="http://localhost/WebSemantic/Proiect/delete_product.php?product="+ nume;
    return this.http.get(adresa).pipe(map((res)=>{
      console.log(res);
      return res;
    }));
  }

  insertProduct(data):Observable<any>{
    let adresa="http://localhost/WebSemantic/Proiect/insert_product.php";
    return this.http.post<any>(adresa,{
      "denumire":data.denumire,
      "pret":data.pret,
      "categorie":data.categorie
    }, {headers : {
      'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }}).pipe(map((res)=>{
      return res;
    }),catchError(this.handleError));
  }

  private handleError(err:HttpErrorResponse){
    return throwError(err);
  }

}
