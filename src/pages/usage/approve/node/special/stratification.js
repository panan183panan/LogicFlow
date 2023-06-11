import { GroupNode } from '@logicflow/extension';
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

class MyGroup extends GroupNode.view { }

class MyGroupModel extends GroupNode.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    // this.isRestrict = true;
    this.resizable = true;
    this.width = 300;
    this.height = 200;
    this.style.strokeDasharray = '3 3'
    this.radius = 10
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    style.stroke = this.properties.color || '#ffbc36';
    style.strokeWidth = 1;
    style.strokeDasharray = '3 3';
    // if (this.isSelected) {
    //   style.stroke = "rgb(124, 15, 255)";
    // }
    return style;
  }

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
}

export default {
  type: 'stratification',
  model: MyGroupModel,
  view: MyGroup,
};
