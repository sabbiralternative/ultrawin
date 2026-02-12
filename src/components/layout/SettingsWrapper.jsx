import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSettingsMutation } from "../../hooks/settings";
import { API } from "../../api";

const SettingsWrapper = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const { mutate } = useSettingsMutation();

  useEffect(() => {
    mutate();
  }, [token, mutate]);

  if (!API.login) {
    return null;
  }

  return children;
};

export default SettingsWrapper;
