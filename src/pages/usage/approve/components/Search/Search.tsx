import React,{useEffect,useState} from 'react'
import LogicFlow from '@logicflow/core';

import { Input,Button } from 'antd';
import './search.css'

const { Search } = Input;

export default function SearchBar(props:any) {
  const onSearch = (val:any) => {
    props.onSearch(val)
  }

  const preHandleClick = () =>{
    props.preHandle()
  }


  const nextHandleClick = () =>{
    props.nextHandle()
  }



  return (
    <div className="toolbar">
      <Search
        placeholder="请输入关键字搜索"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
      {
        props.itemList.length > 0 ? (
          <div>
          <Button type="text" disabled >{props.num+1}/{props.itemList.length}</Button>
          <Button onClick={preHandleClick}>上一个</Button>
          <Button onClick={nextHandleClick}>下一个</Button>
        </div>
        ) : ''
      }
    </div>
  )
}