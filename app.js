const express =  require('express')

const app = express()
const port = 5000

//Listen on port 5000
app.listen(port, () => console.log('Listening on port ${port}'))
