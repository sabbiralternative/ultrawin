import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import handleRandomToken from "../../utils/handleRandomToken";
import { settings } from "../../api";
import handleEncryptData from "../../utils/handleEncryptData";
import toast from "react-hot-toast";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { useState } from "react";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [handleChangePassword] = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  /* Change password function */
  const onSubmit = async ({ password, newPassword, newPasswordConfirm }) => {
    const generatedToken = handleRandomToken();
    const encryptedData = handleEncryptData({
      oldPassword: password,
      password: newPassword,
      passVerify: newPasswordConfirm,
      token: generatedToken,
      site: settings.siteUrl,
    });

    const res = await handleChangePassword(encryptedData).unwrap();
    if (res.success) {
      toast.success(res?.result?.message);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error(res?.error?.errorMessage);
    }
  };

  return (
    <div className="router-ctn">
      <div className="ds-view-ctn">
        <div className="punter-view" id="main-content">
          <div className="sports-view-ctn">
            <div className="mp-sub-ctn">
              <div className="report-header">
                <div className="report-img-title">
                  <div className="report-img-div-title">
                    <div className="report-img-div">
                      <svg
                        width={10}
                        height={10}
                        viewBox="0 0 10 10"
                        fill="none"
                        className="report-img"
                      >
                        <g clipPath="url(#clip0_1061_17864)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.28127 8.99999H1.71909C1.36589 8.99999 1.10508 8.65149 1.23829 8.33099C1.85638 6.84899 3.30847 5.99999 4.99993 5.99999C6.6919 5.99999 8.14398 6.84899 8.76207 8.33099C8.89529 8.65149 8.63447 8.99999 8.28127 8.99999ZM2.95833 2.99999C2.95833 1.89699 3.8745 0.999992 4.99993 0.999992C6.12586 0.999992 7.04152 1.89699 7.04152 2.99999C7.04152 4.10299 6.12586 4.99999 4.99993 4.99999C3.8745 4.99999 2.95833 4.10299 2.95833 2.99999ZM9.97784 8.81799C9.60678 7.13849 8.44613 5.89898 6.91851 5.33648C7.728 4.69798 8.20012 3.66547 8.02659 2.53497C7.82549 1.22347 6.7118 0.173988 5.36741 0.0209884C3.51161 -0.190512 1.93754 1.22449 1.93754 2.99999C1.93754 3.94499 2.38465 4.78698 3.08185 5.33648C1.55372 5.89898 0.393582 7.13849 0.022012 8.81799C-0.112733 9.42849 0.389499 9.99999 1.02699 9.99999H8.97286C9.61086 9.99999 10.1131 9.42849 9.97784 8.81799Z"
                            fill="currentColor"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1061_17864">
                            <rect width={10} height={10} fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className="report-title">My Profile</div>
                  </div>
                  <div className="tab-btns" />
                </div>
                <div className="report-filters rh-web-view" />
                <div className="report-filters rh-mob-view" />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="cp-ctn cp-ctn-custom-padding"
                autoComplete="off"
              >
                <span className="cp-input-template">
                  <div className="cp-label">Enter old password</div>
                  <div className="MuiFormControl-root MuiTextField-root cp-input">
                    <div className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd">
                      <input
                        {...register("password", { required: true })}
                        aria-invalid="false"
                        placeholder="Enter old password"
                        type={showPassword ? "text" : "password"}
                        className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                      />
                      <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                        <button
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd"
                          tabIndex={0}
                          type="button"
                        >
                          <span className="MuiIconButton-label">
                            {showPassword ? (
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                              </svg>
                            ) : (
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              </svg>
                            )}
                          </span>
                          <span className="MuiTouchRipple-root" />
                        </button>
                      </div>
                      <fieldset
                        aria-hidden="true"
                        className="jss76 MuiOutlinedInput-notchedOutline"
                        style={{ paddingLeft: "8px" }}
                      >
                        <legend className="jss77" style={{ width: "0.01px" }}>
                          <span></span>
                        </legend>
                      </fieldset>
                    </div>
                    {errors?.password && (
                      <p
                        className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"
                        id="my-helper-text"
                      >
                        Required
                      </p>
                    )}
                  </div>
                </span>
                <div className="cp-input-template">
                  <div className="cp-label">Enter New Password</div>
                  <div className="MuiFormControl-root cp-input">
                    <div className="MuiInputBase-root MuiOutlinedInput-root Mui-error Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd">
                      <input
                        {...register("newPassword", {
                          required: true,
                        })}
                        aria-invalid="true"
                        placeholder="Enter New Password"
                        type={showNewPass ? "text" : "password"}
                        className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                      />
                      <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                        <button
                          onClick={() => setShowNewPass((prev) => !prev)}
                          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd"
                          tabIndex={0}
                          type="button"
                        >
                          <span className="MuiIconButton-label">
                            {showNewPass ? (
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                              </svg>
                            ) : (
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              </svg>
                            )}
                          </span>
                          <span className="MuiTouchRipple-root" />
                        </button>
                      </div>
                      <fieldset
                        aria-hidden="true"
                        className="jss76 MuiOutlinedInput-notchedOutline"
                        style={{ paddingLeft: "8px" }}
                      >
                        <legend className="jss77" style={{ width: "0.01px" }}>
                          <span></span>
                        </legend>
                      </fieldset>
                    </div>
                    {errors?.newPassword && (
                      <p
                        className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"
                        id="my-helper-text"
                      >
                        Required
                      </p>
                    )}
                  </div>
                </div>
                <div className="cp-input-template">
                  <div className="cp-label">Confirm New Password</div>
                  <div className="MuiFormControl-root cp-input">
                    <div className="MuiInputBase-root MuiOutlinedInput-root Mui-error Mui-error MuiInputBase-formControl MuiInputBase-adornedEnd MuiOutlinedInput-adornedEnd">
                      <input
                        {...register("newPasswordConfirm", {
                          required: true,
                        })}
                        aria-invalid="true"
                        placeholder="Confirm New Password"
                        type={showConfirmPass ? "text" : "password"}
                        className="MuiInputBase-input MuiOutlinedInput-input MuiInputBase-inputAdornedEnd MuiOutlinedInput-inputAdornedEnd"
                      />
                      <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                        <button
                          onClick={() => setShowConfirmPass((prev) => !prev)}
                          className="MuiButtonBase-root MuiIconButton-root MuiIconButton-edgeEnd"
                          tabIndex={0}
                          type="button"
                        >
                          <span className="MuiIconButton-label">
                            {showConfirmPass ? (
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"></path>
                              </svg>
                            ) : (
                              <svg
                                className="MuiSvgIcon-root"
                                focusable="false"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                              </svg>
                            )}
                          </span>
                          <span className="MuiTouchRipple-root" />
                        </button>
                      </div>
                      <fieldset
                        aria-hidden="true"
                        className="jss76 MuiOutlinedInput-notchedOutline"
                        style={{ paddingLeft: "8px" }}
                      >
                        <legend className="jss77" style={{ width: "0.01px" }}>
                          <span></span>
                        </legend>
                      </fieldset>
                    </div>
                    {errors?.newPasswordConfirm && (
                      <p
                        className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error"
                        id="my-helper-text"
                      >
                        Required
                      </p>
                    )}
                  </div>
                </div>
                <span className="error-msg" />
                <span className="success-msg" />
                <div className="cp-btn-div">
                  <button
                    className="cb cb-variant-2 "
                    type="button"
                    onClick={() =>
                      reset({
                        password: "",
                        newPassword: "",
                        newPasswordConfirm: "",
                      })
                    }
                  >
                    Reset{" "}
                  </button>
                  <button className="cb cb-variant-1 " type="submit">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
