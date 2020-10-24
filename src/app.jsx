import { React, ReactDOM, Ajax, Component, jsxHelper } from 'play-js-react';
import { List } from './component/list.jsx';
import { Search } from './component/search.jsx';
import { charComparators } from './char-comparators';
import './app.css';

class App extends Component {

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

  createView = () => (
    <div id="app">
      <h1>プリコネデータベース</h1>
      <Search onSubmit={this.handleSubmitSearch}/>
      <List value={this.state.list} onClick={this.handleClickList}/>
    </div>
  );

  constructor(prop) {
    super(prop);

    this.state = {
      list: {
        chars: null
      }
    };
  }

  componentDidMount() {
    new Ajax('/char').fetch(this.updateList);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
