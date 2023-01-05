import axios from "axios";
import { useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "./AuthSlice";
import { CheckCircleTwoTone, PlusOutlined } from "@ant-design/icons";

import { message } from "antd";
import { LOCALHOST, URL_LOGIN_ACC_ADMIN } from "../API/ALLAPI";

export const loginUser = async (user, dispatch, navigation) => {
  dispatch(loginStart());

  return axios
    .post(`${LOCALHOST}` + `${URL_LOGIN_ACC_ADMIN}`, user)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("Token", JSON.stringify(response.data.token));
      }
      dispatch(loginSuccess(response.data));
      navigation("/shop/tong_quan");
      
      message.success({
        content: "Đăng nhập thành công!",

        style: {
          color: "#52c41a",
        },
      });
      return response.data;
    })
    .catch((Error) => {
      message.error({
        content: "Sai mật khẩu hoặc tài khoản!",

        style: {
          color: "red",
        },
      });
      dispatch(loginFailed());
      // dispacth(loginSuccess())
      // navigation("/shop/tong_quan");
    });
};
