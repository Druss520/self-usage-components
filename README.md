# uss-gis
### start

```
npm i uss-gis
```
- 下载源文件
    - http://192.168.120.61:16550/libs/ugis/ugis.js
    - http://192.168.120.61:16550/libs/ugis/ugis.css
- 全局引入
```
  <script src="/ugis.js"></script>
  <link rel="styleSheet" href="/index.css" type="text/css">
```
- 用法

``` js
// index.js
import UssGis from 'uss-gis'

<UssGis />
```
- 设置代理

```
'/ugis': 'http://192.168.120.61:16550',
'/api/ugis': target: 'http://192.168.120.61:16550',
```


### api
##### ugis底层原生方法
http://192.168.120.61:16550/documents/index.html

##### 目前支持的图层信息

*  通道信息
*  图层名称 device


``` js
// 通道信息数据结构
{
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [10, 0] // 坐标
    },
    properties: {
      name: '我是通道', // 通道名称
      id: '1', // 通道id
      resource_type: '6', // 通道type
      model: '1', // 编码器type
      sub_type: '1', // 报警，门禁，卡口type。 model和sub_type 不能同时为空
    }
}

```
*  标记点
*  图层名称 point
*  只需在工具tool里面设置addPoint为true，不支持外部弹框展示




---
##### export 方法

属性  | 说明 | 类型| 事例
---|---|---|---|---
*addFeatures(map, layerName, newPoint)* | 添加指定图层的某个点位，三个参数必传（map对象，layerName指定图层的id，newPoint标记点，数据结构参考设备信息数据结构）必须是页面存在的图层|function|
*delFeatures(map, layerName, delPoint)* | 删除指定图层的某些点位，三个参数必传（map对象，layerName指定图层的id，delPoint删除的点位信息，数组) | function | 
*delIds(map, layerName, ids)* | 删除指定图层的某些点位，三个参数必传（map对象，layerName指定图层的id，delPoint删除的点的id,类型和点类型相同),返回一个布尔，true为地图上有点并删除，false是地图无此点 | function |``` delIds(this.state.map, 'device', ['10000000001311000061', '10000000001311000065'])``` 
*changeFeatures(map, layerName, changePointID, data, img)* | 更改指定图层的某个点位的某个图标， 前三个参数必传，changePointID必须和当前图层所传的id对应。img默认报警图标'alarm'，可不传，如需自定义更改图标，调用setImg方法为地图注册对应图标名 | function |```   data: {reportTime: '2019-10-28', deviceName: '我是报警', alarmType: '我是报警类型'} ```
*changeMouse(map, val)* | 更改鼠标样式,val的值可传default,crosshair,pointer,move,wait,text,help | function | ``` changeMouse(map, 'crosshair') ```
*setImg(map, element)* | 为地图注册图标 | function | ``` element: {typeImage: 'alarm', src: objIcon.alarm, width: 30, height: 30 } ```
*setDevice(properties)* | 通道的对应关系，传参properties对应通道的类型，resource_type不可为空，model和sub_type不可同时为空。为通道的properties增加对应图标和通道名称。返回两个字段typeName，typeImage，用于添加到通道properties。用于地图新增设备点位
*intoAlarm(map, id, data, zoom, isMessage)* | 定制：报警，点击对应到报警设备，改变图标并弹出报警信息 zoom可不传，默认14, 是否需要弹窗提示，默认true。返回一个布尔，传在该点true，不存在返回false | function |```   data: {reportTime: '2019-10-28', deviceName: '我是报警', alarmType: '我是报警类型'} ``` 

##### function

属性  | 说明 | 类型| 默认值
---|---|---|---|---
*getMapObject(map)* | 获取map对象,可用于判断设备图层加载完成 | get Function|
*getMapEmpty(map)* | 判断空图层加载完成 | get Function|
*getMapPicState(map)* | 判断场景地图加载完成 | get Function|
*getCtrlFeatures(selectFeatures, drawFeature)* | 获取框选的数据,获取的点信息需通过layerids传参对应图层|get Function|
*getClear()* | 工具清除回调，无返回 | get Function|
*getClearTool(edit)* | 获取框选事件,用于外部删除框选，删除框选拿到框选edit实例调用deleteAll()方法 | get Function|

##### 控制参数

属性  | 说明 | 类型| 默认值
---|---|---|---|---
*initMap{}* | 初始化地图参数，可通过getMapState获取 |Object|
*deviceLayer{}* | 设备图层自定义|Object|
*tool{}* | 工具栏，目前支撑框选，测量，全屏。其他的没做哈，是根据需求增加的快捷选择，当然你也可以自己全部用gis的工具，详细见gis的开发文档|Object|
*layerids* | 框选需要的图层id|Array|['device']
*layer[]* | 自定义图层信息(详见layer)|Array|
*height* | 地图高度，默认500，也可支持百分比，支持动态更改|Int|500

---
##### initMap{}
``` js
    initMap: {
        picName: 'cat',
        zoom: 13,
        center: [106.5330,29.5735],
        code: 'smart-box',
        isEmpty: false,
    },
```
属性  | 说明 | 类型| 默认值
---|---|---|---|---
*picName* | 图片地址的图层id,传了这个值默认为场景地图，zoom和center无效，不需要场景地图该值不传 | Int| ''
*zoom* | 地图层级 | Int| 13
*center* | 中心点|Array| [106.5330,29.5735]
*code* | 样式code，底图类型|String| smart-box
*isEmpty* | 是否为空， 为空其他字段无效|Boolean| false

---
##### deviceLayer{}
``` js
   deviceLayer: {
      isShow: true,
      popDOM: '', // 自定义部分弹窗内容
      popTitle: '设备信息',
    }
```
属性  | 说明 | 类型| 默认值
---|---|---|---|---
*isShow* | 是否展示设备图层 | Boolean| false
*popDOM* | 弹框自定义区域|ReactDOM|
*popTitle* | 弹框标题|String|设备信息
---
##### tool{}

``` js
    tool: {
      isShow: true,
      miniMap: false,
      frame: ['clear', 'polygon', 'line', 'rectangle', 'circle', 'point'],
      measure: ['clear', 'line', 'polygon'],
      isFull: true,
      control: false,
      addPoint: false,
    },
```

属性  | 说明 | 类型| 默认值
---|---|---|---|---
*isShow* | 是否展示工具栏 | Boolean| false
*isFull* | 是否全屏 | Boolean| false
*miniMap* | 是否展示小地图 | Boolean| false
*frame* | 框选支持的类型,根据英文开来理解，不多说了|Array|['clear', 'polygon', 'line', 'rectangle', 'circle', 'point']
*measure* | 测量支持的类型，一样的不说了|Array|['clear', 'line', 'polygon']
*control* | 导航缩放功能|Boolean| false
*addPoint* | 添加标记点|Boolean| false
---
##### layer[]
``` js
    layer: [{
      idName: 'point',
      icon: './img/car.png',
      layerObj: {
        popDOM: '',
        popTitle: '标点信息',
      },
      width: 40,
      height: 50,
      features: [
        {
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [0, 10]
          },
          properties: {
              name: '我是一只猫',
              rotate: 20,
              user: {
                  name: 123
              },
              id: 1
          }
      },
      ]
    }],
```
属性  | 说明 | 类型| 默认值
---|---|---|---|---
*idName* | 图层名称(唯一标识，不可重复) | String|
*icon* | 图标|String|
*layerObj{}* | 弹框信息|Object|
*features[]* | 点位信息(详见features)|Array|
---
##### layerObj{}
属性  | 说明 | 类型| 默认值
---|---|---|---|---
*popAllDOM* | 完全自定义dom，传了下面两个参数无意义了，里面内容自己编写 | ReactDOM|
*popDOM* | 半自定义，只更改弹窗详细内容|ReactDOM|
*popTitle* | 弹框标题|String|
---
##### features[]
属性  | 说明 | 类型| 默认值
---|---|---|---|---
*type* | type类型不可变 | String|Feature
*geometry* | 点位|Object|
---|-坐标|*coordinates: [0, 0]*
---|-类型|*type:'Point'*|point
*properties* |特征 |Object|
---|-name|*name: ''*
---|-id|*id: 1*


