import { Component } from 'react'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionLength: 25,
      breakLength: 5,
      timertime: "25:00",
      startStopButtonDisplay: "Start"
    };
    this.resetSession = this.resetSession.bind(this);
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.timer = this.timer.bind(this);
  }

  increment({target}) {
    const currentIncrementButton = target;
    switch (currentIncrementButton.id) {
      case "break-increment":
        if (this.state.breakLength >= 60) {
          break;
        }
        this.setState((state) => ({
          breakLength: state.breakLength + 1
        }));
        break;
      case "session-increment":
        if (this.state.sessionLength >= 60) {
          break;
        }
        this.setState((state) =>({
          sessionLength: state.sessionLength + 1,
          timertime: `${state.sessionLength + 1}:00`
        }));
        break;
      default:
        break;
    }
  }

  decrement({target}) {
    const currentDecrementButton= target;
    switch (currentDecrementButton.id) {
      case "break-decrement":
        if (this.state.breakLength <= 1) {
          break;
        }
        this.setState((state) => ({
          breakLength: state.breakLength - 1
        }));
        break;
      case "session-decrement":
        if (this.state.sessionLength <= 1) {
          break;
        }
        this.setState((state) =>({
          sessionLength: state.sessionLength - 1,
          timertime: `${state.sessionLength - 1}:00`

        }));
        break;
      default:
        break;
    }
  }
  resetSession() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      sessionOn: false,
      timertime: `25:00`
    })
  }

  timer() {
    
    if (this.state.startStopButtonDisplay === "Start") {
      const values  = this.state.timertime.split(":");
      for (let i = 0; i < parseInt(values[0]); i++) {
        setTimeout(()=> {
          this.setState({
            timertime: parseInt(values[0]) - i
          })
        }, 1000)
    }
    this.setState((state) => ({
      sessionOn: true,
      startStopButtonDisplay: state.startStopButtonDisplay === "Start" ? "Stop" : "Start"
    }))
  }
}

  render() {
    return (
      <div id="App">
        <div id="break-label">
          <h2>Break Length</h2>
          <div>
            <button id="break-decrement" onClick={this.decrement}></button>
            <p id="break-length">{this.state.breakLength}</p>
            <button id="break-increment" onClick={this.increment}></button>
          </div>
        </div>
        <div id="session-label">
          <h2>Session Length</h2>
          <div>
            <button id="session-decrement" onClick={this.decrement}></button>
            <p id="session-length">{this.state.sessionLength}</p>
            <button id="session-increment" onClick={this.increment}></button>
          </div>
        </div>
        <div id="timer-label">
          <h2>Session</h2>
          <div id="time-left">
            {this.state.timertime}
          </div>
          <div>
          <button id="start_stop" onClick={this.timer}>{this.state.startStopButtonDisplay}</button>
          <button id="reset" onClick={this.resetSession}>Reset</button></div>
        </div>
      </div>
    )
  }
}

export default App
