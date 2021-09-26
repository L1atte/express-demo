/*
 * @Author: Latte
 * @Date: 2021-09-26 00:21:44
 * @LAstEditors: Latte
 * @LastEditTime: 2021-09-27 00:34:31
 * @FilePath: \express-demo\server.js
 */
const express = require('express')

const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-demo')

const Product = mongoose.model('Product', new mongoose.Schema({
  title: String,
}))
// Product.insertMany([
//   { title: 'product A'},
//   { title: 'product B'},
//   { title: 'product C'},
// ])

// 开启跨域
app.use(require('cors')())

// 使用中间件 express.static ，处理静态文件托管
app.use('/', express.static('public'))

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/products', async(req, res) => {
  res.send(await Product.find())
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})