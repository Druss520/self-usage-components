import React, { Component } from 'react';
import UssGis, { intoAlarm, delIds, getLngLat }from 'uss-gis'
import BottomDiv from './test.js'
class BaseMaps extends Component {
  state = {
    visible: false,
    map: {},
    deviceLayer: {
      isShow: true,
    },
    height: 500,
    initMap: {
      // picName: '418b22300eba4bf696f3444acd9e931c',
      zoom: 13,
      center: [106.5330,29.5735],
      code: 'smart-box',
    },
    tool: {
      isShow: true,
      frame: ['clear', 'polygon', 'line', 'rectangle', 'circle', 'point'],
      measure: ['clear', 'line', 'polygon'],
      isFull: true,
      addPoint: true,
      control: true, // 缩放
    },
  }

  componentDidMount() {
    const _this = this
    window.onresize = function() {
      const height = document.body.clientHeight
      _this.setState({ height })
    }
  }

  getMapObject = (map) => {
    const data = {}
    intoAlarm(map, '10000000001311001385', data, 12)
    // this.setState({ map })
  }

  add = () => {
    const newPoint = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [106,30] // 坐标
      },
      properties: {
        name: '我是设备', // 设备名称
        id: '1' // 设备id
      }
    }
    // addFeatures(this.state.map, 'device', newPoint)
  }

  getCtrlFeatures = (a, b) => {
  //  delFeatures(this.state.map, 'device', a)
  }

  set = () => {
    // changeMouse(this.state.map, 'crosshair')
    // const properties = {
    //   name: '我是设备', // 设备名称
    //   id: '1' // 设备id
    // }
    // getLngLat(this.state.map, BottomDiv, 'point', properties)
    const initMap = {
      isEmpty: true,
      code: 'amap-online',
      zoom: 10,
      center: [106.5330,29.5735],
    }
    this.setState({ initMap })
    // console.log(delIds(this.state.map, 'device', ['10000000001311000061', '10000000001311000065']));
  }

  sets = () => {
    // changeMouse(this.state.map, 'crosshair')
    // const properties = {
    //   name: '我是设备', // 设备名称
    //   id: '1' // 设备id
    // }
    // getLngLat(this.state.map, BottomDiv, 'point', properties)
    const initMap = {
      isEmpty: true,
      code: 'amap-online',
      zoom: 10,
      center: [106.5330,29.5735],
    }
    this.setState({ initMap })
  }

  setss = () => {
    // changeMouse(this.state.map, 'crosshair')
    // const properties = {
    //   name: '我是设备', // 设备名称
    //   id: '1' // 设备id
    // }
    // getLngLat(this.state.map, BottomDiv, 'point', properties)
    const initMap = {
      code: 'smart-box',
      zoom: 10,
      center: [106.5330,29.5735],
    }
    this.setState({ initMap })
  }

  getMapEmpty = (a) => {
    console.log(a)
  }

  setsss = () => {
    // changeMouse(this.state.map, 'crosshair')
    // const properties = {
    //   name: '我是设备', // 设备名称
    //   id: '1' // 设备id
    // }
    // getLngLat(this.state.map, BottomDiv, 'point', properties)
    const initMap = {
      picName: 'cat',
      code: 'smart-box',
      zoom: 10,
      center: [106.5330,29.5735],
    }
    this.setState({ initMap })
  }

  render() {
    const { initMap, deviceLayer, height, tool } = this.state
    return (
      <div>
        <div onClick={this.set}>添加点位</div>
        <div onClick={this.sets}>添加点位</div>
        <div onClick={this.setss}>添加点位</div>
        <div onClick={this.setsss}>添加点位</div>
        <UssGis initMap={initMap} tool={ tool} getMapEmpty={this.getMapEmpty} getMapObject={this.getMapObject} deviceLayer={deviceLayer} height={height} getClear={this.getClear} getCtrlFeatures={this.getCtrlFeatures} />
      </div>
    );
  }
}

export default BaseMaps;
