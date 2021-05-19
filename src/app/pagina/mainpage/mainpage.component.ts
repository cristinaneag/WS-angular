import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  showCategories:boolean = false;
  categories=[];
  currentProducts=[];
  currentCateg=null;
  error:string;success:string;

  ngOnInit(): void {
  }

  constructor(private service:ServiceService){}

  renderCategories(){
    this.showCategories = true;
    this.service.getCateg().subscribe(res=>this.categories=res);
  }

  chooseCategory(categ){
    this.service.selectCateg(categ[1]).subscribe(res=>{
      this.currentProducts=res;
    });
    this.currentCateg=categ;
  }

  deleteProduct(name){
    this.service.deleteProdus(name).subscribe(res=>{
      if(res==1){
        this.chooseCategory(this.currentCateg);
      }
    });
  }

  submitForm(form:NgForm){
    if(this.currentCateg==null){
      alert("Va rugam selectati o categorie!");
    }
    else{
      let data=[]
      data["denumire"]=form.value.denumire;
      data["pret"]=form.value.pret;
      data["categorie"]=this.currentCateg[0];
    if(form.value.denumire!="" && form.value.pret!="")
    {this.service.insertProduct(data).subscribe((res)=>{
      if(res==1){
        this.chooseCategory(this.currentCateg);
        this.error=null;
        this.success="Produs inserat cu succes";
      }
    },
    (err)=>{
      this.success=null;
      this.error = err.error.text;
    });}
    else{
      this.error="Completati campurile.";
    }
    }
  }


}
