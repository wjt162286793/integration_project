import React from 'react';
import { Modal, Form, Input, Radio, Checkbox, Button } from 'antd';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface VirtualModalProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const VirtualModal: React.FC<VirtualModalProps> = ({ open, onCancel, onSubmit }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // 表单选项数据
  const typeOptions = [
    { label: 'AI资产', value: 'ai_asset' },
    { label: '虚拟资产', value: 'virtual_asset' },
    { label: '其他资产', value: 'other' }
  ];

  const levelOptionsForm = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 }
  ];

  const symbolNameOptions = [
    { label: 'BTC', value: 'btc' },
    { label: 'ETH', value: 'eth' },
    { label: '其他', value: 'other' }
  ];

  const tagsOptions = [
    { label: '大模型', value: 'big_model' },
    { label: 'AI研发', value: 'ai_research' },
    { label: '加密货币', value: 'crypto_currency' },
    { label: '虚拟货币', value: 'virtual_currency' },
    { label: '区块链', value: 'blockchain' }
  ];

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title="创建资产"
      open={open}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          提交
        </Button>
      ]}
      width={700}
    >
      <div className='vritualFormBox'>
        <Form
          form={form}
          layout="vertical"
          requiredMark
          onFinish={handleSubmit}
        >
          <Form.Item
            name="cname"
            label="中文名称"
            rules={[{ required: true, message: '请输入中文名称' }]}
          >
            <Input placeholder="请输入中文名称" />
          </Form.Item>

          <Form.Item
            name="ename"
            label="英文名称"
            rules={[{ required: true, message: '请输入英文名称' }]}
          >
            <Input placeholder="请输入英文名称" />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型' }]}
          >
            <Radio.Group options={typeOptions} />
          </Form.Item>

          <Form.Item
            name="price"
            label="价值"
            rules={[{ required: true, message: '请输入价值' }]}
          >
            <Input type="number" placeholder="请输入价值" />
          </Form.Item>

          <Form.Item
            name="level"
            label="等级"
            rules={[{ required: true, message: '请选择等级' }]}
          >
            <Radio.Group options={levelOptionsForm} />
          </Form.Item>

          <Form.Item
            name="tags"
            label="标签"
            rules={[{ required: true, message: '请至少选择一个标签' }]}
          >
            <Checkbox.Group options={tagsOptions} />
          </Form.Item>

          <Form.Item
            name="department_came"
            label="部门中文名称"
            rules={[{ required: true, message: '请输入部门中文名称' }]}
          >
            <Input placeholder="请输入部门中文名称" />
          </Form.Item>

          <Form.Item
            name="department_ename"
            label="部门英文名称"
            rules={[{ required: true, message: '请输入部门英文名称' }]}
          >
            <Input placeholder="请输入部门英文名称" />
          </Form.Item>

          <Form.Item
            name="update_time"
            label="更新时间"
            rules={[{ required: true, message: '请输入更新时间' }]}
          >
            <Input placeholder="请输入更新时间" />
          </Form.Item>

          <Form.Item
            name="symbol_name"
            label="符号名称"
            rules={[{ required: true, message: '请选择符号名称' }]}
          >
            <Radio.Group options={symbolNameOptions} />
          </Form.Item>

          <Form.Item
            name="public_key"
            label="公钥"
            rules={[{ required: true, message: '请输入公钥' }]}
          >
            <Input placeholder="请输入公钥" />
          </Form.Item>

          <Form.Item
            name="transaction_count"
            label="交易次数"
            rules={[{ required: true, message: '请输入交易次数' }]}
          >
            <Input type="number" placeholder="请输入交易次数" />
          </Form.Item>

          <Form.Item
            name="remark"
            label="备注"
            rules={[{ required: true, message: '请输入备注' }]}
          >
            <TextArea rows={4} placeholder="请输入备注" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default VirtualModal;