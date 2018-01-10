
const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeIndex: 4000,
      cubeWidth: 500,
      spinning: false,
    };
  }


  componentDidMount() {
    document.addEventListener('mousemove', event => {
      if (this.state.spinning) {
        this.setState({
          cubeIndex: this.state.cubeIndex + ((event.movementX / this.state.cubeWidth) * -1.5)
        });
      }
    }, false);

    document.addEventListener('mouseup', () => {
      if (this.state.spinning) {
        this.setState({ spinning: false });
      }
      if ((this.state.cubeIndex % 1)) {
        this.setState({ cubeIndex: Math.round(this.state.cubeIndex) });
      }
    }, false);

    this.faces.forEach(el => {
      el.addEventListener('mousedown', () => this.setState({ spinning: true }), false);
    });

    this.setState({
      cubeWidth: this.cubeEl.offsetWidth
    });
  }

  cubeFace(initialPosition, content) {
    const {cubeIndex, spinning} = this.state;
    let relativePosition = (Math.abs(initialPosition - 4 - cubeIndex)) % 4;
    relativePosition = relativePosition && (4 - relativePosition);

    let rotation;
    const style = {};

    if (relativePosition === 0) {
      rotation = 0;
    } else if (relativePosition <= 1) {
      rotation = relativePosition * -90;
      style.border = '1px solid black';
    } else if (relativePosition < 3) {
      rotation = -180;
      style.display = 'none';
    } else if (relativePosition <= 4) {
      rotation = (4 - relativePosition) * 90;
      style.border = '1px solid black';
    }

    style.transformOrigin = `50% 50% ${Math.ceil(this.state.cubeWidth / 2)}px`;
    style.transform = `rotateY(${rotation}deg)`;

    if (!spinning) {
      style.transition = 'all .5s ease-in';
    }

    return <div
      className={cx("face", { spinning })}
      ref={el => _.set(this, `faces[${initialPosition}]`, el)}
      style={style}
    >
      <button
        onClick={() => this.setState({ cubeIndex: cubeIndex + 1 })}
      >
        next
      </button>
      {content}
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
            {this.cubeFace(0, 'front')}
            {this.cubeFace(1, 'right')}
            {this.cubeFace(2, 'back')}
            {this.cubeFace(3, 'left')}
          </div>
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
