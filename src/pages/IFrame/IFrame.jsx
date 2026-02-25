import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userToken } from "../../redux/features/auth/authSlice";
import handleRandomToken from "../../utils/handleRandomToken";
import handleEncryptData from "../../utils/handleEncryptData";
import { API, settings } from "../../api";
import axios from "axios";
import toast from "react-hot-toast";

const IFrame = () => {
  const [, setLoading] = useState(false);
  const [iFrame, setIFrame] = useState("");
  const { gameId } = useParams();
  const token = useSelector(userToken);

  /* get iframe url */
  useEffect(() => {
    window.scrollTo(0, 0);
    const getCasinoVideo = async () => {
      setLoading(true);
      const generatedToken = handleRandomToken();
      const encryptedData = handleEncryptData({
        gameId: gameId,
        token: generatedToken,
        isHome: false,
        mobileOnly: true,
        site: settings.siteUrl,
        casinoCurrency: settings.casino_currency,
      });

      try {
        const res = await axios.post(API.liveCasinoIFrame, encryptedData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res?.data;
        setIFrame(data?.gameUrl);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.message);
      }
    };
    getCasinoVideo();
  }, [gameId, token]);

  return (
    <div className="md hydrated">
      <div className="router-ctn">
        <div
          className="dc-iframe-ctn"
          style={{ height: "100vh", width: "100%" }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
            }}
            src={iFrame}
            title="AVIATOR"
            allowFullscreen={true}
          ></iframe>
        </div>
        <div className="rules-regulations-footer">
          <div>Rules &amp; Regulations © 2024</div>
        </div>
      </div>
    </div>
  );
};

export default IFrame;
