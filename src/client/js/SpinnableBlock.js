
const React = require('react');
const _ = require('lodash');
const cx = require('classnames');

const defaultProps = {
  mouseSpeedFactor: -1.5,
};

class SpinnableBlock extends React.Component {
  constructor(props) {
    super(props);
    this.faces = [];
    this.state = {
      cubeIndex: 4000,
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
      key={initialPosition}
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

module.exports = SpinnableBlock;
