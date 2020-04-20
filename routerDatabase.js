const routesDatabase = (app)=>{
    var account = require('./controller/account');

    app.route('/register')
        .post(account.addAccount)
        .get(account.searchAccount);
}

export default routesDatabase;