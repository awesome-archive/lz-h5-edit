import React from 'react';
import Carousel from 're-carousel';

// 引入样式文件
import './index.scss';
import { getComponentRenderMap } from '../../core/components';
import { winSize } from '../../utils';

let marginTop = 0;
function getTop() {
  const height = window.innerHeight;
  if (height > winSize.height) {
    marginTop = (height - winSize.height) / 2;
  }
}

class RealPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePageIndex: 0,
    };
    this.magicRefs = {};
    getTop();
  }

  onTransitionEnd = (e) => {
    const { current } = e;
    const index = current.firstElementChild.getAttribute('data-index');
    this.setState({ activePageIndex: +index });
  }

  renderComponent() {
    const { data } = this.props;
    const { activePageIndex } = this.state;
    return data.list.map((item, index) => {
      const style = {
        position: 'relative',
        height: winSize.height,
        display: 'none',
        marginTop,
        overflow: 'hidden',
      };
      if (activePageIndex === index) style.display = 'block';
      return (
        <div key={index} data-index={index} style={style}>
          {
              item.map((it, idx) => {
                const { type, ...others } = it;
                const Component = getComponentRenderMap(type);
                return <Component {...others} key={idx} />;
              })
            }
        </div>
      );
    });
  }

  render() {
    const { data } = this.props;
    if (!data) return null;
    const style = {
      backgroundImage: `url(${data.backGroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    return (
      <div className="content" style={style}>
        <Carousel onTransitionEnd={this.onTransitionEnd} axis="y">
          {
            this.renderComponent()
          }
        </Carousel>
      </div>
    );
  }
}

export default RealPreview;
