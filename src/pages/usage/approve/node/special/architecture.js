import { HtmlNode, HtmlNodeModel } from '@logicflow/core';
// import { JSX } from "preact";
import React from 'react';
import ReactDOM from 'react-dom';
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'
function Hello(props: any) {
  return (
    <div
      style={{
        margin: 'auto',
        width: '100%', 
        height: '100%',
        fontSize: `15px`,
        color: `${props.fontColor || '#f95'}`,
        borderRadius:`${props.radius || 0}px`,
        backgroundColor: `${props.backgroundColor || '#fff'}`,
        border: `${props.borderWidth || 2}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000'}`,
        // backgroundSize:'100% 100%',
        // backgroundImage:`url('${props.url}')`
      }}
    >
      <span>地图</span>
    </div>
  );
}

class BoxxModel extends HtmlNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    return getShapeStyleFuction(style, properties)
  }
  getTextStyle() {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    return getTextStyleFunction(style, properties)
  }
  setAttributes() {
    const data = this.getProperties()
    // this.text.editable = false;
    // this.text.value = '';
    const width = data?.width || 120;
    const height = data?.height || 60;
    this.width = width;
    this.height = height;
  }
}

class BoxxNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    // const properties = JSON.parse(JSON.stringify(this.props.model.getProperties()))
    // console.log(properties)
    const { properties, type } = this.props.model;
    ReactDOM.render(
      <Hello {...properties} type={type} />,
      rootEl,
    );
  }
}

export default {
  type: 'architecture',
  view: BoxxNode,
  model: BoxxModel,
};
