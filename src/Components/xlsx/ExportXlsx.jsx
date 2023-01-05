import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
function ExportXlsx() {
  const dispatch = useDispatch();
const typeproduct = useSelector((data) => data.typeproduct.value);
  return (
    <section className="py-4 container">
      <div className="row justify-content-center">
        <table className="table table-striped" id="Export_xlsx">
          <thead>
            <tr>
              <td>STT</td>
              <td>name</td>
            </tr>
          </thead>
          <tbody>
            {typeproduct.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{item.titleTypeProduct}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ReactHTMLTableToExcel className="btn btn-info"
        table="Export_xlsx"
        filename="Fashion"
        sheet="Sheet"
        buttonText="Export to excel"
        />
      </div>
    </section>
  );
}

export default ExportXlsx;
