import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import "../banner/bannerwonent/CreateBannerWoment.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SelectMenWoment from "../../../Components/products/SelectMenWomen";
import { mToken } from "../../../../token/TokenLogin";
import {
  LOCALHOST,
  URL_GET_ALL_OPJECT,
  URL_POST_TYPE,
} from "../../../API/ALLAPI";
import { textAlign } from "@mui/system";
function FromCreateTypeProduct(props) {
  // khai báo state
  const [nameLinkImage, setNameLinkImage] = useState("");
  const [nameImage, setNameImage] = useState();
  const [valueText, setValueText] = useState("");
  const [dataOp, setDataOp] = useState("");

  // tham chiếu redux
  const dispatch = useDispatch();

  // lấy dữ liệu id của đối tượng
  const [dataLable, setDataLable] = useState("");
  const handleChange = (checkedValues) => {
    "checked = ", setDataLable(checkedValues.target.value);
  };

  useEffect(() => {
    fetch(`${LOCALHOST}` + `${URL_GET_ALL_OPJECT}`)
      .then((res) => res.json())
      .then((dataOp) => {
        const otpn = [];
        dataOp.result.map((item) => {
          otpn.push({ label: item.titleTypeProduct, value: item._id });
        });
        setDataOp(otpn);
      });
  }, []);

  // lấy file
  const upImage = (e) => {
    setNameLinkImage(e.target.files);
    setNameImage(e.target.files[0].name);
  };
  console.log(nameLinkImage);
  // thực hiện truy vấn
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("titleCategoryProduct", values.titleCategoryProduct);
    formData.append("croppedImage", nameLinkImage[0]);
    formData.append("idTypeProduct", dataLable);

    axios({
      url: `${LOCALHOST}` + `${URL_POST_TYPE}`,
      method: "POST",
      headers: {
        token: mToken,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    }).then(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err.response);
      }
    );
    if (!values) {
      console.log("Mời nhập đối tượng");
    }
    message.success({
      content: "Thêm loại SP thành công",
      className: "custom-class",
      style: {
        color: "#52c41a",
      },
      duration: 2,
    });
    setValueText("");
  };

  return (
    <div style={{ overflow: "none" ,backgroundColor:'#FFFFFF',borderRadius:20}}>
      <h3
        className="_titile_add_wonent"
        style={{
          width: "100%",
          textAlign: "center",
        }}
      >
        Thêm thể loại
      </h3>
      <Form
        style={{ margin: " 0 20px" }}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "70%" }}>
            <p
              style={{
                color: "#000000",
                fontSize: 16,
                fontWeight: "700",
                fontFamily: "Open Sans",
              }}
            >
              Tên thể loại *
            </p>
            {/* tên */}
            <Form.Item
              name="titleCategoryProduct"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên !",
                },
                {
                  min: 3,
                  message: "Nhập ít nhất 3 ký tự",
                },
              ]}
            >
              <Input style={{ borderRadius: 3 }} defaultValue={valueText} />
            </Form.Item>
            {/* Đối tượng */}
            {/* <p
              style={{
                color: "#000000",
                fontSize: 16,
                fontWeight: "700",
                fontFamily: "Open Sans",
              }}
            >
              Chọn thể loại SP *
            </p>
            <Form.Item
              name="idTypeProduct"
              // style={{ display: "flex"}}
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thể loại SP!",
                },
              ]}
            >
              <SelectMenWoment dataOP={dataOp} onChange={handleChange} />
            </Form.Item> */}
          </div>
          <div style={{ width: "50%" }}>
            {/* thêm ảnh */}
            <p
              style={{
                color: "#000000",
                fontSize: 16,
                fontWeight: "700",
                fontFamily: "Open Sans",
              }}
            >
              Chọn ảnh *
            </p>

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
            <Form.Item
              name="croppedImage"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn ảnh!",
                },
              ]}
              // style={{ marginTop: -30 }}
            >
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
            </Form.Item>
          </div>
        </div>
        {/* nút xử lý sự kiện */}
        <Form.Item
          wrapperCol={{
            offset: 15,
            span: 16,
          }}
          style={{ textAlign: "center" }}
        >
          <Button
            type="primary"
            htmlType="submit"
            style={{
              marginBottom: 50,
              width: "80%",
              backgroundColor: "#68B510",
              borderColor: "#68B510",
              textAlign: "center",
              borderRadius: 10,
              right: "80%",
              alignSelf: "center"
            }}
          >
            <p
              style={{
                fontSize: 16,
                fontWeight: "400",
                color: "white",
                marginTop: -2,
              }}
            >
              Thêm
            </p>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FromCreateTypeProduct;
