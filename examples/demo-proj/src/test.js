import React, { Component } from 'react';
import { Button } from 'antd'
// import './style/mapPop.less';

class BottomDiv extends Component {
  state = {
  }

  static defaultProps = {
    BottomDiv: null, // 自定义dom
    features: {}, // 弹框详情
  }

  componentDidMount() {

  }

  getInfo = () => {
    const a = this.props.getInfo
    console.log(a)
  }

  render() {
    return (
      <div>
        <div className="menu-btn" onClick={this.selectFeatures}><i className="iconfont icon-kuangxuan" style={{ marginRight: '5px' }} />添加点位</div>
      </div>
    );
  }
}

export default BottomDiv;
