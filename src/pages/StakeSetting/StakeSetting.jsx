import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useEditButtonValuesMutation } from "../../redux/features/events/events";
import { useNavigate } from "react-router-dom";
import assets from "../../assets";
import { useState } from "react";
import useLanguage from "../../hooks/use-language";
import { LanguageKey } from "../../const";

const StakeSetting = () => {
  const { getLanguage } = useLanguage();
  const [editButtonValue] = useEditButtonValuesMutation();
  const navigate = useNavigate();
  const buttonGameValues = JSON.parse(localStorage.getItem("buttonValue"));
  const [stake, setStake] = useState(buttonGameValues);
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    const buttonValue = stake?.map((s) => ({
      label: 100,
      value: parseInt(s.value),
    }));

    const payload = {
      game: buttonValue,
    };

    const res = await editButtonValue(payload).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      localStorage.removeItem("buttonValue");
      const gameButtonsValues = buttonValue;
      /* set edited button values */
      localStorage.setItem("buttonValue", JSON.stringify(gameButtonsValues));
      navigate("/");
    }
  };

  const handleIncreaseDecrease = (type, value, index) => {
    if (value > 1 || type === "plus") {
      setStake((prevValues) => {
        const updatedValues = [...prevValues];
        updatedValues[index].value =
          type === "plus" ? Math.floor(value * 2) : Math.floor(value / 2);
        return updatedValues;
      });
    }
  };

  return (
    <div className="md hydrated">
      <div slot="fixed" className="md refresher-md hydrated refresher-native">
        <div className="md hydrated">
          <div className="refresher-pulling">
            <div className="refresher-pulling-icon">
              <div className="spinner-arrow-container">
                <ion-spinner
                  className="md spinner-circular spinner-paused hydrated"
                  role="progressbar"
                  style={{ animationDuration: "1400ms" }}
                />
                <div className="arrow-container">
                  <ion-icon
                    role="img"
                    className="md hydrated"
                    aria-label="caret back sharp"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="refresher-refreshing">
            <div className="refresher-refreshing-icon">
              <ion-spinner
                className="md spinner-circular hydrated"
                role="progressbar"
                style={{
                  animationDuration: "1400ms",
                  animationDelay: "-655ms",
                }}
              />
            </div>
          </div>{" "}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="router-ctn">
        <div className="button-variables-ctn">
          <div className="stake-settings">
            <div className="report-header">
              <div className="report-img-title">
                <div className="report-img-div-title">
                  <div className="report-img-div">
                    <svg
                      width={12}
                      height={12}
                      viewBox="0 0 12 12"
                      fill="none"
                      className="report-img"
                    >
                      <g clipPath="url(#clip0_900_5518)">
                        <path
                          d="M6 7.5C6.82845 7.5 7.5 6.82845 7.5 6C7.5 5.17155 6.82845 4.5 6 4.5C5.17155 4.5 4.5 5.17155 4.5 6C4.5 6.82845 5.17155 7.5 6 7.5Z"
                          stroke="currentColor"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M1 6.44068V5.56068C1 5.04068 1.425 4.6107 1.95 4.6107C2.855 4.6107 3.225 3.9707 2.77 3.1857C2.51 2.7357 2.665 2.1507 3.12 1.8907L3.985 1.3957C4.38 1.1607 4.89 1.3007 5.125 1.6957L5.18 1.7907C5.63 2.5757 6.37 2.5757 6.825 1.7907L6.88 1.6957C7.115 1.3007 7.625 1.1607 8.02 1.3957L8.885 1.8907C9.34 2.1507 9.495 2.7357 9.235 3.1857C8.78 3.9707 9.15 4.6107 10.055 4.6107C10.575 4.6107 11.005 5.03568 11.005 5.56068V6.44068C11.005 6.96068 10.58 7.39068 10.055 7.39068C9.15 7.39068 8.78 8.03068 9.235 8.81568C9.495 9.27068 9.34 9.85068 8.885 10.1107L8.02 10.6057C7.625 10.8407 7.115 10.7007 6.88 10.3057L6.825 10.2107C6.375 9.42568 5.635 9.42568 5.18 10.2107L5.125 10.3057C4.89 10.7007 4.38 10.8407 3.985 10.6057L3.12 10.1107C2.665 9.85068 2.51 9.26568 2.77 8.81568C3.225 8.03068 2.855 7.39068 1.95 7.39068C1.425 7.39068 1 6.96068 1 6.44068Z"
                          stroke="currentColor"
                          strokeMiterlimit={10}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_900_5518">
                          <rect width={12} height={12} fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                  <div className="report-title">
                    {getLanguage(LanguageKey.STAKE_SETTINGS)}
                  </div>
                </div>
                <div className="tab-btns">
                  <button className="tab-btn black-font">
                    {getLanguage(LanguageKey.SAVE)}
                  </button>
                </div>
              </div>
              <div className="report-filters rh-web-view">
                <div className="text">
                  Change your input variable and label setting:
                </div>
              </div>
              <div className="report-filters rh-mob-view">
                <div className="two-filters">
                  <div className="text">
                    Change your input variable and label setting:
                  </div>
                </div>
              </div>
            </div>
            <div className="stake-settings-ctn">
              {stake?.map((item, i) => {
                return (
                  <div key={i} className="indv-stake-btn">
                    <div className="label-number">
                      <div className="label-text-sub">
                        {getLanguage(LanguageKey.STAKE_VALUE)}
                      </div>
                      <div className="support-add-stake-input">
                        <div className="add-stake-input">
                          <div
                            onClick={() =>
                              handleIncreaseDecrease("plus", item.value, i)
                            }
                            className="plus-div"
                          >
                            <img
                              style={{ height: "15px", background: "none" }}
                              className="plus-btn"
                              src={assets.plus}
                              alt=""
                            />
                          </div>
                          <input
                            onChange={(e) =>
                              setStake((prevValues) =>
                                prevValues.map((item, index) =>
                                  index === i
                                    ? { ...item, value: e.target.value }
                                    : item,
                                ),
                              )
                            }
                            type="number"
                            className="bt-input width"
                            value={item?.value}
                          />
                          <div
                            onClick={() =>
                              handleIncreaseDecrease("minus", item.value, i)
                            }
                            className="minus-div"
                          >
                            <img
                              className="minus-btn"
                              src={assets.minus}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StakeSetting;
