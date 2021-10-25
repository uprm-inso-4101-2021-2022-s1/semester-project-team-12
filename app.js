const express =  require('express')

const app = express()
const port = 5000

//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use('/js', express.static(__dirname + 'public/js'))


//Set Views
app.set('views', './src/views')
app.set('view engine', 'ejs')


//Routes
const indexRouter = require('./src/routes/index')
const loginRouter = require('./src/routes/login')


app.use('', indexRouter)
app.use('/login', loginRouter)




/*app.get('', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})*/

//Listen on port 5000
app.listen(port, () => console.log(`Listening to port ${port}`))
