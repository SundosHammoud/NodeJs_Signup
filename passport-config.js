const LocalStrategy = require('passport-local').Strategy;


function initPassport(passport, getUserByEmailAndPassword, getUserByID)
{
    const authenticateUser = async (email, password, done) => {
        try
        {
            const user = await getUserByEmailAndPassword(email, password);            
            if(user == null)
                return done(null, false, {message: "User not found."})
            
            return done(null, user); 
        }catch(e){
            return done(null, false, {message: "error: User not found."})
        }
        
      
    }

    passport.use(new LocalStrategy({usernameField: 'email'},authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async(id, done) => {
        try
        {
            return done(null, await getUserByID(id));
        }catch(e){
            console.log("unable to deserialize")
        }
        
    });
}

module.exports = initPassport;