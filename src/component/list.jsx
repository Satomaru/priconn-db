import React from 'react';
import { handleClick } from '../jsx-helper.jsx';
import { CaretRight, Star } from './icons.jsx';
import skillList from './skill-list.json';

function getSkillGroup(value) {
  return skillList.find((group) => group.value === value);
}

function getSkill(group, value) {
  return getSkillGroup(group).items.find((item) => item.value === value);
}

function Position(props) {
  const icons = [];

  for (let i = 0; i < props.value; i++) {
    icons.push(<CaretRight/>);
  }

  return (
    <span className={'position' + props.value}>
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
    <span className={'rating' + props.value}>
      {icons}
    </span>
  );
}

function Skill(props) {
  const skill = getSkill(props.group, props.value);
  return <span>{skill?.caption}&nbsp;</span>;
}

function SkillGroup(props) {
  return (
    <span>
      {props.value?.map(value => <Skill group={props.name} value={value}/>)}
    </span>
  );
}

function Row(props) {
  return (
    <tr>
      <td>{props.data.name}</td>
      <td><Position value={props.data.position}/></td>
      <td className="number">{props.data.order}</td>
      <td className="attack"><SkillGroup name="attack" value={props.data.skill.attack}/></td>
      <td className="defense"><SkillGroup name="defense" value={props.data.skill.defense}/></td>
      <td className="assist"><SkillGroup name="assist" value={props.data.skill.assist}/></td>
      <td className="enhance"><SkillGroup name="enhance" value={props.data.skill.enhance}/></td>
      <td className="weaken"><SkillGroup name="weaken" value={props.data.skill.weaken}/></td>
      <td className="encumber"><SkillGroup name="encumber" value={props.data.skill.encumber}/></td>
      <td><Rating value={props.data.rate.quest}/></td>
      <td><Rating value={props.data.rate.boss}/></td>
      <td><Rating value={props.data.rate.arena}/></td>
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
              <th className="attack">{getSkillGroup('attack').caption}</th>
              <th className="defense">{getSkillGroup('defense').caption}</th>
              <th className="assist">{getSkillGroup('assist').caption}</th>
              <th className="enhance">{getSkillGroup('enhance').caption}</th>
              <th className="weaken">{getSkillGroup('weaken').caption}</th>
              <th className="encumber">{getSkillGroup('encumber').caption}</th>
              <th className="anchor" onClick={this.handleClickQuest}>クエスト</th>
              <th className="anchor" onClick={this.handleClickBoss}>ボス戦</th>
              <th className="anchor" onClick={this.handleClickArena}>アリーナ</th>
            </tr>
          </thead>
          <tbody>
            {this.props.value.chars?.map((char) => <Row data={char}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}
