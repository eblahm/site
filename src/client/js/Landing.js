
const React = require('react');
const _ = require('lodash');
const SpinnableBlock = require('./SpinnableBlock');

class Landing extends React.Component {

  render() {
    return (
      <div className="app-container">
        <section className="sidebar">
          <SpinnableBlock>
            <div>Hello</div>
            <div>Goodbye</div>
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
