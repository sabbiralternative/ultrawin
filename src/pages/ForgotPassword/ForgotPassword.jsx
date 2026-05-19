import assets from "../../assets";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import {
  useForgotPasswordMutation,
  useGetOtpMutation,
} from "../../redux/features/auth/authApi";
import { useForm } from "react-hook-form";
import { settings } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { navigateTelegramInstagram } from "../../utils/navigateTelegramInstagram";
import useContextState from "../../hooks/useContextState";

const ForgotPassword = () => {
  const { logo } = useContextState();
  const navigate = useNavigate();
  const [handleForgotPassword] = useForgotPasswordMutation();
  const [passType, setPassType] = useState(true);
  const [confirmPassType, setConfirmPassType] = useState(true);
  const [mobile, setMobile] = useState("");
  const [OTP, setOTP] = useState({});
  const [getOTP] = useGetOtpMutation();
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
    const forgotPasswordData = {
      username: mobile,
      password: data?.password,
      confirmPassword: data?.confirmPassword,

      otp: data?.otp,
      isOtpAvailable: settings.otp,
      orderId: OTP.orderId,
      otpMethod: OTP.otpMethod,
    };

    const result = await handleForgotPassword(forgotPasswordData).unwrap();
    if (result.success) {
      toast.success("Password updated successfully");
      navigate("/login");
    } else {
      toast.error(result?.error?.loginName?.[0]?.description);
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
            background: "transparent",
          }}
          alt="website"
          className="logo"
        />
      </div>
      <div className="login-card" style={{ marginTop: "50px" }}>
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
            </div>
            <div
              className="card-title"
              style={{ fontSize: "16px", fontWeight: "500" }}
            >
              Forgot Username/Password
            </div>
            <span
              className="card-login-here"
              style={{ fontWeight: "400", fontSize: "14px" }}
            >
              We’ll send OTP on your registered number associated with username.
            </span>

            <span style={{ marginTop: "30px" }} className="usr-input">
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
                    placeholder="Enter User Name"
                    type="text"
                    className="MuiInputBase-input MuiOutlinedInput-input"
                    value={mobile}
                  />
                </div>
              </div>
            </span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                height: "50px",
              }}
              className="login-demologin-btns"
            >
              <button
                disabled={mobile.length < 10}
                onClick={handleOTP}
                style={{ border: "none", height: "30px" }}
                className="MuiButtonBase-root MuiButton-root MuiButton-contained login-form-btn MuiButton-containedPrimary"
                type="button"
              >
                <span
                  style={{ fontWeight: "400", fontSize: "15px" }}
                  className="MuiButton-label"
                >
                  Send OTP
                </span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>

            <span className="usr-input">
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
                    placeholder="Enter OTP"
                    type="text"
                    className="MuiInputBase-input MuiOutlinedInput-input"
                  />
                </div>
              </div>
            </span>

            <div style={{ marginTop: "20px" }} className="pwd-input">
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
                    placeholder="Enter New Password"
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                    type={passType ? "password" : "text"}
                  />
                  <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                    <button
                      className="MuiButtonBase-root MuiIconButton-root"
                      type="button"
                      aria-label="toggle password visibility"
                    >
                      <span
                        onClick={() => setPassType((prev) => !prev)}
                        className="MuiIconButton-label"
                      >
                        {passType ? (
                          <IoEyeOffOutline
                            color="var(--color-bg-primary)"
                            size={23}
                          />
                        ) : (
                          <IoEyeOutline
                            color="var(--color-bg-primary)"
                            size={23}
                          />
                        )}
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "20px" }} className="pwd-input">
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
                    placeholder="Enter Confirm Password"
                    className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                    type={confirmPassType ? "password" : "text"}
                  />
                  <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                    <button
                      className="MuiButtonBase-root MuiIconButton-root"
                      type="button"
                      aria-label="toggle password visibility"
                    >
                      <span
                        onClick={() => setConfirmPassType((prev) => !prev)}
                        className="MuiIconButton-label"
                      >
                        {confirmPassType ? (
                          <IoEyeOffOutline
                            color="var(--color-bg-primary)"
                            size={23}
                          />
                        ) : (
                          <IoEyeOutline
                            color="var(--color-bg-primary)"
                            size={23}
                          />
                        )}
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "10px" }} className="login-demologin-btns">
              <button
                style={{ border: "none", width: "100%", height: "40px" }}
                className="MuiButtonBase-root MuiButton-root MuiButton-contained login-form-btn MuiButton-containedPrimary"
                type="submit"
              >
                <span style={{ fontWeight: "500" }} className="MuiButton-label">
                  Reset Password
                </span>
                <span className="MuiTouchRipple-root"></span>
              </button>
            </div>
          </form>
          <div className="account-SignUp">
            <div className="account-dontHaveAccount">Don’t have account?</div>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
              className="back-to-SignUp"
            >
              Sign Up
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

export default ForgotPassword;
