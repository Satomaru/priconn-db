import React from 'react';
import { handleClick } from '../jsx-helper.jsx';
import { Position, Rating } from './icons.jsx';

function getPosition(value) {
  if (!value) {
    return;
  }

  const icons = [];

  for (let i = 3; i >= value; i--) {
    icons.push(<Position/>);
  }

  return (
    <span className={'position' + value}>
      {icons}
    </span>
  );
}

function getBranch(value) {
  switch (value) {
    case "AP": return "物単";
    case "AM": return "魔単";
    case "RP": return "物範";
    case "RM": return "魔範";
    case "PP": return "物全";
    case "PM": return "魔全";
    case "DP": return "物防";
    case "DM": return "魔防";
    case "SP": return "物補";
    case "SM": return "魔補";
    case "SH": return "HP回復";
    case "ST": return "TP上昇";
    case "SS": return "速度上昇";
    case "OC": return "混乱";
    case "OK": return "強打";
    case "OP": return "挑発"; 
    case "OS": return "気絶";
    case "OT": return "TP遅延";
    default: return value;
  }
}

function getRating(value) {
  if (!value) {
    return;
  }

  const icons = [];

  for (let i = 0; i < value; i++) {
    icons.push(<Rating/>);
  }

  return (
    <span className={'rating' + value}>
      {icons}
    </span>
  );
}

function Row(props) {
  return (
    <tr>
      <th>{props.value.name}</th>
      <td>{getPosition(props.value.position)}</td>
      <td className="number">{props.value.order}</td>
      <td>{props.value.branch.map(getBranch).join('、')}</td>
      <td>{getRating(props.value.rate.quest)}</td>
      <td>{getRating(props.value.rate.boss)}</td>
      <td>{getRating(props.value.rate.arena)}</td>
    </tr>
  );
}

export class List extends React.Component {

  handleClickName = (event) => {
    handleClick(event, this.props, 'name');
  }

  handleClickOrder = (event) => {
    handleClick(event, this.props, 'order');
  }

  render() {
    return (
      <div id="list">
        <table>
          <thead>
           <tr>
              <th rowspan="2" className="anchor" onClick={this.handleClickName}>名前</th>
              <th rowspan="2">配置</th>
              <th rowspan="2" className="anchor" onClick={this.handleClickOrder}>順列</th>
              <th rowspan="2">役割</th>
              <th colspan="3">評価</th>
            </tr>
            <tr>
              <th>クエスト</th>
              <th>ボス戦</th>
              <th>対戦</th>
            </tr>
          </thead>
          <tbody>
            {this.props.value.chars?.map(char => <Row value={char}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}
