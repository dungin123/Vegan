import React from "react";
import { Button, Form, Input, Modal } from "antd";
import TableListTypeProduct from "./TableListTypeProduct";
const FromListTypeProduct = () => {
  return (
    <div style={{ margin: 50, height: "100%" }}>
      <h3 style={{ fontSize: 24 }}>Danh sách thể loại</h3>
      <div
        style={{
          display: "flex",
        }}
      >
      </div>
      <div>
        <TableListTypeProduct />
      </div>
    </div>
  );
};

export default FromListTypeProduct;
