import { useRef } from "react";
import useCloseModalClickOutside from "../../hooks/useCloseModalClickOutside";

const Ladder = ({ setLadderData, ladderData, eventName }) => {
  const ladderRef = useRef();
  useCloseModalClickOutside(ladderRef, () => {
    setLadderData([]);
  });
  return (
    <div
      role="presentation"
      className="MuiDialog-root fancy-book-dialog"
      style={{
        position: "fixed",
        zIndex: 999999999,
        inset: "0px",
      }}
    >
      <div
        className="MuiBackdrop-root"
        aria-hidden="true"
        style={{
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      ></div>
      <div data-test="sentinelStart"></div>
      <div
        className="MuiDialog-container MuiDialog-scrollPaper"
        role="none presentation"
        style={{
          opacity: 1,
          transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1)",
          background: "#000000ba",
        }}
      >
        <div
          ref={ladderRef}
          className="MuiPaper-root MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm MuiDialog-paperFullScreen MuiDialog-paperFullWidth MuiPaper-elevation24 MuiPaper-rounded"
          role="dialog"
          aria-labelledby="responsive-dialog-title"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
            className="MuiDialogTitle-root modal-title"
            id="responsive-dialog-title"
          >
            <h2 className="MuiTypography-root MuiTypography-h6">Book List</h2>
            <button
              style={{ padding: "0px" }}
              onClick={() => setLadderData([])}
              className="MuiButtonBase-root MuiIconButton-root dark-colose-btn modal-close-btn"
              type="button"
              aria-label="close"
            >
              <span className="MuiIconButton-label">
                <svg
                  className="MuiSvgIcon-root"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </span>
              <span className="MuiTouchRipple-root"></span>
            </button>
          </div>

          <div className="MuiDialogContent-root modal-content-ctn">
            <div className="fancy-book-table-ctn">
              <div className="MuiPaper-root MuiTableContainer-root MuiPaper-elevation1 MuiPaper-rounded">
                <table
                  style={{ width: "100%" }}
                  className="MuiTable-root fancy-book-table"
                >
                  <thead className="MuiTableHead-root">
                    <tr className="MuiTableRow-root MuiTableRow-head">
                      <th
                        className="MuiTableCell-root MuiTableCell-head"
                        scope="col"
                      >
                        {eventName}
                      </th>
                      <th
                        className="MuiTableCell-root MuiTableCell-head"
                        scope="col"
                      >
                        Profit/Loss
                      </th>
                    </tr>
                  </thead>
                  <tbody className="MuiTableBody-root">
                    {ladderData?.map((item, i) => {
                      return (
                        <tr className="MuiTableRow-root" key={i}>
                          <td className="MuiTableCell-root MuiTableCell-body">
                            {" "}
                            {item?.start}-{item?.end}
                          </td>
                          <td
                            className={`MuiTableCell-root MuiTableCell-body   ${
                              item?.exposure > 0 ? "profit" : "loss"
                            }`}
                          >
                            {item?.exposure}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div data-test="sentinelEnd"></div>
    </div>
  );
};

export default Ladder;
