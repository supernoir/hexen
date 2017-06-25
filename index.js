'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Hexen extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    axios
      .get('https://hacker-news.firebaseio.com/v0/topstories.json')
      .then(res => {
        console.log(res);
      });
  }

  render() {
    return (
      <div>
        <h1>Hexen</h1>
      </div>
    );
  }
}

ReactDOM.render(<Hexen />, document.getElementById('app'));
export default Hexen;

