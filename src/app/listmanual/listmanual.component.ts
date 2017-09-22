import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-listmanual',
  templateUrl: './listmanual.component.html',
  styleUrls: ['./listmanual.component.css']
})
export class ListmanualComponent implements OnInit {
  
  public data: any[];
  public filterQuery = "";
  public rowsOnPage = 5;
  public sortBy = "email";
  public sortOrder = "asc";


  constructor(private _http: Http) { }

  ngOnInit():void {
  	this._http.get("assets/data.json")
  		.subscribe((data)=>{
  			setTimeout(()=>{
  				this.data = data.json();
  			}, 2000);
  		});
  }

}
