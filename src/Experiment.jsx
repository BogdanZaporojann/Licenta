import {Component} from "react";

export class Experiment extends Component {


    constructor(props) {
        super(props);
        this.state = {count: 0}
        // this.incrementCount = this.incrementCount.bind(this)
        this.handleSomething = this.handleSomething.bind(this)
    }

    incrementCount() {
        this.setState(state => ({
            count: state.count + 1
        }))
    }

    handleSomething() {
        this.incrementCount();
        this.incrementCount();
        this.incrementCount();
    }

    render() {
        return (
            <div>
                <button onClick={this.handleSomething}>increment</button>
                {this.state.count}
            </div>
        )
    }
}