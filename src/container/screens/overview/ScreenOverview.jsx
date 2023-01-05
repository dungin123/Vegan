import React, { useEffect, useState } from "react";
import Row from "../../../Components/overview/Row";
import img_tds from "../../../Common/Image/img_tds.png";
import img_tcp from "../../../Common/Image/img_tcp.png";
import img_spbc from "../../../Common/Image/img_spbc.png";
import styles from "./stylesrow.module.css";
import CardChart from "../../../Components/overview/CardChart";
import { useDispatch, useSelector } from "react-redux";
import { getAllloinhuan, getAllsum } from "../../../API/StatisticalApi";
import CardStatid from "../../../Components/statils/CardStatid";
import { getimportPriceSlice } from "../../../Redux/importPriceSlice";
import { getexportPriceSlice } from "../../../Redux/exportPriceSlice";
import { gettongDonhang } from "../../../Redux/tongDonhang";
import { gettongDonhangdagiao } from "../../../Redux/tongDonhangdagiao";
import { gettongDonhangdanggiao } from "../../../Redux/tongDonhangdanggiao";
import { gettongDonhangdangxuLy } from "../../../Redux/tongDonhangdangxuLy";
import { gettongDonhangchoxacnhan } from "../../../Redux/tongDonhangchoxacnhan";
import { getTongsanPhambanduoc } from "../../../Redux/TongsanPhambanduoc";
import { getTongloiNhuan } from "../../../Redux/TongloiNhuan";
import { gettongsanphamNhap } from "../../../Redux/SanphamNhapHang";
import { getsanphamHethang } from "../../../Redux/SanphamHeth";
import { getsanphamConhang } from "../../../Redux/SanpConhang";
import { mToken } from "../../../../token/TokenLogin";
import { getProduct } from "../../../Redux/ProductSlice";

const ScreenOverview = () => {
  // const [dataSum, setDataSum] = useState();
  const [data, setData] = useState(null);
  //tổng giá trị mặc định
  const price = (100000000)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const importsPrice = useSelector((data) => data.importPrice.value);
  const exportPrices = useSelector((data) => data.exportPrice.value);
  const dataallbill = useSelector((data) => data.allbill.value);
  const billComplete = useSelector((data) => data.allbillcomplete.value);
  const vanchuyen = useSelector((data) => data.danggiao.value);
  const xulyly = useSelector((data) => data.dangxuly.value);
  const choxacnhannhan = useSelector((data) => data.choxacnhan.value);
  const sanphambanduoc = useSelector((data) => data.tongSP.value);
  const tongLN = useSelector((data) => data.loinhuan.value);
  const Tspnhap = useSelector((data) => data.tongnhapsanpham.value);
  const TsPcon = useSelector((data) => data.conhang.value);
  const hethang = useSelector((data) => data.hethang.value);

  useEffect(() => {
    try {
      if (!user) {
        navigation("/");
      } else {
        setData(user.user);
      }
    } catch (error) {
      console.log("err");
    }

    dispatch(getexportPriceSlice());

    dispatch(getimportPriceSlice());

    dispatch(gettongDonhangdagiao());

    dispatch(gettongDonhangdanggiao());

    dispatch(gettongDonhangdangxuLy());

    dispatch(gettongDonhangchoxacnhan());

    dispatch(getTongsanPhambanduoc());

    dispatch(gettongDonhang());

    dispatch(getsanphamHethang());

    dispatch(getsanphamConhang());

    dispatch(gettongsanphamNhap());

    dispatch(getTongloiNhuan());
  }, []);
  const dataProduct = useSelector((data) => data.product.value);
  useEffect(() => {
    dispatch(getProduct());
  }, []);
  // console.log(dataProduct.length);
  console.log(TsPcon);
  //tổng tiền bán được
  const priceSel = exportPrices
    ?.map((item) => item?.count)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  const phantramsel = (parseInt(priceSel) / parseInt(price)) * 100;
  // tổng tiền nhập
  const priceImport = importsPrice
    ?.map((item) => item?.count)
    .toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  const phantramimport = (parseInt(priceImport) / parseInt(price)) * 100;

  const sumloinhuan = tongLN
    ?.toString()
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  const phantramloinhuan = (parseInt(sumloinhuan) / parseInt(price)) * 100;

  const datas = [
    { type: "Sản phẩm còn ", value: TsPcon === null ? 0 : parseInt(TsPcon) },
    { type: "Sản phẩm hết ", value: hethang === null ? 0 : parseInt(hethang) },
  ];
  const nhapxuat = [
    {
      type: "Sản phẩm bán ",
      value:
        (sanphambanduoc?.map((item) => item?.count)).length === 0
          ? 0
          : parseInt(sanphambanduoc?.map((item) => item?.count)),
    },
    { type: "Sản phẩm nhập ", value: parseInt(Tspnhap) },
  ];
  const datadon = [
    { number: dataallbill, name: "Tổng hóa đơn" },
    { number: billComplete, name: "Tổng hóa đơn đã giao " },
    { number: vanchuyen, name: "Tổng hóa đơn đang vận chuyển" },
    { number: xulyly, name: "Tổng hóa đơn đang xử lý" },
    { number: choxacnhannhan, name: "Tổng hóa đơn chờ xác nhận" },
  ];
  return (
    <div className={styles.mContainer_ovew}>
      <div className={styles.container_item}>
        <div>
          <p className={styles.text_content}>
            {"Chào " + data?.userName + ", Ngày mới tốt lành"}
          </p>
          {/* <div style={{ alignItems:'center', justifyContent:'center'}}>
          <DateSelect />
        </div> */}
        </div>
        <div className={styles.row_container}>
          <div className={styles.row}>
            <Row
              img_ic={img_tds}
              title={"Lợi nhuận"}
              number={tongLN <= 0 ? 0 + " vnđ" : sumloinhuan + " vnđ"}
              color={"#87CEEB"}
              percent={parseInt(phantramloinhuan)}
            />
          </div>
          <div className={styles.row}>
            <Row
              img_ic={img_tcp}
              title={"Chi phí nhập"}
              number={
                importsPrice.length === 0 ? 0 + " vnđ" : priceImport + " vnđ"
              }
              color={"#FF69B4"}
              percent={parseInt(phantramimport)}
            />
          </div>
          <div>
            <Row
              img_ic={img_spbc}
              title={"Doanh thu bán"}
              number={
                exportPrices.length === 0 ? 0 + " vnđ" : priceSel + " vnđ"
              }
              color={"#DDA0DD"}
              percent={parseInt(phantramsel)}
            />
          </div>
        </div>
      </div>
      <div className={styles.chartov}>
        <div>
          <CardStatid title={"Biểu đồ thống kê sản phẩm"} datas={datas} />
        </div>
        <div>
          <CardStatid title={"Biểu đồ thống kê nhập xuất"} datas={nhapxuat} />
        </div>
      </div>
      <div style={{ margin: 30 }}>
        <CardChart datas={datadon} />
      </div>
    </div>
  );
};

export default ScreenOverview;
