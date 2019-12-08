import React from 'react'
import './index.less'
import { Empty } from 'antd'
import empty from '../images/empty.png'

const voidFun = () => {}

class DeviceList extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      // itemList: [],
      active: '',
    }
  }

  static defaultProps = {
    dataSource: [],
    onScroll: voidFun,
    onPick: voidFun,
    onSingleClick: voidFun,
    renderItem: (item, index) => {}
  }

  componentDidMount() {
  }

  onScroll = (e) => {
    const listHeight = 31 * this.props.dataSource.length
    // console.log(listHeight, e.target.scrollTop + e.target.clientHeight)
    if (listHeight <= e.target.scrollTop + e.target.clientHeight + 3) {
      this.props.onScroll()
    }
  }

  onSelect = (item) => {
    this.setState({
      active: item.ga_code,
    })
    this.props.onPick(item)
  }

  onClick = () => {
    this.props.onSingleClick()
  }

  render() {
    const { dataSource, renderItem } = this.props

    return (
      <div
        className="list-view"
        onScroll={this.onScroll}
      >
        <div
          className="scroll-list"
        >
          {
            dataSource.length ? dataSource.map((item, i) => {
              return renderItem(item, i)
            }) : <div style={{ padding: '20px 5px' }}><Empty image={empty} /></div>
          }
        </div>
      </div>
    )
  }
}

export default DeviceList
