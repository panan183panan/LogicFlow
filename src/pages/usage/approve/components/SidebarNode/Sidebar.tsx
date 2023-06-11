import React, { FC, useEffect } from 'react'
import { Collapse } from 'antd';
import * as Icon from '../../icon'
import { basicComponentsList, specialComponentsList } from '../../icon'

import './sidebar.css'

const { Panel } = Collapse;

interface Isidebar {
  [key: string]: any;
}

const noop = () => { };

const Sidebar: FC<Isidebar> = (props) => {
  const { dragInNode = noop } = props;

  return (
    <Collapse
      defaultActiveKey={['1']}
      // bordered
      // accordion
      ghost
    >
      <Panel header="通用组件" key="1">
        <div className="diagram-sidebar">
          <div className="node-category">
            {
              basicComponentsList.map((item,index) => {
                const ComponentTem = item.com
                return (
                  <div key={index} className="node-item1" onMouseDown={dragInNode.bind(this, `${item.type}`)}>
                    <ComponentTem />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Panel>
      <Panel header="高级组件" key="2">
        <div className="node-category">
          {
            specialComponentsList.map((item,index) => {
              const ComponentTem = item.com
              return (
                <div key={index} className="node-item2" onMouseDown={dragInNode.bind(this, `${item.type}`)}>
                  <ComponentTem />
                  <h4>{item.name}</h4>
                </div>
              )
            })
          }
        </div>
      </Panel>
      <Panel header="图片资源" key="3">
        <div>
          <div className="image-node image-setting" onMouseDown={dragInNode.bind(this, 'image-setting')}>
          </div>
          <div className="image-node image-user" onMouseDown={dragInNode.bind(this, 'image-user')}>
          </div>
          <div className="image-node image-cloud" onMouseDown={dragInNode.bind(this, 'image-cloud')}>
          </div>
        </div>
      </Panel>
      {/* <Panel header="线条类别" key="4"></Panel> */}
    </Collapse>

  )
}

export default Sidebar;