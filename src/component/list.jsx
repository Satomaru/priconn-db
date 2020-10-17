import React from 'react';

function Row(props) {
  return (
    <tr>
      <td>{props.value.name}</td>
      <td>{props.value.position}</td>
      <td>{props.value.order}</td>
      <td>{props.value.branch}</td>
      <td>{props.value.class?.quest}</td>
      <td>{props.value.class?.boss}</td>
      <td>{props.value.class?.arena}</td>
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
            <th rowspan="2">順番</th>
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
