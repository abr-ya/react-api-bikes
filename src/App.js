import React from 'react';
import Info from './components/Info';
import Card from './components/Card';
import Stat from './components/Stat';
import './App.css';

class App extends React.Component {
  state = {
    nets: undefined,
    stats: undefined,
    statsF: [],
    statsFID: [],
    showCards: false,
    showStats: false,
    showStatsF: false,
    company: '',
    count: 0 
  }

  // получаем сети
  getNets = async (e) => {
    e.preventDefault();

    let request = `http://api.citybik.es/v2/networks?fields=id,company`;
    const api_url = await fetch(request);
    const nets = await api_url.json();
    this.setState({
      nets: nets.networks,     
      showCards: true
    });
    //console.log(this.state.nets);

    document.getElementById('btn').remove(); // удаляем кнопку
  }

  // выбрана сеть - загружаем станции
  selectCardHandler(index) {
    //console.log(this.state.nets[index].company[0]);
    this.getStats(this.state.nets[index].id);
    this.setState({
      company: this.state.nets[index].company[0]
    });
  }

  // получаем станции в выбранной сети
  async getStats(net) {
    let request = `http://api.citybik.es/v2/networks/${net}`;
    const api_url = await fetch(request);
    const stats = await api_url.json();
    const count = stats.network.stations.length;

    this.setState({
      stats: stats.network.stations,
      showStats: true,
      count
    });
    //console.log(this.state.stats);
  }

  // выбрана станция - добавляем в избранное
  selectStatHandler(index) {
    // проверяем, что ещё не в избранном
    if (this.state.statsFID.indexOf(this.state.stats[index].id) === -1) {
      // добавляем станцию в избранное
      const newStatF = this.state.stats[index];
      const statsF = [...this.state.statsF, newStatF];
      // добавляем ID станции в список
      const statsFID = [...this.state.statsFID, this.state.stats[index].id];
      // устанавливаем стейт
      this.setState({
        statsF,
        statsFID,
        showStatsF: true,
      });      
    } else {
      alert ('Данная станция уже есть в избранном!');
    }
  }

  // выбрана станция в избранном - удаляем
  selectStatHandlerF(index) {
    //console.log(index);
    const statsF = [...this.state.statsF];
    statsF.splice(index, 1);
    const statsFID = [...this.state.statsFID];
    statsFID.splice(statsFID.indexOf(this.state.statsF[index].id), 1);
    //console.log(statsFID);
    // избранное не пустое?
    const showStatsF = statsF.length ? true : false;
    this.setState({
      statsF,
      statsFID,
      showStatsF
    });    
  }

  render () {
    return (
      <div className="App">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="col-md-4 col-sm-12 cards">
                <Info getNets={this.getNets} />

                {this.state.showStatsF
                  ? "Избранные станции:"
                  : "Нет избранных станций."
                }

                {this.state.showStatsF
                  ? this.state.statsF.map((stat, key) => {
                    return (
                      <Stat
                        stat={stat}
                        key={key}
                        onSelect = {this.selectStatHandlerF.bind(this, key)}
                      />
                    )
                  })
                  : null
                }
              </div>
              <div className="col-md-4 col-sm-12 cards">

                {this.state.showCards
                  ? "Список доступных сетей:"
                  : "Для получения списка сетей нажмите кнопку Загрузить сети."
                }

                {this.state.showCards
                  ? this.state.nets.map((net, key) => {
                    return (
                      <Card
                        net={net}
                        key={key}
                        onSelect = {this.selectCardHandler.bind(this, key)}
                      />
                    )
                  })
                  : null
                }

              </div>
              <div className="col-md-4 col-sm-12 cards">

                {this.state.showStats
                  ? `Выбрана сеть ${this.state.company}
                     (всего станций - ${this.state.count}):`
                  : "Для получения списка станций необходимо выбрать сеть."
                }

                {this.state.showStats
                  ? this.state.stats.map((stat, key) => {
                    return (
                      <Stat
                        stat={stat}
                        key={key}
                        onSelect = {this.selectStatHandler.bind(this, key)}
                      />
                    )
                  })
                  : null
                }

              </div>
            </div>
          </div>          
        </div>
      </div>
    );    
  }
}

export default App;
