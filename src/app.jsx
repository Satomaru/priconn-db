import React from 'react';
import ReactDOM from 'react-dom';
import { appUtils } from './app-utils';
import { Ajax } from './ajax';
import { List } from './component/list.jsx';
import { Search } from './component/search.jsx';
import './app.css';

const compareCharByName = appUtils.comparator.create((char) => char.name);
const compareCharByOrder = appUtils.comparator.create((char) => char.order);
const compareCharByQuest = appUtils.comparator.create((char) => char.rate.quest, true);
const compareCharByBoss = appUtils.comparator.create((char) => char.rate.boss, true);
const compareCharByArena = appUtils.comparator.create((char) => char.rate.arena, true);

const charComparators = {
  name: compareCharByName,
  order: compareCharByOrder,
  quest: appUtils.comparator.bundle(compareCharByQuest, compareCharByName),
  boss: appUtils.comparator.bundle(compareCharByBoss, compareCharByName),
  arena: appUtils.comparator.bundle(compareCharByArena, compareCharByName)
};

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
      const comparator = charComparators[column];

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
