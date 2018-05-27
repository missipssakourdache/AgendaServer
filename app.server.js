/**
 * importer les differents modules
 * qui nous permettrons d'utiliser la
 * persistence monbogdb
 */
var express = require('express');  
var path = require("path");   
var bodyParser = require('body-parser');  
var mongo = require("mongoose"); 

/**
 * On cree notre app Express qui discutera en format 
 * json de la BDD mongo
 */
var app = express()  
app.use(bodyParser());  
app.use(bodyParser.json({limit:'5mb'}));   
app.use(bodyParser.urlencoded({extended:true}));  
   
/**
 * on configure l'accessibilite aux webservices
 */
app.use(function (req, res, next) {        
     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
     res.setHeader('Access-Control-Allow-Credentials', true);       
     next();  
 });  


var Schema = mongo.Schema;  
  
var UsersSchema = new Schema({      
 name: { type: String   },       
 address: { type: String   },   
},{ versionKey: false });  
   

/*
 * on demande a mongo de faire un mapping sur l'objet
 * UsersSchema qui seront stockes dans la collections 'users'
 */
var model = mongo.model('users', UsersSchema, 'users');  

/*
 * home url
 */
app.get("/", function(){
	console.log("Agenda is up :)");
})

/*
 * le webservice qui permet d'enregister un utilisateur
 */
app.post("/api/save-user",function(req,res){   
	var mod = new model(req.body);  
 	if(req.body.mode =="save"){  
    	mod.save(function(err,data){  
      		if(err){  
         		res.send(err);                
      		}else{        
          		res.send({data:"Le nouveau utilisateur a été enregistré"});  
      		}  
 		});  
	}
})	  


/*
 * On demande a notre serveur d'ecouter les 
 * requetes qui pointent sur le port 9999 
 */
app.listen(9999, function () {  
	console.log('Serveur ecoute les requetes sur le port 9999!')  
});
