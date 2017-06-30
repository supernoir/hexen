'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const topstories = [];
let accumulatedStories = {};
const accumulatedTitles = [];
const accumulatedEditors = [];
const accumulatedIDs = [];
const accumulatedScores = [];
const accumulatedURIs = [];

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentWillMount() {
    axios.get('http://localhost:5555/stories/top').then(res => {
      const allStories = res.data.stories.map(s => s[0]);
      //console.log(allStories);
      this.setState({ news: allStories });
    });
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
              <p className="news-item-excerpt">{n.uri}</p>
            </div>
            <div className="news-item-footer">
              <p className="news-item-editor">Editor: {n.editor}</p>
              <p className="news-item-time">Score: {n.score}</p>
              <p className="news-item-title">Time: {n.time}</p>

            </div>
          </li>
        ))}
      </ul>
    );
  }
}

class Hexen extends React.Component {
  render() {
    return (
      <div className="app-container">
        <Header />
        <NewsItem />
      </div>
    );
  }
}

const Header = () => {
  return (
    <div className="header">
      <h1 className="brand">Hexen</h1>
      <p className="claim">A super creepy HackerNews client</p>
    </div>
  );
};

ReactDOM.render(<Hexen />, document.getElementById('app'));
export default Hexen;
