import React, { useEffect, useState, useMemo } from 'react';
import { Form, Select, Input, Button } from 'antd';
import { ColorPicker } from '../color/ColorPicker'
import './property.css'
// @ts-ignore
export default function PropertyPanel(props: any) {
  const { nodeData, updateProperty } = props
  const [color, setColor] = useState(nodeData.properties?.color || '#000');
  const [backgroundColor, setBackgroundColor] = useState(nodeData.properties?.backgroundColor || '#fff');
  const [borderColor, setBorderColor] = useState(nodeData.properties?.borderColor || '#000');
  const [form] = Form.useForm();

  useEffect(() => {
    if (!!nodeData.properties) {
      form.resetFields();
      form.setFieldsValue(nodeData.properties)
      setColor(nodeData.properties?.fontColor || '#000')
      setBackgroundColor(nodeData.properties?.backgroundColor || '#fff')
      setBorderColor(nodeData.properties?.borderColor || '#000')
    }
  }, [nodeData.properties])

  // 自定义组件节点分类
  const renderSpecialComponent = useMemo(() => {
    const { type } = nodeData
    if (type === 'application') {
      return (
        <>
          <Form.Item label="应用长度" name="width">
            <Input type='number' addonAfter="px" />
          </Form.Item>
          <Form.Item label="应用宽度" name="height">
            <Input type='number' addonAfter="px" />
          </Form.Item>
          <Form.Item label="关联应用" name="isApplication">
            <Select
              placeholder="--请选择--"
              options={[
                {
                  value: 1,
                  label: '应用一',
                },
                {
                  value: 2,
                  label: '应用二',
                },
                {
                  value: 3,
                  label: '应用三',
                }
              ]}
            />
          </Form.Item>
        </>
      )
    }else if (type === 'architecture') {
      return (
        <>
          <Form.Item label="应用长度" name="width">
            <Input type='number' addonAfter="px" />
          </Form.Item>
          <Form.Item label="应用宽度" name="height">
            <Input type='number' addonAfter="px" />
          </Form.Item>
          <Form.Item label="关联地图" name="isApplication">
            <Select
              placeholder="--请选择--"
              options={[
                {
                  value: 1,
                  label: '地图一',
                },
                {
                  value: 2,
                  label: '地图二',
                },
                {
                  value: 3,
                  label: '地图三',
                }
              ]}
            />
          </Form.Item>
          <Form.Item label="修改地图">
            <Button type='primary'>进入地图</Button>
          </Form.Item>
        </>
      )
    }
  }, [nodeData.type])

  const onFormLayoutChange = (value: any, all: any) => {
    if (form.getFieldValue('isApplication')) {
      // 关联应用的接口
    }
    updateProperty(nodeData.id, value);
  }
  return (
    <div className='node-properties'>
      <h2>属性面板</h2>
      <Form
        className='my-form'
        form={form}
        onValuesChange={onFormLayoutChange}
        labelAlign='right'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
      >
        {/* <Form.Item label="Type">
          <Button type='text' disabled>{nodeData.type}</Button>
        </Form.Item> */}
        {
          nodeData.text?.value ?
            <Form.Item label="Value">
              <Button type='text' disabled>{nodeData.text?.value}</Button>
            </Form.Item>
            : ''
        }
        <Form.Item label="背景色" name="backgroundColor">
          <ColorPicker color={backgroundColor} onChange={setBackgroundColor} />
        </Form.Item>
        <Form.Item label="文本颜色" name="fontColor">
          <ColorPicker color={color} onChange={setColor} />
        </Form.Item>
        <Form.Item label="边框颜色" name="borderColor">
          <ColorPicker color={borderColor} onChange={setBorderColor} />
        </Form.Item>
        <Form.Item label="字体大小" name="fontSize">
          <Input type='number' addonAfter="px" />
        </Form.Item>
        <Form.Item label="边框粗细" name="borderWidth">
          <Input type='number' addonAfter="px" />
        </Form.Item>
        <Form.Item label="边框样式" name="borderStyle">
          <Select
            defaultValue={'solid'}
            options={[
              {
                value: 'solid',
                label: '实线',
              },
              {
                value: 'dashed',
                label: '长虚线',
              },
              {
                value: 'dotted',
                label: '短虚线',
              },
              {
                value: 'hidden',
                label: '无',
              }
            ]}
          />
        </Form.Item>
        <Form.Item label="圆角大小" name="radius">
          <Input type='number' addonAfter="px" />
        </Form.Item>
        {renderSpecialComponent}
      </Form>
    </div>
  )
}