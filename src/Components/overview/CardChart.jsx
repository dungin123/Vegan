import { Card, Select } from "antd";
import React from "react";
import Chart from "./Chart";
const { Option } = Select;
const CardChart = (props) => (
  <>
    <Card
      title={props.title}
      
      style={{
        width: '100%',
        fontFamily:'initial'
      }}
    >
      <Chart data={props?.datas}/>
    </Card>
  </>
);

export default CardChart;
