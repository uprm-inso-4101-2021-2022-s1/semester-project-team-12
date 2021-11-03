const express =  require('express')
const users = require('./data').userDB
const path = require('path')

const app = express()
const port = 3000

//load Static files
app.use(express.static('public'))
app.use('/css', express.static(path.join(__dirname, 'public/css')))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/assets', express.static(path.join(__dirname, 'pulbic/assets')))

//Set Views
app.set('views', './src/views')
app.set('view engine', 'ejs')


//Routes
const indexRouter = require('./src/routes/index')
const loginRouter = require('./src/routes/login')


app.use('', indexRouter)
app.use('/login', loginRouter)
app.use('/css', express.static(path.join('/node_modules/bootstrap/dist/css')))


//home routing

app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/profile', (req, res) => {
    res.render('profile')
})

app.get('/collections', (req, res) => {
    res.render('collections')
})

app.get('/gallery', (req, res) => {
    res.render('gallery')
})

app.get('/logout', (req, res) => {
    res.render('logout')
})

//Listen on port 3000
app.listen(port, () => console.log(`Listening to the server on http://localhost:3000`))
