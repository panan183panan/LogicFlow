import React, { useEffect, useMemo, useState } from 'react';
import { message } from 'antd';
import LogicFlow from '@logicflow/core';
import {
  Group,
  Snapshot,
  Control,
  Menu,
  SelectionSelect,
  DndPanel,
  MiniMap,
} from '@logicflow/extension';
import '@logicflow/extension/lib/style/index.css';
import '@logicflow/core/dist/style/index.css';
import PropertyPanel from './components/Property/property';
import Sidebar from './components/SidebarNode/Sidebar';
import { themeApprove, data } from './config';
import './index.css';
import SearchBar from './components/Search/Search';
import TopMenu from './components/TopMenu'
import { registerCustomElement } from './node/index'

interface MenuItem {
  text: string;
  callback: (node: any) => void;
}

const config = {
  // 是否静默模式
  isSilentMode: true,
  // 禁止鼠标滚动移动画布
  stopScrollGraph: true,
  // 开启选区
  // stopZoomGraph: true,
  grid: {
    size: 10,
    visible: true,
    type: 'mesh',
    config: {
      color: '#DCDCDC', // 设置网格的颜色
    },
  },
  keyboard: { enabled: true },
  // style: themeApprove,//自定义分类组件的样式
  plugins: [Control, Snapshot, SelectionSelect, Menu, DndPanel, Group, MiniMap],
};

export default function ApproveExample() {
  const [lf, setLf] = useState({} as LogicFlow);
  const [searchItem, setSearchItem] = useState<string[]>([]);
  const [nodeData, setNodeData] = useState();
  const [conf, setConf] = useState(config);
  const [num, setNum] = useState<number>(0);

  useEffect(() => {
    const lf = new LogicFlow({
      ...conf,
      overlapMode: 1, //堆叠模式设置为递增
      container: document.querySelector('#graph') as HTMLElement,
    });
    setLf(lf);
    registerCustomElement(lf)
    initEvent(lf);
    monitor(lf);

    lf.render(data);
  }, [conf]);

  const checkNodeData = (node: any) => {
    // console.log(node.nodes)
    return node.nodes.every((obj: any) => {
      if (obj.type === 'stratification' && obj.children) {
        return obj.children.every((childId: any) => {
          const childObj = node.nodes.find((item: any) => item.id === childId);
          return childObj.type === 'field' || childObj.type === 'architecture';
        });
      } else if (obj.type === 'field' && obj.children) {
        return obj.children.every((childId: any) => {
          const childObj = node.nodes.find((item: any) => item.id === childId);
          return (
            childObj.type !== 'stratification'
          );
        });
      }
      return true;
    });
  };

  const monitor = (lf: LogicFlow) => {
    lf.on('blank:mouseup', () => {
      hidePropertyPanel();
    });
  };

  const onSearch = (keyword: string) => {
    // 调用接口，获取到搜索结果id
    let idList = ['3'];
    if (keyword === '') {
      setSearchItem([]);
      lf.clearSelectElements();
      lf.render(data)
    } else {
      setSearchItem(idList);
      idList.map((item) => {
        lf.setProperties(item, {
          borderColor: 'blue',
        });
      });
      transform(0);
    }
  };

  const preHandle = () => {
    let value;
    if (num == 0) {
      value = searchItem.length - 1;
      setNum(searchItem.length - 1);
    } else {
      value = num - 1;
      setNum(num - 1);
    }
    transform(value);
  };

  const nextHandle = () => {
    let value;
    if (num == searchItem.length - 1) {
      setNum(0);
      value = 0;
    } else {
      setNum(num + 1);
      value = num + 1;
    }
    transform(value);
  };

  const transform = (id: number) => {
    lf.selectElementById(searchItem[id]);
    // lf.overlapMode()
    let data = lf.getNodeDataById(searchItem[id]);
    // 定位画布视图位置
    if (data) {
      lf.focusOn({
        coordinate: {
          x: data.x,
          y: data.y,
        },
      });
    }
  };

  //LogicFlow事件监听
  const initEvent = (lf: LogicFlow) => {
    lf.on('element:click', ({ data }) => {
      setNodeData(data);
      // console.log(JSON.stringify(lf.getGraphData()));
    });
    lf.on('connection:not-allowed', (data: any) => {
      message.error(data.msg);
    });
    lf.on('node:contextmenu', (data: any) => {
      // 右键
    });
    // 节点从外部被拖入后的函数监听
    lf.on('node:dnd-add', ({ data }) => {
      const node = lf.graphModel.nodesMap[data.id];
      const edge = lf.graphModel.edgesMap[data.id];
      if (node) {
        node.model.setProperties(Object.assign(node.model.properties, {
          borderWidth: 2, // 边框宽度
          fontSize: 12, // 文本大小
          backgroundColor: '#fff', // 背景色
          color: '#f95', // 文本颜色
          borderColor: '#000', // 边框颜色
          width: 120,
          height: 60,
          borderStyle: data.type == 'stratification' ? 'dashed' : 'solid',
          radius: 0,
          url: '',
        }));
      } else if (edge) {
        // edge.model.setProperties(Object.assign(edge.model.properties, data));
      }
    });
    // 节点被拖拽后的函数监听
    lf.on('node:mouseup', ({ data, e }) => {
      // console.log(data.type,data.id,"节点发生了移动")
      // console.log(data,e)
      setTimeout(() => {
        let isCheck = checkNodeData(lf.getGraphData())
        if (!isCheck) {
          let data = localStorage.getItem('getGraphData') || ''
          lf.graphModel.graphDataToModel(JSON.parse(data))
        } else {
          localStorage.setItem('getGraphData', JSON.stringify(lf.getGraphData()))
        }
      })
    });
    lf.on('blank:click', () => {
      hidePropertyPanel();
    });
    lf.on('node:mousedown', (mode) => {
      // console.log([mode.e.x,mode.e.y],mode)
      // clearTimeout(timer)
    });
    lf.on('node:mouseenter', () => {

    })
  };
  // 更新属性
  const updateProperty = (id: string, data: any) => {
    const node = lf.graphModel.nodesMap[id];
    const edge = lf.graphModel.edgesMap[id];
    if (node) {
      node.model.setProperties(Object.assign(node.model.properties, data));
      // 圆角属性特殊设置
      node.model.radius = node.model.properties.radius;
    } else if (edge) {
      edge.model.setProperties(Object.assign(edge.model.properties, data));
    }
  };
  // 隐藏属性面板
  const hidePropertyPanel = () => {
    setNodeData(undefined);
  };
  // 拖拽生成组件
  const dragInNode = (type: any) => {
    // config.isSilentMode=false
    if (!conf.isSilentMode) {
      lf.dnd.startDrag({
        type
      })
    } else {
      message.warn('静默模式下不能编辑，点击编辑按钮方可编辑')
    }
  }

  const handlerEdit = (isEdit: boolean) => {
    setConf({
      ...conf,
      isSilentMode: isEdit
    })
  }

  return (
    <>
      <TopMenu
        isEdit={conf.isSilentMode}
        handlerEdit={handlerEdit}
        lf={lf}
      />
      <div className="approve-example-container">
        {
          conf.isSilentMode ? (
            <SearchBar
              onSearch={onSearch}
              itemList={searchItem}
              preHandle={preHandle}
              nextHandle={nextHandle}
              num={num}
            />
          ) : ''
        }
        {
          !conf.isSilentMode ? (
            <div className="node-panel">
              <Sidebar
                dragInNode={dragInNode}
              />
            </div>
          ) : ''
        }
        <div id="graph" className="viewport" />
        {nodeData && !conf.isSilentMode ? (
          <div className="property-panel">
            <PropertyPanel nodeData={nodeData} updateProperty={updateProperty} />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

// 开启多选(选区)
// lf.extension.selectionSelect.openSelectionSelect();
// lf.openSelectionSelect();
// lf.once("selection:selected", () => {
//   lf.closeSelectionSelect();
// });

// 添加跳转详情菜单
// lf.extension.menu.addMenuConfig({
//   nodeMenu: [
//     {
//       text: '跳转详情',
//       callback(node: any) {
//         if (node.type == 'architecture') {
//           lf.graphModel.graphDataToModel(data)
//         } else {
//           message.warn('只有地图有下钻层级！')
//         }
//       }
//     }
//   ],
// });