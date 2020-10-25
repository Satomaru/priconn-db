import { React, ReactDOM, Ajax, Component } from 'play-js-react';
import { List } from './component/list.jsx';
import { Search } from './component/search.jsx';
import { charComparators } from './char-comparators';
import './app.css';

class App extends Component {

  updateList = (chars) => {
    this.setStateOrAlert((state, props) => {
      const list = Object.assign({}, state.list);
      list.chars = chars;
      return { list: list };
    });
  }

  handleClickList = (column) => {
    this.setStateOrAlert((state, props) => {
      const list = Object.assign({}, state.list);
      const comparator = charComparators[column];

      if (comparator) {
        list.chars.sort(comparator);
      }

      return { list: list };
    });
  }

  handleChangeSearch = (name, value) => {
    switch (name) {
      case 'skillgroup':
        this.setStateOrAlert((state, props) => {
          const search = Object.assign({}, state.search);
          search.skillGroup = value;
          return { search: search };
        });

        break;
 
      case 'skill':
        this.setStateOrAlert((state, props) => {
          const search = Object.assign({}, state.search);

          if (!search.skills[value.group]) {
            search.skills[value.group] = {};
          }
  
          search.skills[value.group][value.skill] = value.checked;
          return { search: search };
        });

        break;
    }
  }

  handleSubmitSearch = (data) => {
    new Ajax('/char/search').setPost(data).fetch(this.updateList);
  }

  createView = () => (
    <div id="app">
      <h1>プリコネデータベース</h1>

      <Search
        value={this.state.search}
        onChange={this.handleChangeSearch}
        onSubmit={this.handleSubmitSearch}/>

      <List
        value={this.state.list}
        onClick={this.handleClickList}/>
    </div>
  );

  constructor(prop) {
    super(prop);

    this.state = {
      list: {
        chars: []
      },
      search: {
        skillGroup: '',
        skills: {}
      }
    }
  }

  componentDidMount() {
    new Ajax('/char').fetch(this.updateList);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
