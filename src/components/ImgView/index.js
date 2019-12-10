import React, { Component } from 'react'
import './index.less'
import classNames from 'classnames'
import isHttp from '../../utils/ishttp'
import PropTypes from 'prop-types'

// 图片状态管理组件, 加载失败可以用默认图替换
class ImgView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      state: 'loading',
    }

    this.elemRef = React.createRef()
  }

  static defaultProps = {
    src: '',
    fail: '',
    className: 'complete',
  }

  isUnmount = false
  imgElem = new Image()

  componentDidMount() {
    this.imgElem.addEventListener('load', this.onImgLoad)
    this.imgElem.addEventListener('error', this.onImgError)
    this.setImgSrc(this.props)
  }

  componentWillUnmount() {
    this.isUnmount = true
    if (this.imgElem) {
      this.imgElem.removeEventListener('load', this.onImgLoad)
      this.imgElem.removeEventListener('error', this.onImgError)
    }
  }

  onImgLoad = () => {
    if (!this.isUnmount) {
      this.setState({
        state: 'complete',
      })
    }
  }

  onImgError = () => {
    if (!this.isUnmount) {
      this.setState({
        state: 'fail',
      })
    }
  }

  getSrc = (props, src) => {
    let url
    if (props.host) {
      url = src && isHttp(src) ? src : props.host + src
    } else {
      url = src
    }
    return url
  }

  setImgSrc = (props) => {
    const src = this.getSrc(props, props.src)
    if (src && this.imgElem) {
      this.imgElem.src = src
    } else {
      this.setState({
        state: 'fail',
      })
    }
  }

  render() {
    const { state } = this.state
    const props = this.props
    return (
      state === 'complete' ? (
        <div
        className={classNames({
          [this.props.className]: true
        })}
        style={{
          backgroundImage: `url(${this.getSrc(props, props.src)})`
        }}
        ref={this.elemRef}
        >
          {this.props.children}
        </div>
      ) : (
        state === 'loading' ? (
          <div
          className={classNames({
            [this.props.className]: true,
            'loading': true,
          })}
          >
          </div>
        ) : (
          <div
          className={classNames({
            [this.props.className]: true,
            'fail': true
          })}
          style={
            props.fail ? {
              backgroundImage: `url(${this.getSrc(props, props.fail)})`
            } : null
          }
          >
            {props.children}
          </div>
        )
      )
    )
  }
}

export default ImgView

ImgView.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  fail: PropTypes.string,
}