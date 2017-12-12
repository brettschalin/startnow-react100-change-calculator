import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountReceived: 0,
      amountDue: 0,
      changeDue: {
        twenties: 0,
        tens: 0,
        fives: 0,
        ones: 0,
        quarters: 0,
        dimes: 0,
        nickels: 0,
        pennies: 0,
      },
      success: true,
      status: "Waiting for input...",
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  onChange(ev) {
    const property = ev.target.name;
    this.setState({
      [property]: ev.target.value,
    });
  }

  onClick() {
    //console.log("Entering click handler");
    const due = this.state.amountDue;
    const given = this.state.amountReceived;

    var change = given - due;
    //console.log("change = "+change);
    if (change < 0) {
      this.setState({success: false});
      this.setState({status: "Oops! Not enough money paid."});
    }
    else {
      this.setState({changeDue: this.calculate(change), success: true});
      this.setState({status: `Total change due is $${change.toFixed(2)}`});
    }

  }

  calculate(change) {
    //convert dollars to cents
    change *= 100;

    var results = {}
    results.twenties = Math.floor(change/2000);
    change %= 2000;

    results.tens = Math.floor(change/1000);
    change %= 1000;

    results.fives = Math.floor(change/500);
    change %= 500;

    results.ones = Math.floor(change/100);
    change %= 100;

    results.quarters = Math.floor(change/25);
    change %= 25;

    results.dimes = Math.floor(change/10);
    change %= 10;

    results.nickels = Math.floor(change/5);
    change %= 5;

    results.pennies = Math.floor(change);
    
    //console.log(results);
    
    return results;
  }

  render() {
    return (
      <div>
        <h1>Change Calculator</h1>
        <div className="row">
          <div className="col-4">
            <div className="card">
              <h4 className="card-title">Enter Information</h4>
              <div className="card-body">
                <label htmlFor="amount-due">
                  <b>How much is due?</b>
                </label>
                <br></br>
                <input type="text" ref="amount-due" name="amountDue" value={this.state.amountDue} onChange={this.onChange}/>
                <label htmlFor="amount-received">
                  <b>How much was received?</b>
                </label>
                <br></br>
                <input type="text" ref="amount-received" name="amountReceived" value={this.state.amountReceived} onChange={this.onChange}/>
                <br></br>
                <button className="btn btn-primary" id="calculate-btn" onClick={this.onClick}>Calculate</button>
              </div>
            </div>
          </div>
          <div className="col-8">
            <div className="container">
              <div className="row">
                  <p ref="total-output" id="total-output" 
                  className={this.state.success?"success":"failure"}>{this.state.status}</p>
              </div>
              <div className="row">
                <div className="col-3">
                  <p>
                    <b>Twenties</b>
                  </p>
                  <p ref="twenties-output">{this.state.changeDue.twenties}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Tens</b>
                  </p>
                  <p ref="tens-output">{this.state.changeDue.tens}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Fives</b>
                  </p>
                  <p ref="fives-output">{this.state.changeDue.fives}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Ones</b>
                  </p>
                  <p ref="ones-output">{this.state.changeDue.ones}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Quarters</b>
                  </p>
                  <p ref="quarters-output">{this.state.changeDue.quarters}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Dimes</b>
                  </p>
                  <p ref="dimes-output">{this.state.changeDue.dimes}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Nickels</b>
                  </p>
                  <p ref="nickels-output">{this.state.changeDue.nickels}</p>
                </div>
                <div className="col-3">
                  <p>
                    <b>Pennies</b>
                  </p>
                  <p ref="pennies-output">{this.state.changeDue.pennies}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
