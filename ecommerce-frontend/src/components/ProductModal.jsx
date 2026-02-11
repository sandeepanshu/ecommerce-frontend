import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  Upload,
  Row,
  Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { createProduct, updateProduct } from "../services/product.service";

const { Option } = Select;

const ProductModal = ({ open, onClose, product, refresh }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    // Convert image upload to filename
    if (values.image && values.image.file) {
      values.image = values.image.file.name;
    }

    if (product) {
      await updateProduct(product._id, values);
    } else {
      await createProduct(values);
    }

    refresh();
    onClose();
  };

  return (
    <Modal
      open={open}
      title={product ? "Edit Product" : "Add Product"}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Form layout="vertical" form={form}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="title" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Category">
                <Option value="Milk">Milk</Option>
                <Option value="Butter">Butter</Option>
                <Option value="Dahi">Dahi</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="mrp" label="MRP" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="distributorRate"
              label="Distributor Rate"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="retailerPrice"
              label="Retailer Price"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="uomUnit"
              label="UOM Unit"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Unit">
                <Option value="Pieces">Pieces</Option>
                <Option value="Kg">Kg</Option>
                <Option value="ml">ml</Option>
                <Option value="gm">gm</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="uom" label="UOM" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="crt" label="CRT" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Selling Price"
              rules={[{ required: true }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="stock" label="Stock" rules={[{ required: true }]}>
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="image" label="Image">
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

        <Row justify="end" gutter={12}>
          <Col>
            <Button onClick={onClose}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={handleSubmit}>
              {product ? "Update" : "Create"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductModal;
