import React from 'react';
import ReactDOM from 'react-dom';
// import Component from './DeviceList';
import Component from './ImgView'
import 'antd/dist/antd.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Component />
  </ConfigProvider>,
  document.getElementById('app')
);