'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import Button from './components/Button'

const topstories = []
let accumulatedStories = {}
const accumulatedTitles = []
const accumulatedEditors = []
const accumulatedIDs = []
const accumulatedScores = []
const accumulatedURIs = []

class NewsItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      news: []
    }
  }

  componentWillMount() {
    axios.get('http://localhost:5555/stories/top').then(res => {
      const allStories = res.data.stories.map(s => s[0])
      //console.log(allStories);
      this.setState({ news: allStories })
    })
  }

  render() {
    return (
      <ul>
        {this.state.news.map(n => (
          <li key={n.id}>
            <div className="news-item-head">
              <p className="news-item-type">{n.type}</p>
              <a href={n.uri} className="news-item-link">{n.title}</a>
            </div>

            <div className="news-item-body">
              <p className="news-item-editor">
                <p className="news-item_group">Editor:</p>
                <p className="news-item_element">{n.editor}</p>
              </p>
              <p className="news-item-score">
                <p className="news-item_group">Score:</p>
                <p className="news-item_element">{n.score}</p>
              </p>
              <p className="news-item-time">
                <p className="news-item_group">Time:</p>
                <p className="news-item_element">{n.time}</p>
              </p>

            </div>
          </li>
        ))}
      </ul>
    )
  }
}

class Hexen extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <NewsItem />
      </div>
    )
  }
}

const Header = () => {
  return (
    <div className="header">
      <h1 className="brand">Hexen</h1>
      <p className="claim">
        A super creepy
        {' '}
        <a href="https://news.ycombinator.com/" className="link_secondary">
          HackerNews
        </a>
        {' '}
        client
      </p>
      <Button />
    </div>
  )
}

ReactDOM.render(<Hexen />, document.getElementById('app'))
export default Hexen
