import { HtmlNode, HtmlNodeModel } from '@logicflow/core';
// import { JSX } from "preact";
import React from 'react';
import ReactDOM from 'react-dom';
function Hello(props: any) {
  return (
    <>
      {/* <h1 className="box-title">{props.type || "img"}</h1> */}
      <img
        style={{
          width: '100%',
          height: '100%',
          border: `1px solid ${props.color || '#989891'}`,
        }}
        src={props.url}
        alt="loading"
      />
    </>
  );
}

class BoxxModel extends HtmlNodeModel {
  setAttributes() {
    super.setAttributes();
    // this.text.editable = false;
    this.text.value = '';
    const width = 90;
    const height = 90;
    this.resizable = true;
    this.width = width;
    this.height = height;
    this.anchorsOffset = [
      [width / 2, 0],
      [0, height / 2],
      [-width / 2, 0],
      [0, -height / 2],
    ];
  }
}
class BoxxNode extends HtmlNode {
  setHtml(rootEl: HTMLElement) {
    // const properties = JSON.parse(JSON.stringify(this.props.model.getProperties()))
    // console.log(properties)
    const { properties, type } = this.props.model;
    let url = properties.url;
    if (!properties.url) {
      url =
        'https://ae01.alicdn.com/kf/HTB1Cs4SbBGw3KVjSZFw762Q2FXa7.png';
    }
    ReactDOM.render(
      <Hello url={url} type={type} color={properties.color} />,
      rootEl,
    );
  }
}

export default {
  type: 'img',
  view: BoxxNode,
  model: BoxxModel,
};
