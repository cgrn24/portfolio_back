// import express from 'express'
const express = require('express')
const app = express()
const nodemailer = require('nodemailer')
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let login = process.env.LOGIN
let pass = process.env.PASS

//settings for rambler
let transporter = nodemailer.createTransport({
  pool: true,
  host: 'smtp.rambler.ru',
  port: '465',
  secure: true,
  auth: {
    user: login,
    pass: pass,
  },
  // tls: {
  //   // ciphers: 'SSLv3',
  //   rejectUnauthorized: false,
  // },
})

app.get('/', function (req, res) {
  res.send('Hi')
})

app.get('/message', async function (req, res) {
  let { message, contacts, name } = req.body
  let info = await transporter.sendMail({
    from: login, // sender address
    to: 'aln724@proton.me', // list of receivers
    subject: 'From portfolio page', // Subject line
    html: `<div>name:  ${name} </div><div>contacts ${contacts}</div> <div> ${message}</div>`,
  })
  res.send('Success')
})

let port = process.env.PORT || 3010

app.listen(port, function () {
  console.log('App listening on port 3010')
})
