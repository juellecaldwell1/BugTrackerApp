import GoogleStrategy from "passport-google-oauth2"
import passport from "passport";
import userInfo from "../Model/userSchema.js";
import env from "dotenv";
env.config();
const authForGoogle = async () => {
    try{

        passport.use(new GoogleStrategy({
            clientID:     process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/app/google/callback",
            passReqToCallback   : true
          },
          function(request, accessToken, refreshToken, profile, done) {
           done(null, profile);
          }
        ));


    }
    catch(error){
        console.error(error);   
    }
}

const sUsers = () => {
    passport.serializeUser((user, done) =>{
    done(null, user);
    }) 
    
}

const dUsers = () => {
    passport.deserializeUser((id, done) =>{
    done(null, user);
    })
}

const getInfo = () => {

    passport.authenticate('google', { scope:

        [ 'email', 'profile' ] })
}

const authenticate = () => {

  passport.authenticate( 'google', {
    
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
})
}

export default {
    authForGoogle,
    sUsers,
    dUsers
}