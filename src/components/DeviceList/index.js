import React from 'react'
import './index.less'
import { Tabs } from 'antd'
import ListView from './ListView'
import PropTypes from 'prop-types'

const TabPane = Tabs.TabPane
const voidFun = () => {}

class DeviceList extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      // visibleEdit: false,
      // mapData: {},
    }
    this.childRef
  }
  static defaultProps = {
    title: '列表',
    onRefresh: voidFun,
    showTitle: false,
  }

  componentDidMount() {
  }

  clearInput = () => {
    this.childRef.clearInput()
  }

  refreshChannelList() {
    this.props.onRefresh()
  }

  render() {
    return (
      <div
        className="videoLeft"
      >
        {
          this.props.showTitle ? (
            <div className="treeTop">
              {this.props.title}
              <i
                className="reload"
                title="刷新"
                size="small"
                onClick={() => {
                  this.clearInput()
                  this.refreshChannelList()
                }}
              />
            </div>
          ) : null
        }
        <ListView
          instanceRef={(ref) => { this.childRef = ref }}
          {...this.props}
        />
      </div>
    )
  }
}

export default DeviceList

DeviceList.propTypes = {
  title: PropTypes.string,
  onRefresh: PropTypes.func,
  showTitle: PropTypes.bool,
  onRefresh: PropTypes.func,
  onSearch: PropTypes.func,
  dataSource: PropTypes.array,
  onScroll: PropTypes.func,
  onPick: PropTypes.func,
  onSingleClick: PropTypes.func,
  renderItem: PropTypes.func,
}