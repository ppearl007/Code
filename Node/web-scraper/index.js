const PORT = 8080
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))