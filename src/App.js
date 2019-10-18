import React from "react";
import ReactDOM from "react-dom";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stop: "",
      route: "",
      loading: true,
      rows: [
        {
          duetime: "Due",
          route: "46A",
          destination: "Dun Laoghaire",
          sourcetimestamp: "18/10/2019 16:37:56"
        }
      ]
    };
    this.makeRequest = this.makeRequest.bind(this);
    this.processData = this.processData.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <form>
            <label>
              <span className="inputLabel">Stop number:</span>
              <input
                className="inputBox"
                type="text"
                onChange={evt => this.setState({ stop: evt.target.value })}
              />
            </label>
            <label>
              <span className="inputLabel">Route number:</span>
              <input
                className="inputBox"
                type="text"
                onChange={evt => this.setState({ route: evt.target.value })}
              />
            </label>
            <button
              type="button"
              onClick={this.makeRequest}
              className="submitButton"
            >
              Submit
            </button>
          </form>
        </header>
        <table border="1" width="100%" ID="Table2">
          <thead>
            <tr>
              <th>Due</th>
              <th>Route</th>
              <th>Destination</th>
              <th>Last updated</th>
            </tr>
          </thead>
          <tbody id="table-body"></tbody>
        </table>
      </div>
    );
  }

  makeRequest() {
    if (this.state.stop.trim().length == 0) {
      return;
    }
    this.setState({ loading: true });

    if (this.state.route.trim().length == 0) {
      fetch("http://www.localhost:9000/stopId/" + this.state.stop)
        .then(data => data.json())
        .then(data => this.processData(data));
    } else {
      fetch(
        "http://www.localhost:9000/stopId/" +
          this.state.stop +
          "/route/" +
          this.state.route
      )
        .then(data => data.json())
        .then(data => this.processData(data));
    }
  }

  processData(data) {
    this.setState({ rows: [], loading: false });
    for (const [i, result] of data.results.entries()) {
      this.state.rows.push(
        <tr key={i}>
          <td>{result.duetime}</td>
          <td>{result.route}</td>
          <td>{result.destination}</td>
          <td>{result.sourcetimestamp}</td>
        </tr>
      );
    }
    ReactDOM.render(this.state.rows, document.getElementById("table-body"));
  }
}

export default App;
