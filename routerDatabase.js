const routesDatabase = (app)=>{
    var account = require('./controller/account');

    app.route('/register')
        .post(account.addAccount)

    
    app.route('/login')
        .get(account.loginIn)

    app.route('/profile/me')
        .get(account.profileMe)
}
export default routesDatabase;