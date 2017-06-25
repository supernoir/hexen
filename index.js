'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const topstories = [];
let accumulatedStories = [];

class Hexen extends React.Component {
  constructor() {
    super();
    this.state = {
      news: [],
    };
  }

  componentWillMount() {
    axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        for (let i = 0; i < 10; i++) {
          const newsItem = res.data[i];
          topstories.push(newsItem);
        }
        for (const topstory of topstories) {
          console.log(topstory);
          axios
            .get(
              'https://hacker-news.firebaseio.com/v0/item/' + topstory + '.json'
            )
            .then(res => {
              let newsTitle = res.data.title;
              accumulatedStories.push(newsTitle);
              //console.log(accumulatedStories);
            });
        }
      });

    this.setState({accumulatedStories});
    console.log(accumulatedStories);
  }

  render() {
    return (
      <div>
        <h1>Hexen</h1>
        {this.state.news.map(n => (
          <li>
            {n}
          </li>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<Hexen />, document.getElementById('app'));
export default Hexen;

