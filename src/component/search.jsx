import { React, Component } from 'play-js-react';
import { skillList } from './skill';

const skillGroupOptions = [];
const skills = {};

skillList.forEach((group) => {
  skillGroupOptions.push(<option value={group.value}>{group.caption}</option>);
  skills[group.value] = group.items;
});

class SkillGroup extends Component {

  argsOnChange = (event) => [
    event.target.name,
    {
      group: this.props.name,
      skill: event.target.value,
      checked: event.target.checked
    }
  ];

  createView = () => (
    <span>
      {skills[this.props.name]?.map((item) =>
        <span>
          <input
            id={'skill' + item.value}
            type="checkbox"
            name="skill"
            value={item.value}
            checked={(this.props.checked && this.props.checked[item.value]) || false}
            onChange={this.handleChange}/>

          <label for={'skill' + item.value}>{item.caption}</label>
        </span>
      )}
    </span>
  );
}

export class Search extends Component {

  argsOnChange = (event) => [event.target.name, event.target.value];

  createView = () => (
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
                value={this.props.value.skillGroup}
                onChange={this.handleChange}>

                <option value="">全て</option>
                {skillGroupOptions}
              </select>

              <SkillGroup
                name={this.props.value.skillGroup}
                checked={this.props.value.skills[this.props.value.skillGroup]}
                onChange={this.props.onChange}/>
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
