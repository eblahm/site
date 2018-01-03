
const React = require('react');
const _ = require('lodash');

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeIndex: 0,
      cubeWidth: 500
    };
  }

  componentDidMount() {
    this.setState({
      cubeWidth: this.cubeEl.offsetWidth
    });
  }

  cubeFace(initialPosition, content) {
    const {cubeIndex} = this.state;
    const faces = ['front', 'left', 'back', 'right'];
    const face = faces[(initialPosition + cubeIndex) % 4];
    return <div
      className={`face ${face}`}
      style={{
        transformOrigin: `50% 50% ${Math.ceil(this.state.cubeWidth / 2)}px`
      }}
    >
      {content}
      <button
        onClick={() => this.setState({ cubeIndex: cubeIndex + 1 })}
      >
        next
      </button>
    </div>
  }

  render() {
    return (
      <div className="app-container">
        <section className="sidebar">
          <div
            ref={cubeEl => _.assign(this, { cubeEl })}
            style={{
              transformOrigin: `50% 50% ${this.state.cubeWidth}px`
            }}
            className="spinny"
          >
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
