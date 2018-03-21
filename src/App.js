import React, { Component } from 'react';
import './App.css';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

class App extends Component {
  state = {
    percentage: 0,
    intervalId: null,
    doing: "Timer inactive!"
  }

  start = (e) => {
    let name = e.target.textContent;
    let doing = 0;
    if (name === "CODE") {
      doing = 15000;
      this.setState({ doing: "Coding time!"});
    } else {
      doing = 3000;
      this.setState({ doing: "Coffee time!"});
    }
    this.setState({ percentage: 0 });
    window.clearInterval(this.state.intervalId);
    let intervalId = setInterval(this.timer, doing);
    this.setState({ intervalId });
  }

  timer = () => {
    if (this.state.percentage === 100) {
      this.setState({ doing: "Complete!" });
      window.clearInterval();
    } else {
      this.setState({
        percentage: this.state.percentage + 1
      });
    }
  }

  stop = () => {
    window.clearInterval(this.state.intervalId);
    this.setState({ 
      doing: "Timer inactive!",
      percentage: 0
    });
  }

  render() {
    return (
      <div className="App">
        <CircularProgressbar 
          percentage={this.state.percentage}
          textForPercentage={(pct) => `${pct}%`} />
        <h1>{this.state.doing}</h1>
        <div className="circle" onClick={this.stop}><div className="square"></div></div>
        <button onClick={this.start}>CODE</button>
        <button onClick={this.start}>COFFEE</button>
        <footer>
          <p>&copy; 2018 by Nikola Bojanovic</p>
        </footer>
      </div>
    );
  }
}

export default App;
