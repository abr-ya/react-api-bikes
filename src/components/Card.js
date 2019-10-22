import React from 'react';

const Card = (props) => {
  return (
    <div className="card" onClick = {props.onSelect}>
      {props.net.id} - {props.net.company}
    </div>
  )
}

export default Card;