const express = require('express');
const app = express();

const client = require('./connection'); 
const bodyParser = require('body-parser') ; 
const twilio = require("twilio") ;
var cors = require('cors');

app.use(cors());
app.use(express.json()) ;


app.use(bodyParser.urlencoded({ extended: false })) ;



app.get('/get_trades', async (req, res)=>{
    try{
		res.setHeader("Access-Control-Allow-Origin", "*");
        const  all_data = await client.query(`SELECT * FROM mondat ` );
        response.send(all_data.rows);
        //console.log(all_data.rows) ;
    }
    catch(err){
        console.log(err.message) ;
    }
   
        
    });

app.post('/transaction_insert', async (req, res)=>{
    try{


       // const {data} = req.body;
       // var the_id  = req.body.id;
       // var the_index = req.body.index;
        //var the_ruunerid = req.body.runner_id;
        //const insert_data = await client.query(
         //   `INSERT INTO volatility_trades (id , index , runnerid) VALUES ($1 ,$2 , $3 ) RETURNING *`,[the_id,the_index,the_ruunerid ]
        //) ;

        var cin_expediteur  = (req.body.cin_expediteur);
        var nom_expediteur   = (req.body.nom_expediteur);
        var prenom_expediteur   = (req.body.prenom_expediteur);
        var montant_expediteur    = (req.body.montant_expediteur);

        var nom_destinataire   =( req.body.nom_destinataire);
        var prenom_destinataire   = (req.body.prenom_destinataire);
        var gsm_destinataire   = (req.body.gsm_destinataire);
		
		
		var date = ( req.body.date)  ;
		var refpayment =  ( req.body.ref_payment)  ;
        var etat_payment  =  (req.body.etat_payment)   ;
		

        const insert_data = await client.query(
            `INSERT INTO mondat (
                cin_expediteur ,
                nom_expediteur ,
                prenom_expediteur ,
                montant_expediteur ,

                nom_destinataire ,
                prenom_destinataire ,
                gsm_destinataire ,
				date,
				refpayment,
				etat_payment
				
			

                ) VALUES (
                $1 ,
                $2 ,
                $3 , 
                $4, 


                $5 , 
                $6 , 
                $7 ,
				$8 ,
				$9 ,
				$10
                ) RETURNING *`,[
                
                cin_expediteur,
                nom_expediteur,
                prenom_expediteur,
                montant_expediteur,
				
                nom_destinataire,
                prenom_destinataire,
                gsm_destinataire ,
				date,
				refpayment,
				etat_payment

            ]
        ) ;
        res.json(insert_data) ;
    }
    catch(err){
        console.log(err.message) ;
    }
	
   
        
    });

app.post('/sendSMS', async (req, res)=>{
    try{
		const accountSid = "AC593ddc41fe0dc79f837807346b29e522";
		const authToken = "6578228858db50305641f24b14e014dd";
		const client = require('twilio')(accountSid, authToken);
		
		var cin_expediteur =(  req.body.cin_expediteur);
		var nom_expediteur =(  req.body.nom_expediteur);
		var prenom_expediteur =(  req.body.prenom_expediteur);
		var montant_expediteur =(  req.body.montant_expediteur);

		var nom_destinataire =(req.body.nom_destinataire) ;
		var prenom_destinataire =  (  req.body.prenom_destinataire);
		var gsm  = req.body.gsm_destinataire;

		var ref_payment =(  req.body.ref_payment) ; 
		var date=(  req.body.date)   ;
		

	
		
		
		var text_to_send = "un montant de " + montant_expediteur 
		+"de la part de "+ nom_expediteur+"  "+prenom_expediteur+"  "+
		"etais envouyer pour toi "  + nom_destinataire+"  "+ prenom_destinataire+
		"  sous le referant de   " + ref_payment ; 
		client.messages
		  .create({
			 body:   text_to_send  ,
			 from: '+18508209149',
			 to: '+21620779907'
		   })
		  .then(message => console.log("message sent succesfully"));

				
    }
    catch(err){
        console.log(err.message) ;
    }

   
        
    });

app.listen(4000, () =>{
    console.log("Sever is now listening at port 4000");
});
 
client.connect();

//client.end();
//client.connect();



