const express = require('express')
const app = express()
const port = 5555 || process.env.port

const fakeApiCall = [
  { id: 0, title: 'Lorem Ipsum', editor: 'foo', uri: 'https://spiegel.de' },
  { id: 1, title: 'Dolor Sit Amet', editor: 'bar', uri: 'https://google.com' }
]

app.listen(port)
console.log(`App listening on port ${port}`)

app.get('/stories/top', (req, res) => {
  let fetchTopStories = new Promise((resolve, reject) => {
    resolve(fakeApiCall)
  })
  fetchTopStories.then(data => {
    res.json({
      stories: data
    })
  })
})

app.get('/', (req, res) => {
  res.json({
    stories: 'Hello World'
  })
})
