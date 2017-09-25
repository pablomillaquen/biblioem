import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { PeticionesService } from '../services/peticiones.service';

@Component({
  selector: 'app-listmanual',
  templateUrl: './listmanual.component.html',
  styleUrls: ['./listmanual.component.css'],
  providers:[PeticionesService]
})
export class ListmanualComponent implements OnInit {
  
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "name";
  public sortOrder = "asc";
  public articulos;


  constructor(private _http: Http, private _peticionesService:PeticionesService) { }

  ngOnInit(){
  	this._http.get("assets/data.json")
  		.subscribe((data)=>{
  			setTimeout(()=>{
  				this.data = data.json();
  			}, 2000);
  		});
  // console.log(this._peticionesService.getPrueba());
  // this._peticionesService.getArticulos().subscribe(
  //   result =>{
  //     this.articulos = result;
  //     if(!this.articulos){
  //       console.log("error en el servidor");
  //     }
  //   },
  //   error=>{
  //     var err = <any>error;
  //     console.log(err);
  //   })
  }


}
