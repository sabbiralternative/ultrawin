import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSettingsMutation } from "../../hooks/settings";

const SettingsWrapper = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const { mutate, isSuccess } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  if (!isSuccess) {
    return null;
  }

  return children;
};

export default SettingsWrapper;
