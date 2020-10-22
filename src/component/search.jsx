import React from 'react';
import { handleSubmit, handleChange } from '../jsx-helper.jsx';
import { skillList } from './skill';

const skillGroupOptions = [];
const skills = {};

skillList.forEach((group) => {
  skillGroupOptions.push(<option value={group.value}>{group.caption}</option>);
  skills[group.value] = group.items;
});

class SkillGroup extends React.Component {

  handleChange = (event) => {
    handleChange(event, this.props, this.props.name, event.target.value, event.target.checked);
  }

  render() {
    return (
      <span>
        {skills[this.props.name]?.map((item) =>
          <span>
            <input
              id={'skill' + item.value}
              type="checkbox"
              name="skill"
              value={item.value}
              checked={this.props.checked && this.props.checked[item.value]}
              onChange={this.handleChange}/>

            <label for={'skill' + item.value}>{item.caption}</label>
          </span>
        )}
      </span>
    );
  }
}

export class Search extends React.Component {

  handleSubmit = (event) => handleSubmit(event, this.props);

  handleChangeSkillGroup = (event) => {
    this.setState({ skillGroup: event.target.value });
  }

  handleChangeSkill = (group, skill, checked) => {
    this.setState((state, props) => {
      const skillChecked = Object.assign({}, state.skillChecked);

      if (!skillChecked[group]) {
        skillChecked[group] = {};
      }

      skillChecked[group][skill] = checked;
      return { skillChecked: skillChecked };
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      skillGroup: '',
      skillChecked: {},
      debug: null
    };
  }

  render() {
    return (
      <div id="search">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>検索</legend>
            <dl>
              <dt>名前</dt>
              <dd>
                <input type="text" name="name"/>
              </dd>

              <dt>配置</dt>
              <dd>
                <select name="position">
                  <option value="">（未選択）</option>
                  <option value="3">前衛</option>
                  <option value="2">中衛</option>
                  <option value="1">後衛</option>
                </select>
              </dd>

              <dt>技能</dt>
              <dd>
                <select
                  name="skillgroup"
                  value={this.state.skillGroup}
                  onChange={this.handleChangeSkillGroup}>

                  <option value="">全て</option>
                  {skillGroupOptions}
                </select>

                <SkillGroup
                  name={this.state.skillGroup}
                  checked={this.state.skillChecked[this.state.skillGroup]}
                  onChange={this.handleChangeSkill}/>

              </dd>
            </dl>
            <div className="buttons">
              <input type="submit" value="検索"/>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}
