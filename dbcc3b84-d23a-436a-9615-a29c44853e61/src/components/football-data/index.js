import React, { Component } from "react";
import "./index.css";
const classNames = require("classnames");

export default class FootballMatchesData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: null,
      total: undefined,
      matches: [],
    };
  }

  onClick = (year) => (e) => {
    // Code written in next line is to take care of adding active class to selected year for css purpose.
    this.setState({
      selectedYear: year,
    });
    fetch(
      `https://jsonmock.hackerrank.com/api/football_competitions?year=${year}`
  )
      .then((response) => response.json())
      .then((data) => {
          debugger;
        this.setState({ total: data.data.length, matches: data.data });
      });
  };
  render() {
    var years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];
    const { total, matches } = this.state;
    return (
      <div className="layout-row">
        <div className="section-title">Select Year</div>
        <ul className="sidebar" data-testid="year-list">
          {years.map((year, i) => {
            return (
              <li
                className={classNames({
                  "sidebar-item": true,
                  active: this.state.selectedYear === year,
                })}
                onClick={this.onClick(year)}
                key={year}
              >
                <a>{year}</a>
              </li>
            );
          })}
        </ul>
        <section className="content">
          {total === undefined ? null : total === 0 ? (
            <div data-testid="no-result" className="slide-up-fade-in no-result">
              No Matches Found
            </div>
          ) : (
            <section>
              <div className="total-matches" data-testid="total-matches">
                Total matches: {total}
              </div>

              <ul className="mr-20 matches styled" data-testid="match-list">
                {matches.map((m) => (
                  <li className="slide-up-fade-in" key={m.winner + m.runnerup}>
                    {" "}
                    Match {m.name} won by {m.winner}{" "}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </div>
    );
  }
}
