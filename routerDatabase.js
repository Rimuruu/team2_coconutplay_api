const routesDatabase = (app)=>{
    var account = require('./controller/account');

    app.route('/register')
        .post(account.addAccount)

    
    app.route('/login')
        .get(account.loginIn);
}

export default routesDatabase;