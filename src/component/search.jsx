import React from 'react';
import { handleSubmit } from '../jsx-helper.jsx';

export class Search extends React.Component {

  handleSubmit = (event) => handleSubmit(event, this.props.value);

  render() {
    return (
      <div id="search">
        <form onSubmit={this.handleSubmit}>
          名前：<input type="text" name="name"/>
          <input type="submit" value="検索"/>
        </form>
      </div>
    );
  }
}
