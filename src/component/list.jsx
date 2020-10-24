import { React, Component, jsxHelper } from 'play-js-react';
import { CaretRight, Star } from './icons.jsx';
import { skillMap } from './skill';

class Position extends Component {

  createView = () => (
    <span className={'position no' + this.props.value}>
      {new Array(this.props.value).fill(<CaretRight/>)}
    </span>
  );
}

class Rating extends Component {

  createView = () => (
    <span className={'rating no' + this.props.value}>
      {new Array(this.props.value).fill(<Star/>)}
    </span>
  );
}

class SkillCaption extends Component {

  createView = () => (
    <span>
      {skillMap[this.props.group].skills[this.props.skill]}<br/>
    </span>
  );
}

class SkillGroup extends Component {

  createView = () => (
    <div>
      {this.props.skills?.map((skill) =>
        <SkillCaption group={this.props.name} skill={skill}/>
      )}
    </div>
  );
}

class Row extends Component {

  createView = () => (
    <tr>
      <td className="name">{this.props.char.name}</td>
      <td><Position value={this.props.char.position}/></td>
      <td className="number">{this.props.char.order}</td>
      <td className="attack"><SkillGroup name="attack" skills={this.props.char.skill.attack}/></td>
      <td className="defense"><SkillGroup name="defense" skills={this.props.char.skill.defense}/></td>
      <td className="assist"><SkillGroup name="assist" skills={this.props.char.skill.assist}/></td>
      <td className="enhance"><SkillGroup name="enhance" skills={this.props.char.skill.enhance}/></td>
      <td className="weaken"><SkillGroup name="weaken" skills={this.props.char.skill.weaken}/></td>
      <td className="encumber"><SkillGroup name="encumber" skills={this.props.char.skill.encumber}/></td>
      <td><Rating value={this.props.char.rate.quest}/></td>
      <td><Rating value={this.props.char.rate.boss}/></td>
      <td><Rating value={this.props.char.rate.arena}/></td>
    </tr>
  );
}

export class List extends Component {

  handleClickName = (event) => jsxHelper.handleClick(event, this.props, 'name');
  handleClickOrder = (event) => jsxHelper.handleClick(event, this.props, 'order');
  handleClickQuest = (event) => jsxHelper.handleClick(event, this.props, 'quest');
  handleClickBoss = (event) => jsxHelper.handleClick(event, this.props, 'boss');
  handleClickArena = (event) => jsxHelper.handleClick(event, this.props, 'arena');
  handleClickRate = (event) => jsxHelper.handleClick(event, this.props, 'rate');

  createView = () => (
    <div id="list">
      <table>
        <thead>
         <tr>
            <th rowspan="2" className="anchor" onClick={this.handleClickName}>名前</th>
            <th rowspan="2">配置</th>
            <th rowspan="2" className="anchor" onClick={this.handleClickOrder}>順列</th>
            <th colspan="6">技能</th>
            <th colspan="3" className="anchor" onClick={this.handleClickRate}>評価</th>
          </tr>
          <tr>
            <th className="attack">{skillMap.attack.caption}</th>
            <th className="defense">{skillMap.defense.caption}</th>
            <th className="assist">{skillMap.assist.caption}</th>
            <th className="enhance">{skillMap.enhance.caption}</th>
            <th className="weaken">{skillMap.weaken.caption}</th>
            <th className="encumber">{skillMap.encumber.caption}</th>
            <th className="anchor" onClick={this.handleClickQuest}>クエスト</th>
            <th className="anchor" onClick={this.handleClickBoss}>ボス戦</th>
            <th className="anchor" onClick={this.handleClickArena}>アリーナ</th>
          </tr>
        </thead>
        <tbody>
          {this.props.value.chars?.map((char) => <Row char={char}/>)}
        </tbody>
      </table>
    </div>
  );
}
