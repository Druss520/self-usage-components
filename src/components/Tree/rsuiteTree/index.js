import React, { Component } from 'react'
import './index.less'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { CheckTree } from 'rsuite'
import mockData from '../mock/cityData'

// 图片状态管理组件, 加载失败可以用默认图替换
class rsuiteTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'loading',
    }

  }

  static defaultProps = {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }


  render() {
    const { state } = this.state
    const props = this.props
    return (
      <CheckTree data={mockData} virtualized height={300} defaultExpandAll />
    )
  }
}

export default rsuiteTree