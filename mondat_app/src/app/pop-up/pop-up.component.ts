import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
//import * as Client from 'pg';
import { json } from 'express' ;
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})




export class PopUpComponent implements OnInit {
  
  
  montant_source;
  cin_source;
  nom_source;
  prenom_source;
  nom_receiver;
  prenom_receiver;
  gsm_receiver;

//,  private httpClient :HttpClient 
//@Inject(MAT_DIALOG_DATA) public data 
  constructor(  @Inject(MAT_DIALOG_DATA) public data ,  private httpClient :HttpClient  ) {
    this.montant_source =parseFloat(data.montant_source),
    this.cin_source = data.cin_source,
    this.nom_source = data.nom_source,
    this.prenom_source = data.prenom_source,

    this.nom_receiver = data.nom_receiver,
    this.prenom_receiver = data.prenom_receiver,
    this.gsm_receiver = data.gsm_receiver
  }

  ngOnInit(): void {
  }

  
  OnConfirm(){
    const url ="http://127.0.0.1:4000/get_trades" ;
     this.httpClient.get<HttpClient>(url).subscribe(
      response=>{
        //console.log(response) ;

        this.data = response ;
      }
    )
  }
  OnConfirm2(){
    const url ="http://localhost:4000/transaction_insert" ;

    const data_req = {
      "cin_expediteur" :( this.cin_source),
      "nom_expediteur" :( this.nom_source),
      "prenom_expediteur" :( this.prenom_source),
      "montant_expediteur" :( this.montant_source),

      "nom_destinataire" :( this.nom_receiver),
      "prenom_destinataire" :( this.prenom_receiver),
      "gsm_destinataire" :( this.gsm_receiver)
    }

    

    this.httpClient.post<HttpClient>(url,data_req)
    .subscribe(

      res=>{
        console.log(res);
      },
      err=>{
        console.log('err:'+err);
      }
    ) ;
    this.montant_source ="";
    this.cin_source = "";
    this.nom_source = "";
    this.prenom_source = "";
    this.nom_receiver = "";
    this.prenom_receiver = "";
    this.gsm_receiver = "";
  }
}

