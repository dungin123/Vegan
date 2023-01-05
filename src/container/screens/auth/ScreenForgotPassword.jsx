import { LockOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import React from "react";
import "./ScreenForgotPassword.css";

function ScreenForgotPassword() {
  return (
    <div className="_forgot_container">
      <div className="_forgotbuttonback_container">
        <Button className="_forgot_button_back" href="/">
          <p className="_title_back">Back</p>
        </Button>
      </div>
      <p className="_forgot_title">Quên mật khẩu</p>
      <div className="_forgotInputnew_container">
        <p className="_forgot_title_name">Mã OTP</p>
        <Input className="_forgotInputnew" />
        <Button className="_forgot_button_otp">
          <p className="_title_otp">Gửi</p>
        </Button>

        <p className="_forgot_title_name">Mã OTP</p>
        <Input className="_forgotInputnewres" />

        <p className="_forgot_title_name">Mật khẩu mới</p>
        <Input className="_forgotInputnewres" />

        <p className="_forgot_title_name">Xác nhận mật khẩu</p>
        <Input className="_forgotInputnewres" />
      </div>
      <div className="_forgotbuttonnew_container">
        <Button className="_forgotbuttonnew" href="/">
          <p className="_title_button">Xong</p>
        </Button>
      </div>
    </div>
  );
}

export default ScreenForgotPassword;
