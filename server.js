const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();
const bcrypt = require('bcrypt');
const sequelize = require('./database');
const flash = require('express-flash');
const { encrypt, decrypt } = require('./Helpers/crypto');
const passport = require('passport');
const initPassport = require('./passport-config');
const axios = require('axios');
require("dotenv").config();

//setting the boy parser
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
app.use(bodyParser.urlencoded({extended: true}));
const User = require('./models/User')(sequelize, DataTypes);
const Country = require('./models/Country')(sequelize, DataTypes);

//static files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

initPassport(passport, 
             async (email, password) => {
                 try{                    
                    const user = await User.findOne({where : {email: email}});                    
                    if(user == null)
                    {
                        return null;
                    }
                    
                    const dencryptedPassword = decrypt(user.password).toString();                    
                    if(dencryptedPassword == password)
                        return user;
                    else
                        return null;
                 }catch (e){
                    return null;
                 }
                
                
                },
                async(id) => {
                    try{
                        const user = await User.findOne({where : {id: id}});
                        return user;
                    }catch(e){
                        return null;
                    }
                    
                });

sequelize.sync().then();

app.set('view-engine','ejs');
app.use(express.urlencoded({extended: false }))

//Set cookie parser
app.use(cookieParser('secretStringForCookies'));
//Set sessions
app.use(session({
    secret: 'secretStringForSessions',
    cookie: {maxAge: 3600000},
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize())
app.use(passport.session())
//Set flash
app.use(flash());

//Setting up routes
app.get('/', checkNotAuthenticated, (req, res) => {
    const errorMsg = req.flash('errorMsg');
    res.render('signup.ejs', {errorMsg});
});

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs');    
});

app.get('/signup', (req, res) => {
    const errorMsg = req.flash('errorMsg');
    res.render('signup.ejs', {errorMsg});
})

app.get('/newsfeed', checkAuthenticated, async (req, res) => { 
    try{
        const newsAPI = await axios.get('https://raddy.co.uk/wp-json/wp/v2/posts/');        
        res.render('newsfeed.ejs', {articles: newsAPI.data});
    }catch(e){

    }   
    
})

app.get('/article/:id', checkAuthenticated, async (req, res) => { 
    try{
        
        let articleID = req.params.id;        
        const newsAPI = await axios.get('https://raddy.co.uk/wp-json/wp/v2/posts/'+ articleID);        
        res.render('newsSingle.ejs', {article: newsAPI.data});
    }catch(e){

    }   
    
})

app.post('/signUp', checkNotAuthenticated, async(req, res) => {
    
    try{    
        //check if the email is duplicated   
        console.log('fetching a user');
        const user = await User.findOne({where : {email: req.body.email}});
        console.log("got user");
        if(user != null)
        {
            req.flash('errorMsg', 'email already exists!');
            res.redirect('/signUp');            
        }
        else
        {
            console.log("encrypting password");
            //save the user into the DB 
            const encryptedPassword = encrypt(req.body.password).toString();
            console.log("adding user");
            await User.create({name: req.body.name, 
                     email: req.body.email,
                     password: encryptedPassword,
                     countryID: 1});
            console.log("user added");
            res.redirect('/login');
        }
        
    }catch (e){ 
        console.log(e.message);       
        res.redirect('/signUp');
    }
    
});
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/newsfeed',
    failureRedirect: '/login',
    failureFlash: true
}));

function checkAuthenticated(req, res, next)
{
    //If the user is authenticated let him continue or direct him to the login page 
    if(req.isAuthenticated())
        return next();
    res.redirect('/login');
}

function checkNotAuthenticated(req, res, next)
{
    //If the user is authenticated redirect him to the newsfeed
    if(req.isAuthenticated())
        return res.redirect('/newsfeed');
    next();
    
}
const port = process.env.PORT || 8000
app.listen(port);
