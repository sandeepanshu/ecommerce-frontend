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

  useEffect(() => {
    if (product) {
      form.setFieldsValue({
        ...product,
        image: product.image
          ? [
              {
                uid: "-1",
                name: product.image,
                status: "done",
                url: `http://localhost:3000/uploads/${product.image}`,
              },
            ]
          : [],
      });
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "image") {
        formData.append(key, values[key]);
      }
    });

    if (
      values.image &&
      values.image.length > 0 &&
      values.image[0].originFileObj
    ) {
      formData.append("image", values.image[0].originFileObj);
    }

    if (product) {
      await updateProduct(product._id, formData);
    } else {
      await createProduct(formData);
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

        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
        >
          <Upload beforeUpload={() => false} maxCount={1} listType="picture">
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
