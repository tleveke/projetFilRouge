const React = require ('react')
const ms = require(‘pretty-ms’)

class Timer extend React.Component {
    constructor(props) {
        super(props)
        this.state = {
            time: 0,
            start: 0,
            isOn: false
        }

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    }

    startTimer() {
        this.setState({
            time: ms(this.state.time),
            start: Date.now () - ms(this.state.time), isOn: true
        })
        this.timer = setInterval( () => this.setState({ 
            time: Date.now () - ms(this.state.time)
         }), 1)
        console.log('Start')
    }
    stopTimer() {
        this.setState ({ison: false})
        clearInterval(this.timer)
        console.log('Stop')
    }
    resetTimer() {
        this.setState ({time: 0})
        console.log('reset')
    }

    render() {
        let start = (ms(this.state.time) ==0) ?
        <button onClick={this.startTimer}>Start</button> : null

        let stop = (this.state.isOn) ?
        <button onClick={this.stopTimer}>Stop</button> : null

        let reset = (ms(this.state.time) != 0 && !this.state.isOn) ?
        <button onClick={this.resetTimer}>Reset</button> : null 

        let resume = (ms(this.state.time) != 0 && !this.state.isOn) ?
        <button onClick={this.startTimer}>Resume</button> : null

        return (
            <div>
                <h3> timer: {ms(this.state.time)}</h3>
                {start}
                {resume}
                {stop}
                {reset}
            </div>
        );
    }
}
module.exports = Timer