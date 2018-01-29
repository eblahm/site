
const React = require('react');
const _ = require('lodash');
const SpinnableBlock = require('./SpinnableBlock');

class Landing extends React.Component {

  render() {
    return (
      <div className="app-container">
        <section className="sidebar">
          <SpinnableBlock>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
            <div>Fourth</div>
            <div>Fifth</div>
            <div>Sixth</div>
          </SpinnableBlock>
        </section>
        <section className="content">
          :)
        </section>
      </div>
    )
  }
}

Landing.faces = [];

module.exports = Landing;
