
const React = require('react');
const cx = require('classnames');

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: 0
    };
  }

  cubeFace(initialPosition, content) {
    const {i} = this.state;
    const faces = ['front', 'left', 'back', 'right'];
    const face = faces[(initialPosition + i) % 4];
    return <div
      className={`face ${face}`}
    >
      {content}
      <button
        onClick={() => this.setState({ i: i + 1 })}
      >
        next
      </button>
    </div>
  }

  render() {
    return (
      <div className="app-container">
        <section className="sidebar">
          <div className="spinny">
            {this.cubeFace(0, 'Front')}
            {this.cubeFace(3, 'Right')}
            {this.cubeFace(2, 'Back')}
            {this.cubeFace(1, 'Left')}
          </div>
        </section>
        <section className="content">
          :)
        </section>
      </div>
    )
  }
}

module.exports = Landing;
