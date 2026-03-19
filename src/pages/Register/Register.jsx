import assets from "../../assets";
import { useDispatch } from "react-redux";
import {
  useGetOtpMutation,
  useRegisterMutation,
} from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";

import { settings } from "../../api";

import { setUser } from "../../redux/features/auth/authSlice";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useBalance from "../../hooks/useBalance";
import { useState } from "react";
import { navigateTelegramInstagram } from "../../utils/navigateTelegramInstagram";
import useContextState from "../../hooks/useContextState";

const Register = () => {
  const { logo } = useContextState();
  const navigate = useNavigate();
  const { refetchBalance } = useBalance();
  // const [passType, setPassType] = useState(true);
  // const [confirmPassType, setConfirmPassType] = useState(true);
  const dispatch = useDispatch();
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});
  const [getOTP] = useGetOtpMutation();
  const [handleRegister] = useRegisterMutation();
  const { register, handleSubmit } = useForm();

  const handleMobileInputChange = (e) => {
    if (e.target.value.length <= 10) {
      setMobile(e.target.value);
    }
  };
  const handleOTP = async () => {
    const otpData = {
      mobile,
    };

    const res = await getOTP(otpData).unwrap();
    if (res?.success) {
      setOTP({
        orderId: res?.result?.orderId,
        otpMethod: "sms",
      });
      toast.success(res?.result?.message);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  const onSubmit = async (data) => {
    const registerData = {
      username: "",
      password: data?.password,
      confirmPassword: data?.confirmPassword,
      mobile: mobile,

      otp: data?.otp,
      isOtpAvailable: settings.otp,
      // referralCode: data?.referralCode,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleRegister(registerData).unwrap();
    if (result.success) {
      const token = result?.result?.token;
      const bonusToken = result?.result?.bonusToken;
      const user = result?.result?.loginName;
      const game = result?.result?.buttonValue?.game;
      dispatch(setUser({ user, token, bonusToken }));
      localStorage.setItem("token", token);
      localStorage.setItem("buttonValue", JSON.stringify(game));
      if (token && user) {
        refetchBalance();
        toast.success("Register successful");
        navigate("/");
      }
    } else {
      toast.error(result?.error?.description);
    }
  };
  return (
    <div className="login-ctn">
      <div className="title-row">
        <img
          onClick={() => navigate("/")}
          src={logo}
          style={{
            height: settings.logo_height,
            width: settings.logo_width,
            objectFit: "contain",
          }}
          alt="website"
          className="logo"
        />
      </div>
      <div className="login-card">
        <div className="login-form-page">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form-ctn">
            <div className="back-icon">
              <div
                className="back"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(-1)}
              >
                <svg
                  className="MuiSvgIcon-root arrow-clr"
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
                </svg>
                <span className="back-text">Back</span>
              </div>
              <div className="demo">
                <button
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained login-form-btn-demo MuiButton-containedPrimary"
                  type="button"
                >
                  <span className="MuiButton-label">Demo Login</span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </div>
            </div>
            <div className="card-title">Sign Up</div>
            <span className="card-login-here">
              Please enter your register details here.
            </span>
            <span className="usr-input">
              <span className="input-labell sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                Mobile No <span className="red-text">*</span>
              </span>
              <div
                className="MuiFormControl-root MuiTextField-root login-input-field user-name"
                style={{ position: "relative" }}
              >
                <div
                  style={{ padding: "0px", height: "100%" }}
                  className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl"
                >
                  <input
                    maxLength={10}
                    onChange={(e) => handleMobileInputChange(e)}
                    style={{
                      padding: "0px 5px",
                      width: "100%",
                      height: "100%",
                    }}
                    aria-invalid="false"
                    name="username"
                    placeholder="username"
                    type="text"
                    className="MuiInputBase-input MuiOutlinedInput-input"
                    value={mobile}
                  />
                </div>
                <button
                  onClick={handleOTP}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "10px",
                    background: "var(--custom-btn-bg-variant-2)",
                    borderRadius: "2px",
                    padding: "1px 2px",
                  }}
                  className="MuiButtonBase-root MuiButton-root MuiButton-contained login-form-btn-demo MuiButton-containedPrimary"
                  type="button"
                >
                  <span
                    className="MuiButton-label"
                    style={{ fontSize: "12px", color: "white" }}
                  >
                    Get OTP
                  </span>
                  <span className="MuiTouchRipple-root"></span>
                </button>
              </div>
            </span>
            <span className="usr-input">
              <span className="input-labell sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                OTP <span className="red-text">*</span>
              </span>
              <div className="MuiFormControl-root MuiTextField-root login-input-field user-name">
                <div
                  style={{ padding: "0px", height: "100%" }}
                  className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl"
                >
                  <input
                    style={{
                      padding: "0px 5px",
                      width: "100%",
                      height: "100%",
                    }}
                    {...register("otp", { required: true })}
                    aria-invalid="false"
                    placeholder="username"
                    type="text"
                    className="MuiInputBase-input MuiOutlinedInput-input"
                  />
                </div>
              </div>
            </span>

            <div className="pwd-input">
              <span className="input-labell sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                Password <span className="red-text">*</span>
              </span>
              <div className="MuiFormControl-root login-input-field pwd-field">
                <div
                  style={{ padding: "0px", height: "100%" }}
                  className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd"
                >
                  <input
                    style={{
                      padding: "0px 5px",
                      width: "100%",
                      height: "100%",
                    }}
                    {...register("password", { required: true })}
                    aria-invalid="false"
                    id="standard-adornment-password"
                    placeholder="password"
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                    type="password"
                  />
                  {/* <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                    <button
                      className="MuiButtonBase-root MuiIconButton-root"
                      type="button"
                      aria-label="toggle password visibility"
                    >
                      <span className="MuiIconButton-label">
                        <svg
                          className="MuiSvgIcon-root"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                        </svg>
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="pwd-input">
              <span className="input-labell sc-ion-label-md-h sc-ion-label-md-s md hydrated">
                Confirm Password <span className="red-text">*</span>
              </span>
              <div className="MuiFormControl-root login-input-field pwd-field">
                <div
                  style={{ padding: "0px", height: "100%" }}
                  className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd"
                >
                  <input
                    style={{
                      padding: "0px 5px",
                      width: "100%",
                      height: "100%",
                    }}
                    {...register("confirmPassword", { required: true })}
                    aria-invalid="false"
                    id="standard-adornment-password"
                    placeholder="password"
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                    type="password"
                  />
                  {/* <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                    <button
                      className="MuiButtonBase-root MuiIconButton-root"
                      type="button"
                      aria-label="toggle password visibility"
                    >
                      <span className="MuiIconButton-label">
                        <svg
                          className="MuiSvgIcon-root"
                          focusable="false"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                        </svg>
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="login-demologin-btns">
              <button
                className="MuiButtonBase-root MuiButton-root MuiButton-contained login-form-btn MuiButton-containedPrimary"
                type="submit"
              >
                <span className="MuiButton-label">Register</span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>
          </form>
          <div className="account-SignUp">
            <div className="account-dontHaveAccount">
              Already have an account?
            </div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/login")}
              className="back-to-SignUp"
            >
              Login
            </span>
          </div>
          <div className="socialMedia-login">
            <div className="sm-new-ctn">
              <div className="sm-new-links">
                {settings?.telegramLink && (
                  <button
                    onClick={() =>
                      navigateTelegramInstagram(settings?.telegramLink)
                    }
                    className="sm-new-link"
                  >
                    <img
                      src={assets.telegram}
                      alt="TELEGRAM_NUMBER"
                      className="sm-new-img"
                    />
                    <div className="sm-text">Follow on Telegram</div>
                  </button>
                )}
                {settings?.instagramLink && (
                  <button
                    onClick={() =>
                      navigateTelegramInstagram(settings?.instagramLink)
                    }
                    className="sm-new-link"
                  >
                    <img
                      src={assets.instagram}
                      alt="INSTAGRAM_LINK"
                      className="sm-new-img"
                    />
                    <div className="sm-text">Follow on Instagram</div>
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="disclaimer-ctn-text">
            <div className="disclaimer-width">
              Disclaimer: Please note that Gambling involves a financial risk
              and could be addictive over time if not practised within limits.
              Only 18+ people should use the services and should use it
              responsibly. Players should be aware of any financial risk
              andgovern themselves accordingly.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
