import { Button, Modal, Steps } from "antd";
import axios from "axios";
import QueryString from "qs";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { mToken } from "../../../../token/TokenLogin";
import {
  LOCALHOST,
  URL_GET_ALL_BILL,
  URL_GET_ID_BILL_DETALS,
} from "../../../API/ALLAPI";
import "./infro.css";
import { useDispatch, useSelector } from "react-redux";
import { getBillProduct, statusBill } from "../../../Redux/BillSlice";
import { getBill } from "../../../API/BillApi";
function InforBillOder() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const databill = useSelector((data) => data.bills.value);
  const [data, setData] = useState(databill);
  const [dataall, setDataAll] = useState();
  const [currentStep, setCurrentStep] = useState();
  const [disabled1, setDisable1] = useState(false);
  const [disabled2, setDisable2] = useState(false);
  const [disabled3, setDisable3] = useState(false);
  const [disabled4, setDisable4] = useState(false);
  const [disabled, setDisable] = useState(false);

  const [curent, setCurrent] = useState();
  const [isModal, setisModal] = useState(false);
  const { Step } = Steps;

  useEffect(() => {
    dispatch(getBillProduct());
    const newData = databill.find((item) => item._id == id);
    setData(newData);
    if (data?.status === 0) {
      setDisable(true);
    } else if (data?.status === 1) {
    }

    axios({
      url: `${LOCALHOST}` + `${URL_GET_ID_BILL_DETALS}`,
      method: "POST",
      headers: {
        token: mToken,
        "content-type": "application/x-www-form-urlencoded",
      },
      data: QueryString.stringify({ idBill: id }),
    }).then((resl) => {
      setDataAll(resl.data.billDetails);
    });
  }, []);

  const Showmodal = (index) => {
    setCurrentStep(index);
    setisModal(true);
  };
  const handleHuy = () => {
    setisModal(false);
  };
  const handleXacnhan = () => {
    if (currentStep === 0) {
      setCurrent(0);
      setisModal(false);
      setDisable(true);
      dispatch(
        statusBill({
          idBill: id,
          status: 0,
        })
      );
    } else if (currentStep === 1) {
      setCurrent(1);
      setisModal(false);
      setDisable(true);
      dispatch(
        statusBill({
          idBill: id,
          status: 1,
        })
      );
    } else if (currentStep === 2) {
      setCurrent(2);
      setisModal(false);
      setDisable(true);
      setDisable1(true);
      dispatch(
        statusBill({
          idBill: id,
          status: 2,
        })
      );
    } else if (currentStep === 3) {
      setCurrent(3);
      setisModal(false);

      setDisable(true);
      setDisable1(true);
      setDisable2(true);
      dispatch(
        statusBill({
          idBill: id,
          status: 3,
        })
      );
    } else if (currentStep === 4) {
      setCurrent(4);
      setisModal(false);

      setDisable(true);
      setDisable1(true);
      setDisable2(true);
      setDisable3(true);
      dispatch(
        statusBill({
          idBill: id,
          status: 4,
        })
      );
    } else if (currentStep === 5) {
      setCurrent(5);
      setisModal(false);

      setDisable(true);
      setDisable1(true);
      setDisable2(true);
      setDisable3(true);
      setDisable4(true);
      dispatch(
        statusBill({
          idBill: id,
          status: 5,
        })
      );
    }
  };
  const dataPrice = [];
  dataall?.map((item) => dataPrice.push(item.price * item.quantity));
  let sum = 0;
  for (let i = 0; i < dataPrice?.length; i++) {
    sum += dataPrice[i];
  }
  let shipCode = data?.transportFee;
  let tongTien = parseInt(sum) + parseInt(shipCode);
  return (
    <div className="_allcontai">
      <div className="_cntai">
        <p className="_textHeader_m">Th??ng tin chi ti???t ho?? ????n</p>
        <div style={{ paddingTop: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="_title_m">Tr???ng th??i ????n h??ng:</p>
            <p className="_title_m">Ng??y: {data?.createdAt?.slice(0, -14)}</p>
          </div>
          <Steps
            current={curent === undefined ? data?.status : curent}
            // onChange={onStepsChange}
            size="small"
            type="default"
          >
            <Step
              title="????n h??ng"
              description="Ch??? x??c nh???n"
              onStepClick={Showmodal}
              disabled={disabled}
            />
            <Step
              title="????n h??ng"
              description="??ang x??? l??"
              onStepClick={Showmodal}
              disabled={disabled1}
            />

            <Step
              title="????n h??ng"
              description="??ang v???n chuy???n"
              onStepClick={Showmodal}
              disabled={disabled2}
            />
            <Step
              title="????n h??ng"
              description="Ho??n th??nh "
              onStepClick={Showmodal}
              disabled={disabled3}
            />
          </Steps>
        </div>

        <Modal
          title="C???nh b??o !"
          visible={isModal}
          footer={null}
          closable={false}
        >
          <p>B???n c?? ch???c ch???n mu???n x??c nh???n ????n h??ng n??y</p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <button
              style={{
                backgroundColor: "#fff",
                border: "1px solid #000",
                margin: 10,
                padding: " 8px 16px",
                borderRadius: 3,
              }}
              onClick={handleHuy}
            >
              Hu???
            </button>
            <button
              style={{
                backgroundColor: "red",
                border: "1px solid #000",
                margin: 10,
                padding: " 8px 16px",
                color: "#fff",
                borderRadius: 3,
              }}
              onClick={handleXacnhan}
            >
              ?????ng ??
            </button>
          </div>
        </Modal>
        <hr />
        <div style={{ display: "flex" }}>
          <p className="_title_m">Th??ng tin kh??ch h??ng:</p>
          <p className="_title_c">
            {data?.firstName} {data?.lastName}
          </p>
          <p className="_title_c">{data?.numberPhone}</p>
          {/* <div className="_all_d"> */}
          <p className="_title_c">{data?.fullAddress},</p>

          <p className="_title_c">{data?.commune},</p>

          <p className="_title_c">{data?.district},</p>

          <p className="_title_c">{data?.cityProvince},</p>
          {/* </div> */}
          <p className="_title_c">M?? b??u ??i???n: {data?.codeZip}</p>
        </div>
        <div style={{ display: "flex" }}>
          <p className="_title_m">H??nh th???c thanh to??n:</p>
          <p className="_title_c">{data?.payment}</p>
        </div>
        <hr />

        <p className="_title_m">Th??ng tin s???n ph???m ????n h??ng</p>

        {/* th??ng tin ????n h??ng */}
        {dataall?.map((item) => {
          return (
            <>
              <div className="_all_m">
                <div className="_all_m">
                  <img
                    src={item?.imageProduct}
                    alt=""
                    style={{ width: 30, height: 45 }}
                  />

                  <div style={{ marginTop: 15, width: 500 }}>
                    <p className="_title_l"> M?? s???n ph???m: {item?.code}</p>
                    <p className="_title_l">
                      T??n s???n ph???m: {item?.titleProduct}
                    </p>
                  </div>
                </div>

                <div style={{ textAlign: "left" }}>
                  <div style={{ display: "flex", paddingTop: -20 }}>
                    <p className="_title_l">Size: {item?.sizeProduct}</p>
                    <p className="_title_l">M??u: </p>
                    <p
                      style={{
                        width: 15,
                        height: 15,
                        marginTop: 5,
                        marginLeft: 10,
                        background: item?.colorProduct,
                        border: "1px solid black",
                      }}
                    ></p>
                  </div>
                  <p className="_title_l">Th????ng hi???u: {item?.trademark}</p>
                </div>

                <div
                  style={{
                    textAlign: "center",
                  }}
                >
                  <p className="_title_l">x{item?.quantity}</p>
                  <p className="_title_l">
                    {item?.price
                      .toString()
                      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
                    vn??
                  </p>
                </div>
              </div>
              {/* <hr style={{ width: "70%", paddingBottom: 10 }} /> */}
            </>
          );
        })}
        <hr />
        <div className="_all_m">
          <p className=" _title_m">Ph?? ship :</p>
          <span className="_title_lss">
            {shipCode?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
            vn??
          </span>
        </div>
        <div className="_all_m">
          <p className=" _title_m">Th??nh ti???n :</p>
          <span className="_title_ls">
            {tongTien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}
            vn??
          </span>
        </div>
      </div>
      <Link to={"/shop/khachHang_DatHang"} style={{display:'flex' , justifyContent:'flex-end'}} >
        <Button
        style={{
          margin: "0 30px 0 0",
          backgroundColor: "#D9D9D9",
          border: "1px solid #D9D9D9 ",
        }}
        >Xong</Button>
      </Link>
    </div>
  );
}

export default InforBillOder;
