import React from 'react';
import ReactDOM from 'react-dom';
import { JsxHelper } from './jsx-helper.jsx';
import { Ajax } from './ajax';
import './app.css';

class App extends React.Component {

  constructor(prop) {
    super(prop);

    JsxHelper.alertWhenError(() => {
      this.state = this.createState();
    });
  }

  createState() {
    return {
      list: []
    };
  }

  render() {
    return JsxHelper.alertWhenError(() => (
      <div id="app">
        <h1>プリコネ データベース</h1>
        <form id="searchForm" onSubmit={(event) => this.handleSubmitSearch(event)}>
          <input type="text" name="name"/>
          <input type="submit" value="検索"/>
        </form>
        <table>
          {this.state.list.map((char) => (
            <tr>
              <td>{char.name}</td>
              <td>{char.align}</td>
            </tr>
          ))}
        </table>
      </div>
    ));
  }

  componentDidMount() {
    new Ajax('/char')
      .fetch((json) => this.setState({ list: json }));
  }

  handleSubmitSearch(event) {
    event.preventDefault();

    new Ajax('/char/search')
      .setPost('searchForm')
      .fetch((json) => this.setState({ list: json }));
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
