import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      return res;
    }));
  }
}
