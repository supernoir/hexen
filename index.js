'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const topstories = [];
let accumulatedStories = {};
const accumulatedTitles = [];
const accumulatedEditors = [];
const accumulatedIDs = [];

class NewsItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      news: []
    };
  }

  componentWillMount() {
    axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        for (let i = 0; i < 9; i++) {
          const newsItem = res.data[i];
          topstories.push(newsItem);
        }
        for (const topstory of topstories) {
          axios
            .get(
              'https://hacker-news.firebaseio.com/v0/item/' + topstory + '.json'
            )
            .then(res => {
              let newsID = Math.ceil(Math.random(10));
              let newsTitle = res.data.title;
              let newsEditor = res.data.by;
              let newsScore = res.data.score;
              let newsURL = res.data.url;

              accumulatedTitles.push({ title: newsTitle });
              accumulatedEditors.push({ editor: newsEditor });
              accumulatedIDs.push({ id: newsID });

              this.setState({ news: accumulatedTitles });
            });
        }
        accumulatedStories = {
          titles: accumulatedTitles
        };
        console.log(accumulatedStories.titles);
        // let allTitles = accumulatedTitles.map(t => t.title)
        /*        accumulatedStories = [
          {
            title: accumulatedTitles[0],
            copy: 'Hello World'
          }
        ]*/

        //console.log(accumulatedTitles)
        //this.setState({ news: accumulatedStories })
        //console.log(titles)
      });
  }

  render() {
    return (
      <ul>
        {this.state.news.map(n => (
          <li>
            <div className="news-item-head">{n.title}</div>
            <div className="news-item-body">
              <p className="news-item-excerpt">{'lorem ipsum'}</p>
            </div>
            <div className="news-item-footer">
              <p className="news-item-editor">{'supernoir'}</p>
              <p className="news-item-time">{'26-06-2017'}</p>
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
