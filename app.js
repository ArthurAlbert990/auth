const express = require("express")
const path = require('path')
const session = require('express-session')
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const Schema = mongoose.Schema
require('dotenv').config()
const bcrypt = require('bcryptjs')



const mongoDb = (process.env.MONGO_URI)
mongoose.connect(mongoDb)
const db = mongoose.connection
db.on("error", console.error.bind(console, "mongo connection error"))

db ? console.log('DB conectado.') : 'erro em db'

const User = mongoose.model("User", new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
}))

const app = express()

app.use('/public', express.static('public'));

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")


app.use(session({ secret: 'dogs', resave: false, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }))


//AUTENTICAÇÃO
//inicializa passport / AUTENTICAÇÃO
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username })
            if (!user) {
                return done(null, false, { message: "Usuário incorreto" })
            }
            const match = await bcrypt.compare(password, user.password)
            if (!match) {
                return done(null, false, { message: "Senha incorreta" })
            }

            return done(null, user)

        } catch (err) {
            return done(err)
        }
    })
)
passport.serializeUser((user, done) => {
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})

//MIDDLEWARE PARA DAR ACESSO AO currentUser a TODAS AS VIEWS
// NÃO SENDO NECESSÁRIO PASSAR MANUALMENTE:
//pode ser acessador através da variável currentUser
app.use((req, res, next) => {
    try {
        res.locals.currentUser = req.user;
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

//ROTAS ROTAS ROTAS ROTAS...
app.get('/', (req, res) => {
    res.render('index', { user: req.user })
})

app.get('/sign-up', (req, res) => res.render('sign-up-form'))

app.post('/sign-up', async (req, res, next) => {
    try {
        //hash da senha, cria usuario
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) { next(err) }
            else {
                const user = new User({
                    username: req.body.username,
                    password: hash,
                })
                const result = await user.save()
                console.log('NOVO USUARIO: ' + result)
                res.redirect('/')
            }
        })
    } catch (err) {
        return next(err)
    }
})

app.post('/log-in', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/'
    }));

app.get('/log-out', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err)
        }
        res.redirect('/')
    })
})



app.listen(3000, () => console.log('App executando na porta 3000.'))