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

const compareCharByRate = (char1, char2) => {
  const max1 = Math.max(char1.rate.quest, char1.rate.boss, char1.rate.arena);
  const max2 = Math.max(char2.rate.quest, char2.rate.boss, char2.rate.arena);
  const maxCompared = max2 - max1;

  if (maxCompared !== 0) {
    return maxCompared;
  }

  const total1 = char1.rate.quest + char1.rate.boss + char1.rate.arena;
  const total2 = char2.rate.quest + char2.rate.boss + char2.rate.arena;
  const totalCompared = total2 - total1;

  if (totalCompared !== 0) {
    return totalCompared;
  } 

  return compareCharByName(char1, char2);
}

const charComparators = {
  name: compareCharByName,
  order: compareCharByOrder,
  quest: appUtils.comparator.bundle(compareCharByQuest, compareCharByName),
  boss: appUtils.comparator.bundle(compareCharByBoss, compareCharByName),
  arena: appUtils.comparator.bundle(compareCharByArena, compareCharByName),
  rate: compareCharByRate
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
