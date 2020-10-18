import React from 'react';
import ReactDOM from 'react-dom';
import { Ajax } from './ajax';
import { List } from './component/list.jsx';
import { Search } from './component/search.jsx';
import './app.css';

function compareCharsByName(char1, char2) {
  return (char1.name < char2.name) ? -1 : 1;
}

function compareCharsByOrder(char1, char2) {
  return char1.order - char2.order;
}

class App extends React.Component {

  updateList = (chars) => {
    this.setState((state, props) => {
      state.list.chars = chars;
      return state;
    });
  }

  handleSubmitSearch = (data) => {
    new Ajax('/char/search').setPost(data).fetch(this.updateList);
  }

  handleClickList = (column) => {
    this.setState((state, props) => {
      let comparator;

      switch (column) {
        case 'name': comparator = compareCharsByName; break;
        case 'order': comparator = compareCharsByOrder; break;
      }

      if (comparator) {
        state.list.chars.sort(comparator);
      }

      return state;
    });
  }

  constructor(prop) {
    super(prop);

    this.state = {
      list: {
        chars: null
      }
    };
  }

  render() {
    return (
      <div id="app">
        <h1>プリコネデータベース</h1>
        <Search onSubmit={this.handleSubmitSearch}/>
        <List value={this.state.list} onClick={this.handleClickList}/>
      </div>
    );
  }

  componentDidMount() {
    new Ajax('/char').fetch(this.updateList);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
