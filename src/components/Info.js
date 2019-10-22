import React from 'react';

class Info extends React.Component {
  render () {
    return (
      <div className="Info">
        <h2>Велосипеды</h2>
        <p>Получить информацию о велосетях и пунктах выдачи!</p>
        <button id="btn" onClick={this.props.getNets}>Загрузить сети</button>
      </div>
    );    
  }
}

export default Info;