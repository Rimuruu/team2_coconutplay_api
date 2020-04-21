import {Account } from "../model/account.js"
import jwt from 'jsonwebtoken'
const JWT_SECRET = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"

// Connexion à un compte
export function loginIn(req,res){
    console.log(req.headers);
    Account.find({username: req.headers.username, password : req.headers.password }).then(function(account){
        if(account.length > 0){
            console.log("Compte existe");
            const payload = {
                username : account[0].username,
                email : account[0].email,
                role : account[0].role,
                name : account[0].name,
                surname : account[0].surname,
             
            }
            jwt.sign(payload,JWT_SECRET,{expiresIn: 120},(err,token)=> {
                if(err){
                    console.log(err);
                    res.status(500).send("error");
                    return;
                }
                res.send(token);
            })
         
        }
        else{
            console.log("Compte existe pas");
            res.status(404).json(false);
            }
    }).catch(function(err){
        throw err;
    })
}

//Recherche d'un compte existant
export function profileMe(req,res){
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];

    if(!authHeader){
        res.status(403).send('Unauthorized no Header');
        return
    }

    const authType = authHeader.split(" ")[0];
    const authToken = authHeader.split(" ")[1];
    if(authType != "Bearer"){
        res.status(403).send('Unauthorized not Bearer');
        return;
    }

    jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
        if(err){
            res.status(403).send('Unauthorized err');
            return;
        }
        Account.find({username: req.headers.username, password : req.headers.password }).then(function(account){
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
    })

   
}

//Inscription d'un compte
export function addAccount(req,res){
    Account.find({$or:[{username: req.headers.username},{ password : req.headers.password }]}).then(function(account){
        if(account.length > 0){
            console.log("Compte existant");
            res.status(403).json(false);
        }
        else{
            console.log("Compte créé");
            var newAccount = new Account(req.headers);
            newAccount.save().then(function(accountCreated){
                
                const payload = {
                    username : accountCreated.username,
                    email : accountCreated.email,
                    role : accountCreated.role,
                    name : accountCreated.name,
                    surname : accountCreated.surname,
                 
                }
                jwt.sign(payload,JWT_SECRET,{expiresIn: 120},(err,token)=> {
                    if(err){
                        console.log(err);
                        res.status(500).send("error");
                        return;
                    }
                    res.send(token);
                })
            })}
    }).catch(function(err){
        throw err;
    })
   
}



