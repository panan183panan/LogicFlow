import React, { useEffect, useState } from 'react'
import { Button, Space, message, Breadcrumb } from 'antd'
import './index.css'

export default function TopMenu(props: any) {
  useEffect(() => {
    if (!props.isEdit) {
      window.addEventListener("keydown", handleKeyDown); // 添加全局事件
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown); // 销毁
    };
  }, [props.isEdit]);

  // 按下ctrl+s或command+s时调用保存
  const handleKeyDown = (event: any) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      SaveData()
    }
  };

  // 点击保存按钮
  const handleOnClick = () => {
    SaveData()
  }

  // 触发保存的函数
  const SaveData = () => {
    // 保存数据所做的处理方式
    // props.lf.getSnapshot()
    props.lf.getSnapshotBase64().then((Graph: any) => {
      console.log(Graph.data);
    });
    // 获取当前架构图数据
    // const data = props.lf.getGraphData()
    // console.log(data)
    message.success('保存成功')
    handlerEdit()
  };



  // 保存之后的切换
  const handlerEdit = () => {
    props.handlerEdit(!props.isEdit)
  }

  const items = [
    { name: '首页', id: '首页id' }, // 菜单项务必填写 key
    { name: '地图一', id: '地图id1' },
    { name: '地图2', id: '地图id2' },
  ];

  const changeBreadCrumb = (id:string) => {
    message.success(`你点击了id为——${id}——的面包屑`)
  }
  return (
    <div className='node-top'>
      <div style={{ width: '50%', float: 'left', lineHeight: '15px' }}>
        <Breadcrumb>
          {
            items.map((item: any) => {
              return (
                <Breadcrumb.Item key={item.id}><Button type="text" onClick={() => {changeBreadCrumb(item.id)}}>{item.name}</Button></Breadcrumb.Item>
              )
            })
          }
        </Breadcrumb >
      </div >
      <div style={{ width: '50%', float: 'right' }}>
        <Space size='large'>
          {
            props.isEdit ? (
              <Button type='primary' onClick={handlerEdit}>编辑</Button>
            ) : (
              <Button
                onClick={handleOnClick}
              >保存/Ctrl+S</Button>
            )
          }
        </Space>
      </div>
    </div >
  )
}
