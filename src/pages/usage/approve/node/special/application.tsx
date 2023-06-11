import { HtmlNode, HtmlNodeModel } from '@logicflow/core';
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

// import { JSX } from "preact";
import React from 'react';
import ReactDOM from 'react-dom';
function Hello(props: any) {
  return (
    <div
      style={{
        margin: 'auto',
        width: '100%', height: '100%',
        fontSize: `15px`,
        color: `${props.fontColor || '#f95'}`,
        borderRadius:`${props.radius || 0}px`,
        backgroundColor: `${props.backgroundColor || '#fff'}`,
        border: `${props.borderWidth || 2}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000'}`,
      }}
    >
      <span>应用</span>
    </div>
  );
}

class BoxxModel extends HtmlNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    if (this.isSelected) {
      style.stroke = '#2740c6'
      // properties.borderColor = '#2740c6';
    }
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
    const { properties, type } = this.props.model;
    ReactDOM.render(
      <Hello {...properties} type={type} />,
      rootEl,
    );
  }
}

export default {
  type: 'application',
  view: BoxxNode,
  model: BoxxModel,
};
