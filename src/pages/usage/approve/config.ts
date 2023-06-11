// 主题
export const themeApprove = {
  rect: { // 矩形样式
    radius: 8,
    stroke: '#3CB371'
  },
  circle: {
    r: 25,
    stroke: '#FF6347'
  },
  polygon: {
    stroke: '#6495ED',
  },
  polyline: {
    strokeWidth: 1,
  },
  edgeText: {
    background: {
      fill: 'white',
    },
  },
}

export const data = {
  nodes: [
    // {
    //   id: "1",
    //   type: "img",
    //   x: 210,
    //   y: 210,
    //   text: { "x": 210, "y": 210, "value": "图片" },
    //   properties: {
    //     url: 'https://ae01.alicdn.com/kf/HTB1Cs4SbBGw3KVjSZFw762Q2FXa7.png',
    //     data:{
    //       // nodeId: 1, 
    //     }
    //   }
    // },
    {
      id: "2",
      type: "architecture",
      x: 410,
      y: 210,
      text: { "x": 410, "y": 210, "value": "地图" },
      properties: {
        url: 'https://ae01.alicdn.com/kf/HTB1Y0lObBWD3KVjSZKP761p7FXa9.png',
        name: '地图'
      }
    },
    {
      id: "3",
      type: "application",
      x: 350,
      y: 410,
      text: { "x": 350, "y": 410, "value": "手机应用" },
      properties: {
        url: 'http://cdn.u2.huluxia.com/g3/M00/36/56/wKgBOVwPmaqASqxPAACkcfU_hHQ796.jpg',
        name: '应用',
        width: 170,
        height: 60,
        borderWidth: 2, // 边框宽度
        fontSize: 12, // 文本大小
        backgroundColor: '#fff', // 背景色
        fontColor: '#f35', // 文本颜色
        borderColor: '#5f5', // 边框颜色
        borderStyle:'dashed',
      }
    },
    // {
    //   id: "4",
    //   type: "field",
    //   x: 550,
    //   y: 410,
    //   // text: { "x": 550, "y": 410, "value": "领域" },
    // },
    // {
    //   id: "5",
    //   type: "stratification",
    //   x: 650,
    //   y: 150,
    //   // text: { "x": 650, "y": 150, "value": "分层" },
    // },
  ],
  edges: [
  ]
}

