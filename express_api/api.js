const express = require('express');
const app = express();

const client = require('./connection'); 
const bodyParser = require('body-parser') ; 
var cors = require('cors');

app.use(cors());
app.use(express.json()) ;


app.use(bodyParser.urlencoded({ extended: false })) ;





app.get('/get_trades', async (request, response)=>{
    try{
		res.setHeader("Access-Control-Allow-Origin", "*");
        const  all_data = await client.query(`SELECT * FROM volatility_trades` );
        response.send(all_data.rows);
        //console.log(all_data.rows) ;
    }
    catch(err){
        console.log(err.message) ;
    }
   
        
    });

app.post('/transaction_insert', async (req, res)=>{
    try{

		res.setHeader("Access-Control-Allow-Origin", "*");
		{"datedebut"24"
		"datefin" :"25"
		
		}
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


        const insert_data = await client.query(
            `INSERT INTO mondat (
                cin_expediteur ,
                nom_expediteur ,
                prenom_expediteur ,
                montant_expediteur ,

                nom_destinataire ,
                prenom_destinataire ,
                gsm_destinataire 

                ) VALUES (
                $1 ,
                $2 ,
                $3 , 
                $4, 


                $5 , 
                $6 , 
                $7 
                ) RETURNING *`,[
                
                cin_expediteur,
                nom_expediteur,
                prenom_expediteur,
                montant_expediteur,
                nom_destinataire,
                prenom_destinataire,
                gsm_destinataire

            ]
        ) ;
        res.json(insert_data) ;
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



