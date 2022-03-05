const PORT = 8080
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()

const url = 'https://www.theguardian.com/uk'
const articles = []

// axios handles external urls
// cheerios is used to target elements within html like jquery

axios(url).then(
    response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('.fc-item__title', html).each(function() {
            const title = $(this).text()
            const url = $(this).find('a').attr('href')

            articles.push({
                title,
                url
            })
        })
        // console.log(articles)
    }).catch(err => console.log(err))


//express serves your specified response when a call is made to the endpoint '/'
app.get('/', (req, res) => {
    res.json(articles)
})

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`))