const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

//'''scrape webpage

//get / is home page. 
//then get /endpoint is for another page

const newspapers = [
    {
        name: 'the guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis'
    },
    {
        name: 'the times',
        address: 'https://www.thetimes.co.uk/environment/climate-change'
    },

]

const articles = []

app.get('/', (req, res) => {
    res.json('Welcome to my climate change news API')

})

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)  
            
            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                const source = newspaper.name
    
                articles.push({
                    title,
                    url,
                    source
                })
            })
        }).catch((err) => console.log(err))
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/close', (req, res) => {
    res.json("Exiting server")
    process.exit()
})

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
