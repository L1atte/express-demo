/*
 * @Author: Latte
 * @Date: 2021-09-26 00:21:44
 * @LAstEditors: Latte
 * @LastEditTime: 2021-09-28 00:16:13
 * @FilePath: \express-demo\server.js
 */
const express = require('express')

const app = express()

// 解析json数据
app.use(express.json())

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

// 按id查询产品
app.get('/products/:id', async(req, res) => {
  const data = await Product.findById(req.params.id)
  res.send(data)
})

// 提交产品
app.post('/products', async(req, res) => {
  const data = req.body
  const product = await Product.create(data)
  res.send(product)
})

// 修改产品
app.put('/products/:id', async(req, res) => {
  const product = await Product.findById(req.params.id)
  product.title = req.body.title
  await product.save()
  res.send(product)
})

// 删除产品
app.delete('/products/:id', async(req, res) => {
  const product = await Product.findById(req.params.id)
  await product.remove()
  res.send({
    success: true
  })
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})