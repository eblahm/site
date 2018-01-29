
const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const defaultProps = {
  mouseSpeedFactor: -1.5,
};

const BACKSIDE = -180;
const RIGHTSIDE = -90;
const LEFTSIDE = 90;
const FRONT = 0;

class SpinnableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.faces = [];
    this.state = {
      cubeIndex: 0,
      cubeWidth: 500,
      spinning: false,
    };
  }

  handleMouseMove(event) {
    if (this.state.spinning) {
      const nextCubeIndex = this.state.cubeIndex + ((event.movementX / this.state.cubeWidth) * this.props.mouseSpeedFactor);
      this.setState({
        cubeIndex: nextCubeIndex
      });
    }
  }

  handleMouseUp() {
    if (this.state.spinning) {
      this.setState({ spinning: false });
    }
    if ((this.state.cubeIndex % 1)) {
      this.setState({ cubeIndex: Math.round(this.state.cubeIndex) });
    }
  }

  handleMouseDown() {
    this.setState({ spinning: true });
  }

  componentDidMount() {
    document.addEventListener('mousemove', event => this.handleMouseMove(event), false);
    document.addEventListener('mouseup', event => this.handleMouseUp(event), false);

    this.faces
      .forEach(el => el.addEventListener('mousedown', event => this.handleMouseDown(event), false));

    this.setState({
      cubeWidth: this.cubeEl.offsetWidth
    });
  }

  getCubeFacePosition(initialPosition) {
    const facesLength = this.faces.length;
    const cubePosition = this.state.cubeIndex * -1;
    const offsetPosition = (initialPosition + modulo2(cubePosition, facesLength)) % facesLength;

    if (offsetPosition === 0) {
      return FRONT;
    }

    if (offsetPosition === 1) {
      return RIGHTSIDE;
    }

    if (offsetPosition === (facesLength - 1)) {
      return LEFTSIDE;
    }

    return BACKSIDE
  }

  cubeFace(initialPosition, content) {

    const {cubeIndex, spinning, cubeWidth} = this.state;
    const cubeRadius = Math.ceil(cubeWidth / 2);
    const style = {
      transformOrigin: `50% 50% ${cubeRadius}px`,
      border: '1px solid black'
    };

    let rotation = this.getCubeFacePosition(initialPosition);
    if (rotation === BACKSIDE) {
      style.display = 'none';
    }

    style.transform = `rotateY(${rotation}deg)`;
    style.transition = 'all .5s ease-in';

    // if (!spinning) {
    // }

    return <div
      className={cx("face", { spinning })}
      ref={el => _.set(this, `faces[${initialPosition}]`, el)}
      key={initialPosition}
      style={style}
    >
      <button
        onClick={() => this.setState({ cubeIndex: cubeIndex + 1 })}
      >
        next
      </button>
      <button
        onClick={() => this.setState({ cubeIndex: cubeIndex - 1 })}
      >
        prev
      </button>
      {content}
    </div>
  }

  render() {
    return (
      <div
        ref={cubeEl => _.assign(this, { cubeEl })}
        style={{
          transformOrigin: `50% 50% ${this.state.cubeWidth}px`
        }}
        className="spinny"
      >
        {this.props.children.map((child, idx) => this.cubeFace(idx, child))}
      </div>
    )
  }
}

SpinnableBlock.defaultProps = defaultProps;


const modulo2 = (a, b) => {
  if (a < 0) {
    return (b - Math.abs(a % b)) % b;
  }
  return a % b;
};

module.exports = SpinnableBlock;
