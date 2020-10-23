import React from 'react';
import { handleClick } from '../jsx-helper.jsx';
import { CaretRight, Star } from './icons.jsx';
import { skillMap } from './skill';

function Position(props) {
  const icons = [];

  for (let i = 0; i < props.value; i++) {
    icons.push(<CaretRight/>);
  }

  return (
    <span className={'position no' + props.value}>
      {icons}
    </span>
  );
}

function Rating(props) {
  const icons = [];

  for (let i = 0; i < props.value; i++) {
    icons.push(<Star/>);
  }

  return (
    <span className={'rating no' + props.value}>
      {icons}
    </span>
  );
}

function SkillCaption(props) {
  return (
    <span>
      {skillMap[props.group].skills[props.skill]}<br/>
    </span>
  );
}

function SkillGroup(props) {
  return (
    <div>
      {props.skills?.map(skill => <SkillCaption group={props.name} skill={skill}/>)}
    </div>
  );
}

function Row(props) {
  return (
    <tr>
      <td className="name">{props.char.name}</td>
      <td><Position value={props.char.position}/></td>
      <td className="number">{props.char.order}</td>
      <td className="attack"><SkillGroup name="attack" skills={props.char.skill.attack}/></td>
      <td className="defense"><SkillGroup name="defense" skills={props.char.skill.defense}/></td>
      <td className="assist"><SkillGroup name="assist" skills={props.char.skill.assist}/></td>
      <td className="enhance"><SkillGroup name="enhance" skills={props.char.skill.enhance}/></td>
      <td className="weaken"><SkillGroup name="weaken" skills={props.char.skill.weaken}/></td>
      <td className="encumber"><SkillGroup name="encumber" skills={props.char.skill.encumber}/></td>
      <td><Rating value={props.char.rate.quest}/></td>
      <td><Rating value={props.char.rate.boss}/></td>
      <td><Rating value={props.char.rate.arena}/></td>
    </tr>
  );
}

export class List extends React.Component {

  handleClickName = (event) => handleClick(event, this.props, 'name');
  handleClickOrder = (event) => handleClick(event, this.props, 'order');
  handleClickQuest = (event) => handleClick(event, this.props, 'quest');
  handleClickBoss = (event) => handleClick(event, this.props, 'boss');
  handleClickArena = (event) => handleClick(event, this.props, 'arena');
  handleClickRate = (event) => handleClick(event, this.props, 'rate');

  render() {
    return (
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
}
