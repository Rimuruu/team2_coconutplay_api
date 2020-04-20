import {Account } from "../model/account.js"



//Recherche d'un compte existant
export function searchAccount(req,res){
    Account.find({username: req.body.username, password : req.body.password }).then(function(account){
        if(account.length > 0){
            console.log("Compte existe");
            res.status(200).json(account);
        }
        else{
            console.log("Compte existe pas");
            res.status(404).json(false);
            }
    }).catch(function(err){
        throw err;
    })
}

//Inscription d'un compte
export function addAccount(req,res){
    Account.find({username: req.body.username, password : req.body.password }).then(function(account){
        if(account.length > 0){
            console.log("Compte existant");
            res.status(403).json(false);
        }
        else{
            console.log("Compte créé");
            var newAccount = new Account(req.body);
            newAccount.save().then(function(accountCreated){
                res.status(201).json(accountCreated);
            })}
    }).catch(function(err){
        throw err;
    })
   
}