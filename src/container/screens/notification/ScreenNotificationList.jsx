import { Popconfirm, Table } from "antd";
import React, { useEffect } from "react";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotifications,
  removeNotifices,
} from "../../../Redux/NotificationSlice";
export default function ScreenNotificationList() {
  const dispatch = useDispatch();
  const dataNotification = useSelector((data) => data.notification.value);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  const deletee = (id) => {
    dispatch(
      removeNotifices({
        IDNotification: id,
      })
    );
  };
  const columns = [
    {
      title: "Ảnh thông báo",
      dataIndex: "urlPhoto",
      render: (urlPhoto) => <img src={urlPhoto} style={{width:300}} />,
    },
    {
      title: "Tiêu đề thông báo",
      dataIndex: "title",
      width: 300,
    },

    {
      title: "Nội dung thông báo",
      dataIndex: "body",
      width: 500,
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
    <div>
      <div
        style={{
          textAlign: "center",
          marginTop: 30,
          fontSize: 30,
          fontFamily: "initial",
        }}
      >
        Danh sách thông báo
      </div>
      <div style={{ width: "100%", position: "absolute", top: 120, left: 213 }}>
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
                  <td>Tiêu đề thông báo</td>
                  <td>Nội dung thông báo</td>
                </tr>
              </thead>
              <tbody>
                {dataNotification.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.body}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <div style={{ margin: "20px 0 0 20px" }}>
        <Table
          style={{ width: "100%" }}
          dataSource={dataNotification}
          columns={columns}
        />
      </div>
    </div>
  );
}
