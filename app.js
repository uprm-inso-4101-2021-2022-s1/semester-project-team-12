const express =  require('express')
const users = require('./data').userDB
const path = require('path')
const bcrypt = require('bcrypt')

const app = express()
const port = 3000
const userprofile =[]

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
app.use(express.urlencoded({extended: false}))
app.use(express.json())


//home routing

app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', async (req, res) => {
    const usermain = userprofile.find(usermain => userprofile.name = req.body.name)
    if(usermain == null){
        return res.status(400).send("The current information is not recorded")
    }

    try{
       if(await bcrypt.compare(req.body.password, usermain.password)){
        res.redirect('collections')
       }else{
        res.send("Information is Incorrect")
       }
    }catch{
        res.status(500).send()
    }
    res.render('login')
    res.json(usermain)
})

// app.post('/users', async(req, res) => {
//     try{
//         const salt = bcrypt.genSalt()
//         const passwordHashed = await bcrypt.hash(req.body.password, salt)
//         console.log(passwordHashed)
//         console.log(salt)
//         const user ={username: req.body.username, password: passwordHashed} 
//         users.push(user)
//         res.status(201).send()
//     }catch{
//         res.status(500).send
//     }

// })

app.post('/login', (req, res) => {

})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async(req, res) => {
    try{
        const salt = bcrypt.genSalt()
        const passwordHashed = await bcrypt.hash(req.body.password, salt)
        console.log(passwordHashed)
        console.log(salt)
        const user ={email: req.body.email, username: req.body.username, password: passwordHashed} 
        userprofile.push(user)
        res.status(201).send()
        res.redirect('login')
    }catch{
        res.redirect('register')
    }
    console.log(userprofile)
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

app.get('/art', (req, res) => {
    res.render('art')
})

//Listen on port 3000
app.listen(port, () => console.log(`Listening to the server on http://localhost:3000`))
