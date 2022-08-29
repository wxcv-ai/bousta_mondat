import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})

export class AppComponent {
  title = 'mondat_app';
  constructor(private dialogRef : MatDialog){}
  ref_payment="" ;

  montant_source="" ;
  cin_source="" ;
  nom_source="" ;
  prenom_source="" ;
  gsm_source="" ;
  address_source="" ;

  cin_receiver="" ;
  nom_receiver="" ;
  prenom_receiver="" ;
  gsm_receiver="" ;
  address_receiver="" ;
  

  show_off_string = "";

  getref_payment(val:string){

    this.ref_payment = val ;
  }
  getmontant_source(val:string){

    this.montant_source = val ;
  }
  getcin_source(val:string){

    this.cin_source = val ;
  }
  getnom_source(val:string){

    this.nom_source = val ;
  }
  getprenom_source(val:string){

    this.prenom_source = val ;
  }
  getnom_receiver(val:string){

    this.nom_receiver = val ;
  }
  getprenom_receiver(val:string){

    this.prenom_receiver = val ;
  }
  getgsm_receiver(val:string){

    this.gsm_receiver = val ;
  }


  openDialog(){
    this.dialogRef.open(PopUpComponent,{
      data : {
        
        montant_source : this.montant_source,
        cin_source : this.cin_source,
        nom_source : this.nom_source,
        prenom_source : this.prenom_source,

        nom_receiver : this.nom_receiver,
        prenom_receiver : this.prenom_receiver,
        gsm_receiver : this.gsm_receiver

      }
    });
  }

  submit(){
    
 
    if (
      
      (this.montant_source).length != 0 &&
      (this.cin_source).length != 0 &&
      (this.nom_source).length != 0 &&
      (this.prenom_source).length != 0 &&


      (this.nom_receiver).length != 0 &&
      (this.prenom_receiver).length != 0 &&
      (this.gsm_receiver).length != 0 &&
      (this.ref_payment).length != 0 
      
    
    ){
      this.show_off_string = "" ;
      this.openDialog() ;
    }
    else {
      this.show_off_string = "il ya des champs qui sont vide il faut de le remplir tous correctement" ; 

    }


  
   

  }
}
