import {Account, Token } from "../model/account.js"
import jwt, { decode } from 'jsonwebtoken'
const JWT_SECRET = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"

// Connexion à un compte
export function loginIn(req,res){
  
    Account.find({username: req.headers.username, password : req.headers.password }).then(function(account){
        if(account.length > 0){
          
            const payload = {
                username : account[0].username,
                email : account[0].email,
                role : account[0].role,
                name : account[0].name,
                surname : account[0].surname,
                birthdate : account[0].birthdate,
             
            }
            jwt.sign(payload,JWT_SECRET,{expiresIn: 600000},(err,token)=> {
                if(err){
             
                    res.status(500).send("error");
                    return;
                }
            
                res.status(200).send({token:token,role:account[0].role});
            })
         
        }
        else{
         
            res.status(404).json(false);
            }
    }).catch(function(err){
      
    })
}



//Déconnexion
export function logout (req,res){
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
        var blacklistedToken = new Token({token:authToken});
        blacklistedToken.save().then(function(token){
            res.send('Logout'); 
        })
       
       
    })





}


//Profile de l'utilisateur
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

    Token.find({token : authToken}).then(function(token){
        if(token.length <= 0){
            jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
                if(err){
                    res.status(403).send('Unauthorized err');
                    return;
                }
               res.status(200).send(decoded);
            })
        }
        else{
            res.status(403).send('Token invalidate');
        }
    }).catch(function(err){
        throw err;
    })

   

   
}

//Inscription d'un compte
export function addAccount(req,res){
    Account.find({$or:[{username: req.headers.username},{ password : req.headers.password },{ email : req.headers.email }]}).then(function(account){
        if(account.length > 0){
         
            res.status(403).json(false);
        }
        else{
         
            var newAccount = new Account(req.headers);
            newAccount.save().then(function(accountCreated){
                
                const payload = {
                    username : accountCreated.username,
                    email : accountCreated.email,
                    role : accountCreated.role,
                    name : accountCreated.name,
                    surname : accountCreated.surname,
                    birthdate:accountCreated.birthdate,
                 
                }
                jwt.sign(payload,JWT_SECRET,{expiresIn: 120},(err,token)=> {
                    if(err){
                   
                        res.status(500).send("error");
                        return;
                    }
                    res.send({token:token,role:accountCreated.role});
                })
            })}
    }).catch(function(err){
        throw err;
    })
   
}


//Modifier le role d'un utilisateur
export function modifyRole(req,res){
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

    Token.find({token : authToken}).then(function(token){
        if(token.length <= 0){
            jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
                if(err){
                    res.status(403).send('Unauthorized err');
                    return;
                }
                else if(decoded.role != "admin"){
                    res.status(403).send('Unauthorized no admin');
                    return;
                }
        
                Account.findOneAndUpdate({username:req.params.user},{role:req.body.role},{new:false,upsert:false}).then(function(account){
                    if(account === null){
                
                        res.status(404).send('Compte existe pas');
                        
                    }
                    else{
                        res.status(200).send(true);
                    }
                }).catch(function(err){
        
                })

            })
        }
        else{
            res.status(403).send('Token invalidate');
        }
    }).catch(function(err){

    })
}