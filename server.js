var express = require('express')
var multer = require('multer')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var passport = require('passport')

var config = require('./config')

mongoose.connect(config.mongo)

app.use(multer('dev')) // Middleware to track all requests
app.use(bodyParser.json()) // Middleware to parse json objects
app.use(bodyParser.urlencoded({extended: true})) // Middleware to parse urls using `qs` library

app.use(passport.initialize()) // Initialize passport library
app.use(passport.session()) // Use default passport session library using cookies
app.use(express.static('public')) // Serve static files from public folder

require('./app')(app, passport)
app.listen(config.port) // Listen to port based on environment variable