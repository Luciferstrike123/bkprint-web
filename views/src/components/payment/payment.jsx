import React, { useContext, useEffect, useState } from "react";
import "./payment.css";
import { Button } from "react-bootstrap";
import Header from "../../utils/header";
import Footer from "../../utils/footer";
import { useSnackbar } from "notistack";
import { getStudentTransactionHistory } from "../../../../controllers/student/getFromStudent";
import { updateTransactionHistory } from "../../../../controllers/student/updateStudent";
import { UserContext } from "../../../../controllers/UserProvider";
import { useNavigate } from "react-router-dom";
import { getStudentRemainingPages } from "../../../../controllers/student/getFromStudent";
import { updateRemainingPages } from "../../../../controllers/student/updateStudent";
const Payment = () => {
  const { stdID, convertTime } = useContext(UserContext);
  const [chosenPaperType, setChosenPaperType] = useState("");
  const [pageNum, setPageNum] = useState(0);
  const [totalMoney, setTotalMoney] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const handleConfirmTransaction = async () => {
    let oldList = await getStudentTransactionHistory(parseInt(stdID));
    console.log(oldList);
    const newItem = {
      time: await convertTime(),
      price: totalMoney,
      purchasedPages: pageNum,
      purchasedPaperType: chosenPaperType,
    };
    if (chosenPaperType == "") {
      enqueueSnackbar("Vui lòng chọn loại giấy bạn muốn mua", {
        variant: "error",
      });
    } else if (pageNum == 0) {
      enqueueSnackbar("Vui lòng nhập số tờ bạn muốn mua", {
        variant: "error",
      });
    } else {
      oldList.push(newItem);
      await updateTransactionHistory(parseInt(stdID), oldList);
      enqueueSnackbar("Thanh toán thành công", { variant: "success" });
      let addedPagesNum = 0;
      const recentRM = await getStudentRemainingPages(parseInt(stdID));
      if (chosenPaperType[1] == "3") {
        await updateRemainingPages(parseInt(stdID), recentRM + 2 * pageNum);
      } else if (chosenPaperType[1] == "4") {
        await updateRemainingPages(parseInt(stdID), recentRM + pageNum);
      } else if (chosenPaperType[1] == "5") {
        await updateRemainingPages(parseInt(stdID), recentRM + 0.5 * pageNum);
      }
    }
  };

  useEffect(() => {
    let money = 0;
    if (chosenPaperType.includes("A3")) {
      money = 1000 * pageNum;
    } else if (chosenPaperType.includes("A4")) {
      money = 500 * pageNum;
    } else if (chosenPaperType.includes("A5")) {
      money = 250 * pageNum;
    }
    setTotalMoney(`${money} VND`);
  }, [pageNum, chosenPaperType]);

  return (
    <div className="paymentContainer">
      <Footer></Footer>
      <Header></Header>
      <div className="paymentIntro">Cổng thanh toán BKPrint</div>
      <div className="paymentNotice">
        Số giấy in của bạn không đủ để in. Hãy mua thêm tại đây
      </div>
      <table className="paymentTable">
        <tr className="huhu">
          <th className="huhu1">Lưu ý</th>
          <th className="huhu1">Tùy chọn mua</th>
        </tr>
        <tr className="huhu">
          <td className="huhu2">
            <div className="zero">
              <li>Giá giấy A3: 1000đ/tờ.</li>
              <li>Giá giấy A4: 500đ/tờ.</li>
              <li>Giá giấy A5: 250đ/tờ.</li>
              <li>Số lượng mua tối thiểu: 10 tờ.</li>
              <li>Số tờ mua phải là SỐ CHẴN.</li>
              <li>Nếu giao dịch không thành công, hãy THỬ LẠI.</li>
              <li>
                Nếu bỏ qua bước mua thêm giấy, mọi thao tác in của bạn sẽ bị HỦY
                BỎ.
              </li>
            </div>
          </td>
          <td className="huhu2">
            <div className="zero2">
              <span className="huhu2Tex">Loại giấy</span>
              <select
                className="huhu2Select"
                onChange={(e) => setChosenPaperType(e.target.value)}
              >
                <option value="">Chọn loại giấy</option>
                <option value="A3 (297 x 420)mm">A3 (297 x 420)mm</option>
                <option value="A4 (210 x 297)mm">A4 (210 x 297)mm</option>
                <option value="A5 (148 x 210)mm">A5 (148 x 210)mm</option>
              </select>
              <span className="huhu2Tex1">Số tờ</span>
              <input
                className="huhu2Input"
                type="number"
                min={10}
                onChange={(e) => {
                  setPageNum(e.target.value);
                  handleGetTotalMoney();
                }}
              />
              <br />
              <span className="huhu2Tex2">Thành tiền</span>
              <textarea className="bubu" readOnly={true} value={totalMoney} />
              <Button
                className="paymentDone"
                onClick={() => handleConfirmTransaction()}
              >
                Thanh toán
              </Button>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default Payment;