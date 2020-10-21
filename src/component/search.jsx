import React from 'react';
import { handleSubmit } from '../jsx-helper.jsx';
import skillList from './skill-list.json';

function SkillGroup(props) {
  const groupId = 'searchSkill' + props.value.value;
  const itemName = 'skill' + props.value.value;

  const checkboxes = props.value.items.map(item => {
    const id = groupId + item.value;

    return (
      <span>
        <input id={id} type="checkbox" name={itemName} value={item.value}/>
        <label for={id}>{item.caption}</label>
      </span>
    );
  });

  return (
    <dd>
      <input id={groupId} type="radio" name="skill" value={props.value.value}/>
      <label for={groupId}>{props.value.caption} →</label>
      {checkboxes}
    </dd>
  );
}

export class Search extends React.Component {

  handleSubmit = (event) => handleSubmit(event, this.props);

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
                <input id="searchSkillAll" type="radio" name="skill" value="" defaultChecked/>
                <label for="searchSkillAll">全て</label>
              </dd>
              {skillList.map((group) => <SkillGroup value={group}/>)}
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
