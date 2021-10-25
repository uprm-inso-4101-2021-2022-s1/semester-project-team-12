const express = require('express')
const indexRouter = express.Router()

indexRouter.get('', async(req, res) => {
    res.render('index')
})

module.exports = indexRouter