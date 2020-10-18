import React from 'react';
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
    <span className={'pos' + value}>
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
    case "SH": return "HP";
    case "ST": return "TP";
    case "SS": return "速度";
    case "SK": return "強打";
    case "SC": return "混乱";
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
    <span className="rating">
      {icons}
    </span>
  );
}

function Row(props) {
  return (
    <tr>
      <td>{props.value.name}</td>
      <td>{getPosition(props.value.position)}</td>
      <td>{props.value.order}</td>
      <td>{props.value.branch.map(getBranch).join('、')}</td>
      <td>{getRating(props.value.rate.quest)}</td>
      <td>{getRating(props.value.rate.boss)}</td>
      <td>{getRating(props.value.rate.arena)}</td>
    </tr>
  );
}

export function List(props) {
  return (
    <div id="list">
      <table>
        <thead>
          <tr>
            <th rowspan="2">名前</th>
            <th rowspan="2">位置</th>
            <th rowspan="2">順列</th>
            <th rowspan="2">役割</th>
            <th colspan="3">評価</th>
          </tr>
          <tr>
            <th>クエ</th>
            <th>ボス</th>
            <th>対戦</th>
          </tr>
        </thead>
        <tbody>
          {props.value.chars?.map(char => <Row value={char}/>)}
        </tbody>
      </table>
    </div>
  );
}
