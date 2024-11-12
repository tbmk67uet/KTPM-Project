const path = require('path')
const express = require('express')
const app = express()
const { engine } = require ('express-handlebars');
const port = 3000

app.use(express.static(path.join(__dirname,'public')))

app.engine('handlebars',engine())
app.set('view engine','handlebars')
app.set("views", path.join(__dirname,'resources\\views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/news', (req, res) => {
  res.render('news')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})