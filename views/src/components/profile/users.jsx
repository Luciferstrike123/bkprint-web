import React from "react";
import "./users.css";
import logo2 from "../../assets/oisp-official-logo01-1@2x.png";
import logo3 from "../../assets/container.png";
import profileImg from "../../assets/N 1.png";
import { useNavigate } from "react-router-dom";
import Header from "../../utils/header";
import Footer from "../../utils/footer";
import { useState } from "react";
import {
  getStudentEmail,
  getStudentFaculty,
  getStudentName,
  getStudentRemainingPages,
} from "../../../../controllers/student/getFromStudent";
import { useContext } from "react";
import { UserContext } from "../../../../controllers/UserProvider";
let printHistory = [
  {
    time: "",
    fileName: "",
    quantity: "",
    place: "",
    status1: "",
  },
  { time: "", fileName: "", quantity: "", place: "", status1: "" },
  { time: "", fileName: "", quantity: "", place: "", status1: "" },
];
let buyHistory = [
  { times: "", amount: "", quantity1: "" },
  { times: "", amount: "", quantity1: "" },
  { times: "", amount: "", quantity1: "" },
];
const Users = () => {
  const [A3Printed, setA3Printed] = useState(0);
  const [A4Printed, setA4Printed] = useState(0);
  const [A5Printed, setA5Printed] = useState(0);
  const [printingHistory, setPrintingHistory] = useState([]);
  const [transactionHistory, setTransactionHistory] = useState([]);

  const { stdID } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="userContainer">
      <Footer></Footer>
      <Header></Header>
      <img className="profileImg" src={profileImg} alt="" />
      <div className="information">
        <span className="texx">{getStudentName(parseInt(stdID))}</span>
        <span className="ID">stdID</span>
        <span
          className="logout"
          onClick={() => navigate("/Choose/Login1/Home")}
        >
          Thoát
        </span>
      </div>
      <div className="info2">
        <div className="mail1">Địa chỉ email</div>
        <div className="mail2">{getStudentEmail(parseInt(stdID))}</div>
        <div className="falcuty1">Ngành học</div>
        <div className="falcuty2">{getStudentFaculty(parseInt(stdID))}</div>
      </div>
      <hr className="firstBreak" />
      <div className="printHis">
        <span className="printHisTex">Lịch sử in</span>
        <span className="datePrint">Từ ngày ../../... đến ngày ../../....</span>
      </div>
      <table className="printHis1">
        <tr className="row">
          <tr className="row">
            <th className="hea">Thời gian</th>
            <th className="hea">Tên file</th>
            <th className="hea">Số tờ</th>
            <th className="hea">Địa điểm</th>
            <th className="hea">Trạng thái</th>
          </tr>
          {printHistory.map((val, key) => {
            return (
              <tr className="row" key={key}>
                <td className="dat">{val.time}</td>
                <td className="dat">{val.fileName}</td>
                <td className="dat">{val.quantity}</td>
                <td className="dat">{val.place}</td>
                <td className="dat">{val.status1}</td>
              </tr>
            );
          })}
        </tr>
      </table>
      <div className="sum1">
        <span>Số tờ </span>
        <div className="sum1Tex">
          A3 đã in: <br />
          A4 đã in:
          <br />
          A5 đã in:
        </div>
      </div>
      <hr className="secondBreak" />
      <div className="buyHis">
        <span className="buyHisTex">Lịch sử mua</span>
        <span className="datePrint">Từ ngày ../../... đến ngày ../../....</span>
      </div>
      <table className="buyHis1">
        <tr className="row1">
          <tr className="row1">
            <th className="hea1">Thời gian</th>
            <th className="hea1">Số tiền</th>
            <th className="hea1">Số tờ</th>
          </tr>
          {buyHistory.map((val, key) => {
            return (
              <tr className="row1" key={key}>
                <td className="dat1">{val.times}</td>
                <td className="dat1">{val.amount}</td>
                <td className="dat1">{val.quantity1}</td>
              </tr>
            );
          })}
        </tr>
      </table>
      <span className="sum2">
        Số tờ còn lại: {getStudentRemainingPages(parseInt(stdID))}(A4)
      </span>
    </div>
  );
};

export default Users;
