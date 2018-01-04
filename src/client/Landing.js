
const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cubeIndex: 0,
      cubeWidth: 500,
      spinning: false,
    };
  }


  componentDidMount() {
    setTimeout(() => {
      console.log('trying to set');
      this.setState({ spinning: true });
    }, 5000);

    document.addEventListener('mousemove', () => {
      if (this.state.spinning) {
        console.log(this.state.cubeIndex);
        this.setState({
          cubeIndex: this.state.cubeIndex + .01
        });
      }
    }, false);

    this.faces.forEach((el, i) => {
      el.addEventListener('mousedown', () => {
        this.setState({ spinning: true });
      }, false);

      el.addEventListener('mouseup', () => {
        this.setState({ spinning: false });
      }, false);
    });

    this.setState({
      cubeWidth: this.cubeEl.offsetWidth
    });
  }

  cubeFace(initialPosition, content) {
    const {cubeIndex, spinning} = this.state;
    let relativePosition = (Math.abs(initialPosition - 4 - cubeIndex)) % 4;
    // invert for sequence 0 1 2 3 0 to 0 3 2 1 0
    relativePosition = relativePosition && (4 - relativePosition);

    let rotation;
    if (relativePosition === 0) {
      rotation = 0;
    } else if (relativePosition <= 1) {
      rotation = relativePosition * -90;
    } else if (relativePosition <= 2) {
      rotation = -180;
    } else if (relativePosition <= 3) {
      rotation = relativePosition * 30;
    } else if (relativePosition <= 4) {
      rotation = (4 - relativePosition) * 90
    }

    const style = {
      transformOrigin: `50% 50% ${Math.ceil(this.state.cubeWidth / 2)}px`,
      transform: `rotateY(${rotation}deg)`
    };
    if (rotation === -180) {
      style.display = 'none';
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
