import React from 'react';
import ReactDOM from 'react-dom';
import { JsxHelper } from './jsx-helper.jsx';
import { Ajax } from './ajax';
import { List } from './component/list.jsx';
import { Search } from './component/search.jsx';
import './app.css';

class App extends React.Component {

  setStateChars = (chars) => this.setState({ list: { chars: chars } });

  constructor(prop) {
    super(prop);

    this.state = {
      list: {
        chars: null
      },
      search: {
        onSubmit: (data) => new Ajax('/char/search').setPost(data).fetch(this.setStateChars)
      }
    };
  }

  render() {
    return (
      <div id="app">
        <h1>プリコネデータベース</h1>
        <Search value={this.state.search}/>
        <List value={this.state.list}/>
      </div>
    );
  }

  componentDidMount() {
    new Ajax('/char').fetch(this.setStateChars);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
