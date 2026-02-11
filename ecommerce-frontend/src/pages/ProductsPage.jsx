import { Table, Button, Select, Card } from "antd";
import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ProductModal from "../components/ProductModal";
import { getProducts, deleteProduct } from "../services/product.service";

const { Option } = Select;

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const fetchProducts = async () => {
    const res = await getProducts({ page, limit: 10, category });
    setData(res.data.products);
    setTotal(res.data.totalItems);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, category]);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) =>
        image ? (
          <img
            src={`http://localhost:3000/uploads/${image}`}
            alt="product"
            style={{ width: 50, height: 50, objectFit: "cover" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Name",
      dataIndex: "title",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      render: (value) => `₹${value}`,
    },
    {
      title: "Distributor Rate",
      dataIndex: "distributorRate",
      render: (value) => `₹${value}`,
    },
    {
      title: "Retailer Price",
      dataIndex: "retailerPrice",
      render: (value) => `₹${value}`,
    },
    {
      title: "UOM",
      render: (_, record) => `${record.uom} ${record.uomUnit}`,
    },
    {
      title: "CRT",
      dataIndex: "crt",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button
            size="small"
            onClick={() => {
              setSelected(record);
              setOpen(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            size="small"
            style={{ marginLeft: 8 }}
            onClick={async () => {
              await deleteProduct(record._id);
              fetchProducts();
            }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <Card
        title="Products"
        extra={
          <Button type="primary" onClick={() => setOpen(true)}>
            + Add Product
          </Button>
        }
      >
        <div style={{ marginBottom: 16 }}>
          <Select
            placeholder="Filter by Category"
            style={{ width: 200 }}
            onChange={(value) => setCategory(value)}
            allowClear
          >
            <Option value="Milk">Milk</Option>
            <Option value="Butter">Butter</Option>
            <Option value="Dahi">Dahi</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={data}
          rowKey="_id"
          pagination={{
            current: page,
            total: total,
            pageSize: 10,
            onChange: (p) => setPage(p),
          }}
        />
      </Card>

      <ProductModal
        open={open}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
        product={selected}
        refresh={fetchProducts}
      />
    </DashboardLayout>
  );
};

export default ProductsPage;
