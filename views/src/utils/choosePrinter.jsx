import React, { useContext } from "react";
import "./choosePrinter.css";
import { useState, useEffect } from "react";
import { Button } from "antd";
import { UserContext } from "../../../controllers/UserProvider";
import {
  getPrinterCount,
  getPrinterName,
  getPrinterBuilding,
  getPrinterRoom,
  getPrinterStatus,
} from "../../../controllers/printer/getPrinter";
import { useNavigate } from "react-router-dom";
const ChoosePrinter = (props) => {
  const {
    chosenPrinter,
    setChosenPrinter,
    printingLocation,
    setPrintingLocation,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const [printerList, setPrinterList] = useState([]);
  useEffect(() => {
    async function fetchPrinterData() {
      const printerNum = await getPrinterCount();
      const promises = [];
      for (let i = 0; i < printerNum; i++) {
        const check = await getPrinterStatus(i);
        if (check == false) {
          console.log(check);
          continue;
        }
        const name = await getPrinterName(i);
        const room = await getPrinterRoom(i);
        const building = await getPrinterBuilding(i);

        const location = room + "" + building;
        promises.push({
          name: name,
          location: location,
        });
      }
      setPrinterList(promises);
    }
    fetchPrinterData();
  }, []);

  const handleRadioChange = (event) => {
    const [selectedPrinter, selectedLocation] = event.target.value.split("###");
    setChosenPrinter(selectedPrinter);
    setPrintingLocation(selectedLocation);
  };

  return (
    <div className="chooseP">
      <h2 className="chooseTitle">Chọn máy in </h2>
      <p className="instruc1">(Chỉ chọn MỘT máy in)</p>
      <div className="table-container">
        <table className="choosePrinters">
          <tr>
            <th>Kiểu máy</th>
            <th>Phòng</th>
            <th>Chọn</th>
          </tr>
          {printerList.map((val, key) => (
            <tr key={key}>
              <td>{val.name}</td>
              <td>{val.location}</td>
              <td>
                <div class="custom-radio">
                  <input
                    type="radio"
                    id={`radio${key}`}
                    name="options"
                    value={`${val.mod}###${val.room}`}
                    onChange={(e) => handleRadioChange(e)}
                  />
                  <label htmlFor={`radio${key}`}></label>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className="checkLocate">Xem vị trí máy in</div>
      <div className="btn-container">
        <Button id="finish" onClick={props.onClick} block>
          {props.text}
        </Button>
      </div>
    </div>
  );
};

export default ChoosePrinter;
