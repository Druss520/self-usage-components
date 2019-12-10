/* eslint-disable */
import React, { Component } from "react";
import { Tree, Input, List, Icon, Popconfirm, Modal, Form, message, Spin } from "antd";
import styles from "./index.less";
import ScrollView from '../ScrollView'

const confirmModal = Modal.confirm;
const Search = Input.Search;
const voidFun = () => {}

@Form.create()
export default class TreeFlat extends Component {
  constructor(props) {
    super(props); this.props = props;
    this.state = {
      searchValue: "",
    }
  }

  static defaultProps = {
    onRefresh: voidFun,
    onSearch: voidFun,
  }

  maxSearchLength = 204

  componentDidMount() {
    // this.onLoadData()
    if (this.props.instanceRef) {
      this.props.instanceRef(this)
    }
    message.config({
      duration: 2,
      maxCount: 1
    })
  }

  componentWillUnmount() {
    // console.log('组件关闭')
  }

  refreshDeviceList() {
    this.props.onRefresh()
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState({
  //     searchValue: nextProps.propData.searchValue
  //   })
  // }

  clearInput = () => {
    this.closeSearch()
  }

  onSearch = (v, e) => {
    v = v.trim();
    if(/^\s*$/.test(v)) {
      this.refreshDeviceList()
      return
    }

    console.log('查询内容',v);
    if(!/^[A-Za-z0-9\u4e00-\u9fa5_\.]+$/.test(v)) {
      // return confirmModal({
      //   title: '提示',
      //   content: '查询关键字只支持中英文、数字、下划线和点。',
      // });
      message.warn('查询关键字只支持中英文、数字、下划线和点。')
      return
    }
    //   this.search(v);
    if (v.length > this.maxSearchLength) {
      console.log("长度超了")
      return
    } else {
      v = v.trim()
      this.search(v)
    }
  }

  //
  onChange = e => {
    const val = e.target.value;

    this.setState({
      searchValue: val,
    })
    return val
  }

  // 清除输入框
  closeSearch = e => {
    this.setState({
      searchValue: "",
    });
    this.props.form.setFieldsValue({
      ['resourceTree']: '',
    })
  }

  // 搜索
  search = value => {
    this.setState({
      searchValue: value,
    });
    if (value) {
      this.props.onSearch(value)
    } else {
      //搜索框输入为空时点击搜索，报错 “对象不支持‘getResourceTree’属性或方法”
      // this.getResourceTree();
      // this.props.refreshResourceTree();
      this.refreshDeviceList()
    }
  }



  //render.........
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props

    return (
      <div className="tree">
        <div className="search">
          <Form layout="inline">
            <Form.Item >
              {getFieldDecorator('resourceTree', {
                rules: [{ max: this.maxSearchLength, message: `最大长度限制${this.maxSearchLength}字符` }],
                getValueFromEvent: e => this.onChange(e),
              })(
                <Search
                    className="searchInput"
                    placeholder="请输入关键字"
                    onSearch={this.onSearch}
                    enterButton
                    // onChange={this.onChange}
                />,
              )}
            </Form.Item>
          </Form>
        </div>
        <ScrollView
          {...this.props}
        />
      </div>
    )
  }
}
