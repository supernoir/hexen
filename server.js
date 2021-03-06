const express = require('express')
const app = express()
const path = require('path')
const port = process.env.port || 5555
const axios = require('axios')

const moment = require('moment')

module.exports = {
  app: function() {
    const indexPath = path.join(__dirname, '/../index.html')
    const publicPath = express.static(path.join(__dirname, '../public'))

    app.use('/public', publicPath)
    app.get('/', function(_, res) {
      res.sendFile(indexPath)
    })

    return app
  }
}

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('./webpack.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  )
}

const topstories = []
let accumulatedStories = []
const accumulatedTitles = []
const accumulatedEditors = []
const accumulatedIDs = []
const accumulatedScores = []
const accumulatedURIs = []
const allStories = []
const accumulatedTexts = []
const accumulatedTimes = []
const accumulatedTypes = []

app.use(function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  response.header(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, DELETE, OPTIONS'
  )
  next()
})

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
              let timestamp = moment.unix(stories.data.time)
              timestamp = moment().format('MMMM Do YYYY, h:mm:ss a')

              accumulatedIDs.push(1)
              accumulatedEditors.push(stories.data.by)
              accumulatedTitles.push(stories.data.title)
              accumulatedScores.push(stories.data.score)
              accumulatedURIs.push(stories.data.url)
              accumulatedTexts.push(stories.data.text)
              accumulatedTimes.push(timestamp)
              accumulatedTypes.push(stories.data.type)

              for (let s = 0; s < 9; s++) {
                accumulatedStories[s] = [
                  {
                    id: s,
                    title: accumulatedTitles[s],
                    editor: accumulatedEditors[s],
                    score: accumulatedScores[s],
                    uri: accumulatedURIs[s],
                    text: accumulatedTexts[s],
                    type: accumulatedTypes[s],
                    time: accumulatedTimes[s]
                  }
                ]
              }

              resolve(accumulatedStories)
              reject('Error')
            })
            .catch(err => console.error(err))
        }
      })
  })

  fetchTopStories.then(data => {
    app.get('/stories/top', (req, res) => {
      res.json({ stories: data })
    })
  })
}

getAllTopStories()

app.listen(port)
console.log(`App listening on port ${port}`)

app.get('/', (req, res) => {
  res.json({
    stories: 'Hello World'
  })
})
