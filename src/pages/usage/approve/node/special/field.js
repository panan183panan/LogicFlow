import { GroupNode } from '@logicflow/extension';
import { getShapeStyleFuction, getTextStyleFunction } from '../getShapeStyleUtil'

class MyGroup extends GroupNode.view {}

class MyGroupModel extends GroupNode.model {
  initNodeData(data: any) {
    super.initNodeData(data);
    // this.isRestrict = true;
    this.resizable = true;
    this.width = 200;
    this.height = 130;
    this.radius = 10
  }
  getNodeStyle () {
    const style = super.getNodeStyle()
    const properties = this.getProperties()
    // this.radius = properties.borderRadius || 0
    return getShapeStyleFuction(style, properties)
  }

  getTextStyle () {
    const style = super.getTextStyle()
    const properties = this.getProperties()
    return getTextStyleFunction(style, properties)
  }
}

export default {
  type: 'field',
  model: MyGroupModel,
  view: MyGroup,
};
