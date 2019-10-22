import React from 'react';

const Stat = (props) => {
  return (
    <div className="card" onClick = {props.onSelect}>
      {props.stat.name} - {props.stat.free_bikes} вел. доступно
    </div>
  )
}

export default Stat;