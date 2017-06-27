const express = require('express')
const app = express()
const port = 5555 || process.env.port
const axios = require('axios')

const topstories = []
let accumulatedStories = {}
const accumulatedTitles = []
const accumulatedEditors = []
const accumulatedIDs = []
const accumulatedScores = []
const accumulatedURIs = []

const getAllTopStories = () => {
  const fetchTopStories = new Promise((resolve, reject) => {
    axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(allStories => {
        for (let i = 0; i < 9; i++) {
          const newsItem = allStories.data[i]
          topstories.push(newsItem)
        }
        for (const topstory of topstories) {
          axios
            .get(
              'https://hacker-news.firebaseio.com/v0/item/' + topstory + '.json'
            )
            .then(stories => {
              let newsID = Math.ceil(Math.random(10))
              let newsTitle = stories.data.title
              let newsEditor = stories.data.by
              let newsScore = stories.data.score
              let newsURI = stories.data.url

              accumulatedIDs.push({ id: newsID })
              accumulatedTitles.push({ title: newsTitle })
              accumulatedEditors.push({ editor: newsEditor })
              accumulatedScores.push({ score: newsScore })
              accumulatedURIs.push({ uri: newsURI })

              accumulatedStories = {
                stories: {
                  ids: accumulatedIDs,
                  titles: accumulatedTitles,
                  editors: accumulatedEditors,
                  scores: accumulatedScores,
                  uris: accumulatedURIs
                }
              }

              resolve(accumulatedStories)
            })
        }
      })
  })

  fetchTopStories.then(data => {
    app.get('/topstories', (req, res) => {
      res.json({ hi: data })
    })
  })
}

getAllTopStories()

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
