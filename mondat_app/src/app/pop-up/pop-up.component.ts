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
  cin_source = "";
  nom_source;
  prenom_source;
  nom_receiver;

  prenom_receiver;
  gsm_receiver;

  currentDate = new Date();
  cDay = (this.currentDate.getDate()).toString() ;
  cMonth =( this.currentDate.getMonth() + 1).toString() ;
  cYear = (this.currentDate.getFullYear()).toString();

  chours = (this.currentDate.getHours()).toString() ;
  cmins = (this.currentDate.getMinutes() ).toString() ;
  csecs = (this.currentDate.getSeconds()).toString()  ;
  
  makeAdate(){
    if ((this.cDay).length == 1){
      this.cDay = "0"+this.cDay ;
    }
    if ((this.cMonth).length == 1){
      this.cMonth = "0"+this.cMonth ;
    }
    if ((this.cYear).length == 1){
      this.cYear = "0"+this.cYear ;
    }
    if ((this.chours).length == 1){
      this.chours = "0"+this.chours ;
    }
    if ((this.cmins).length == 1){
      this.cmins = "0"+this.cmins ;
    }
    if ((this.csecs).length == 1){
      this.csecs = "0"+this.csecs ;
    }
  
    
    var date = this.cYear + "-" + this.cMonth + "-" + this.cDay  +"T"+ this.chours+ ":" + this.cmins + ":" + this.csecs+".000Z";

    return date ;
  }

  date = this.makeAdate() ;
//,  private httpClient :HttpClient 
//@Inject(MAT_DIALOG_DATA) public data 
  constructor(  @Inject(MAT_DIALOG_DATA) public data ,  private httpClient :HttpClient  ) {
    this.montant_source = parseFloat(data.montant_source),
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
   SendSMSdetails(){
    const url ="http://127.0.0.1:4000/sendSMS" ;
    var the_date = this.makeAdate() ;
    var date = new Date(the_date);
    var lastseconds = date.getTime() / 1000; //1440516958
    var seconds =  lastseconds+  (this.cin_source) ;

    const data_req = {
      "cin_expediteur" :( this.cin_source),
      "nom_expediteur" :( this.nom_source),
      "prenom_expediteur" :( this.prenom_source),
      "montant_expediteur" :( this.montant_source)*0.81,

      "nom_destinataire" :( this.nom_receiver),
      "prenom_destinataire" :( this.prenom_receiver),
      "gsm_destinataire" :( this.gsm_receiver) , 

      "ref_payment" :( seconds)  , 
      "date":( the_date)  , 
      "etat_payment":(true)  ,      
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
  }
  OnConfirm2(){
    const url ="http://localhost:4000/transaction_insert" ;
    this.SendSMSdetails() ;
    // "2015-08-25T15:35:58.000Z"
    var the_date = this.makeAdate() ;
    var date = new Date(the_date);
    var lastseconds = date.getTime() / 1000; //1440516958
    var seconds =  lastseconds+  (this.cin_source) ;

    const data_req = {
      "cin_expediteur" :( this.cin_source),
      "nom_expediteur" :( this.nom_source),
      "prenom_expediteur" :( this.prenom_source),
      "montant_expediteur" :( this.montant_source)*0.81,

      "nom_destinataire" :( this.nom_receiver),
      "prenom_destinataire" :( this.prenom_receiver),
      "gsm_destinataire" :( this.gsm_receiver) , 

      "ref_payment" :( (seconds))  , 
      "date":( the_date)  , 
      "etat_payment":(true)  , 
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

