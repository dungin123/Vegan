import { Button, Form, Input, message, Select } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mAUTHORIZATION, mToken } from "../../../../token/TokenLogin";
import {
  LOCALHOST,
  URL_PUSH_NOTIFICATION,
  URL_SAVE_NOTIFICATION,
} from "../../../API/ALLAPI";
import {
  getTokenNotifications,
  saveNotifices,
} from "../../../Redux/NotificationSlice";
import axios from "axios";

export default function PushNotifications() {
  const { Option } = Select;

  const [nameLinkImage, setNameLinkImage] = React.useState([]);
  const [nameImage, setNameImage] = React.useState();
  const [selectScreen, setSelectScreen] = React.useState();
  const dispatch = useDispatch();
  const tokenData = useSelector((data) => data.notification.value);

  const upImage = (e) => {
    setNameLinkImage(e.target.files);
    setNameImage(e.target.files[0].name);
  };
  const onChange = (value) => {
    setSelectScreen(value);
  };
  const onFinish = (values) => {
    var data = JSON.stringify({
      data: {
        type: selectScreen,
      },
      notification: {
        title: values.title,
        body: values.body,
      },
      registration_ids: tokenData.map((item) => item?.tokenPush),

      // registration_ids: [
      //   "cMi-INJHTaiTIZvuzVB2j-:APA91bHa6E-gEhmppUFiVZKfR2rTsnmDNYrA2yG5So_aABzNa6MFnhZEhhGhSf6WwEk9ZiOvEveJxzLeBnPX-vh0Na8w3Yx_-lAITI0N3eTaQGAyn--uTSm_aOAggwHSvVGsIxXZwA6U",
      // ],
    });
    var config = {
      method: "post",
      url: `${URL_PUSH_NOTIFICATION}`,
      headers: {
        Authorization: `${mAUTHORIZATION}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        // console.log(response);
        if (response.data.success !== 0) {
          message.error({
            content: "Bạn đã thông báo cho người dùng thành công",
            style: { color: "green" },
          });
          const fromdata = new FormData();
          fromdata.append("title", values.title);
          fromdata.append("body", values.body);
          fromdata.append("croppedImage", nameLinkImage[0]);
          axios({
            url: `${LOCALHOST}` + `${URL_SAVE_NOTIFICATION}`,
            method: "POST",
            headers: {
              token: mToken,
              "Content-Type": "multipart/form-data",
            },
            data: fromdata,
          }).then(
            (res) => {
              if (res.data.code === 200) {
                message.success({
                  content: "Lưu thông báo thành công",
                  style: { color: "green" },
                });
              } else {
                message.error({
                  content: "Lưu thông báo thất bại",
                  style: { color: "red" },
                });
              }
              console.log(res);
            },
            (err) => {
              console.log(err.response);
            }
          );
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    dispatch(getTokenNotifications());
  }, []);

  console.log(nameLinkImage, 'img')
  return (
    <Form
      name="nest-messages"
      onFinish={onFinish}
      style={{ margin: "50px 50px 0 50px" }}
    >
      <div
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 30,
          fontFamily: "initial",
        }}
      >
        Tạo thông báo
      </div>
      <div style={{ marginBottom: 10 }}>
        <a style={{ color: "black", fontSize: 16 }}>Màn hình thông báo*</a>
      </div>
      <Form.Item
        name="select"
        rules={[
          {
            required: true,
            message: "Vui lòng chọn",
          },
        ]}
      >
        <Select
          placeholder="Chọn màn hình muốn thông báo"
          onChange={onChange}
          style={{ backgroundColor: "#ffffff" }}
        >
          <Option value="ScreensHome">Màn hình Trang chủ</Option>
          <Option value="ScreensProduct">Màn hình Sản phẩm</Option>
          <Option value="ScreenCart">Màn hình Giỏ hàng</Option>
        </Select>
      </Form.Item>
      <div style={{ marginBottom: 10 }}>
        <a style={{ color: "black", fontSize: 16 }}>Tiêu đề thông báo*</a>
      </div>
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập thông tin",
          },
        ]}
      >
        <Input placeholder="Nhập tiêu đề muốn thông báo" />
      </Form.Item>
      <div style={{ marginBottom: 10 }}>
        <a style={{ color: "black", fontSize: 16 }}>Nội dung thông báo*</a>
      </div>
      <Form.Item
        name="body"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập thông tin",
          },
        ]}
      >
        <Input.TextArea placeholder="Nhập nội dung muốn thông báo" />
      </Form.Item>
      <div style={{ marginBottom: 10 }}>
        <a style={{ color: "black", fontSize: 16 }}>Chọn ảnh thông báo( nếu có )</a>
      </div>

      {nameImage !== undefined && (
        <div style={{ display: "flex" }}>
          <span style={{ margin: 5 }}>{nameImage}</span>
          <br />
          <Button
            onClick={() => setNameImage()}
            style={{ margin: 5, marginBottom: 10 }}
          >
            Huỷ
          </Button>
        </div>
      )}
      <br />
      <label htmlFor="images" name="croppedImage">
        <div
          name="croppedImage"
          style={{
            border: "1px solid #d9d9d9",
            marginTop: -25,
            textAlign: "center",
            borderRadius: 3,
            width: "100%",
            height: 35,
            backgroundColor: "#ffffff",
          }}
        >
          <p
            name="croppedImage"
            style={{
              marginTop: 5,
            }}
          >
            Chọn ảnh
          </p>
        </div>
      </label>

      <input
        id="images"
        type="file"
        name="croppedImage"
        style={{
          display: "none",
          width: "100%",
          // backgroundColor: "red",
        }}
        onChange={(e) => upImage(e)}
      />

      <Form.Item style={{ textAlign: "center", marginTop:20 }}>
        <Button
          type="primary"
          htmlType="reset"
          style={{
            width: "20%",
            marginRight: 16,
            backgroundColor: "#DCDFE8",
            borderColor: "#DCDFE8",
            color: "#000",
          }}
        >
          Đặt lại
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            width: "20%",
            marginRight: 16,
            backgroundColor: "#87CEEB99",
            borderColor: "#87CEEB99",
            color: "#000",
          }}
        >
          Thông báo
        </Button>
      </Form.Item>
    </Form>
  );
}
