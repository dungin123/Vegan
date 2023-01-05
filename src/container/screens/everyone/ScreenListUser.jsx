import { Avatar, Button, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";

import "../profit/Listproduct.css";
import Search from "antd/lib/input/Search";
import axios from "axios";
import { mToken } from "../../../../token/TokenLogin";
import { useDispatch, useSelector } from "react-redux";
import { getUser, removeUser } from "../../../Redux/UserSlice";
import ReactHtmlTableToExcel from "react-html-table-to-excel";

const ScreenListUser = () => {
  const dispatch = useDispatch();
  const dataus = useSelector((data) => data.users.value);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  console.log(dataus);

  const deletee = (id) => {
    dispatch(
      removeUser({
        mIdUser: id,
      })
    );
    message.success({
      content: "Xoá thành công",
      style: { color: "green" },
    });
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "_id",
      render: (_id, data, index) => index + 1,
    },
    {
      title: "Ảnh",
      dataIndex: "photoUrl",
      render: (photoUrl) => (
        <Avatar
          src={photoUrl}
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 66,
            xxl: 70,
          }}
        />
      ),
    },

    {
      title: "Tên",
      dataIndex: "name",
    },
    {
      title: "SĐT",
      dataIndex: "phone",
    },

    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Hoạt động",
      dataIndex: "_id",
      render: (_id) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
            marginTop: 5,
          }}
        >
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá không?"
            onConfirm={() => deletee(_id)}
            okText="Xoá"
            cancelText="Huỷ"
          >
            <p
              style={{ width: 50, cursor: "pointer", color: "blue" }}
              size={24}
            >
              Xoá
            </p>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="list-product">
      <div className="titlespb">
        <p className="text_titlespb">Danh sách người dùng</p>
      </div>
      <div className="text_spb">
        <p className="texttitlespb">
          {
            " Danh sách quyết định hiệu quả việc trình bày sản phẩm và cung cấp không gian \n để liệt kê các sản phẩm và dịch vụ của bạn theo cách hấp dẫn nhất."
          }
        </p>
      </div>
      {/* <div
        className="button-list"
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          style={{
            margin: "10px 30px",
            backgroundColor: "#D9D9D9",
            border: "1px solid #D9D9D9 ",
          }}
        >
          <p style={{ color: "#000" }}>Xoá tất cả</p>
        </Button>
      </div> */}
      <div style={{ width: "100%", margin:'0 0 0 20px' }}>
        <section className="py-4 container">
          <div className="row justify-content-center">
            <table
              className="table table-striped"
              id="Export_xlsx"
              hidden={true}
            >
              <thead>
                <tr>
                  <td>STT</td>
                  <td>Tên khách hàng</td>
                  <td>Số điện thoại khách hàng</td>
                  <td>Email khách hàng</td>
                </tr>
              </thead>
              <tbody>
                {dataus.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.phone}</td>
                      <td>{item.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div style={{ marginTop: 20 }}>
        <Table
          columns={columns}
          dataSource={dataus}
          rowKey={(item) => item._id}
          className="table-list"
        />
      </div>
    </div>
  );
};

export default ScreenListUser;
