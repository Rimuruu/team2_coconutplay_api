const routesDatabase = (app)=>{
    var account = require('./controller/account');

    app.route('/register')
        .post(account.addAccount)

    
    app.route('/login')
        .get(account.loginIn)

    app.route('/logout')
        .get(account.logout)

    app.route('/profile/me')
        .get(account.profileMe)

    app.route('/profile/:user')
        .put(account.modifyRole)
}
export default routesDatabase;