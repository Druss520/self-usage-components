import React from 'react';
import ReactDOM from 'react-dom';
import { ListView, ImgView } from './components'
import 'antd/dist/antd.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd'

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <ListView />
  </ConfigProvider>,
  document.getElementById('app')
);