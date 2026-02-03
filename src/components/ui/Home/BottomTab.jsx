import { useSelector } from "react-redux";
import { settings } from "../../../api";
import assets from "../../../assets";
import "./bottom-tab.scss";

const BottomTab = () => {
  const { token } = useSelector((state) => state.auth);

  const openWhatsapp = () => {
    if (token && settings?.branchWhatsapplink) {
      window.open(settings?.branchWhatsapplink, "_blank");
    } else {
      window.open(settings?.whatsapplink, "_blank");
    }
  };
  return (
    <div className="bottom-tab">
      <div className="support" style={{ marginLeft: "0px" }}>
        <span className="help-msg">
          Need help? Our 24/7 support team is here for you anytime!
        </span>
        {(settings?.whatsapplink || settings?.branchWhatsapplink) && (
          <div className="social-icons">
            <button onClick={openWhatsapp} className="sm-link">
              <svg
                width={20}
                height={20}
                viewBox="0 0 32 33"
                fill="none"
                className="wp-svg"
              >
                <g clipPath="url(#clip0_845_257)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25.3136 22.6387C24.928 23.7302 23.3952 24.6332 22.1728 24.8973C21.336 25.0749 20.2448 25.2155 16.568 23.6918C12.4384 21.9809 6.704 15.8865 6.704 11.8309C6.704 9.76624 7.8944 7.36211 9.976 7.36211C10.9776 7.36211 11.1984 7.38164 11.528 8.17227C11.9136 9.10375 12.8544 11.3987 12.9664 11.634C13.4288 12.5991 12.496 13.164 11.8192 14.0043C11.6032 14.2572 11.3584 14.5306 11.632 15.0012C11.904 15.4621 12.8448 16.9954 14.2272 18.2262C16.0128 19.8171 17.4608 20.325 17.9792 20.541C18.3648 20.7011 18.8256 20.6638 19.1072 20.3629C19.464 19.9772 19.9072 19.3372 20.3584 18.7066C20.6768 18.2553 21.0816 18.1989 21.5056 18.359C21.792 18.4582 25.432 20.1487 25.5856 20.4191C25.6992 20.616 25.6992 21.5471 25.3136 22.6387ZM16.0032 0.0449219H15.9952C7.17439 0.0449219 0 7.22148 0 16.0449C0 19.5436 1.12801 22.7895 3.04641 25.4223L1.05281 31.3676L7.20161 29.4027C9.73121 31.0768 12.7504 32.0449 16.0032 32.0449C24.824 32.0449 32 24.8684 32 16.0449C32 7.22148 24.824 0.0449219 16.0032 0.0449219Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_845_257">
                    <rect
                      width={32}
                      height={32}
                      fill="white"
                      transform="translate(0 0.0449219)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="secure">
        <img src={assets.secure} className="secure-img" alt="Secure" />
        <div className="safe-msgs">
          <span className="safe safe1">100% Safe</span>
          <span className="safe safe2">
            Your data is safe with encrypted protection. Enjoy a secure and
            private connection.
          </span>
        </div>
      </div>
      <div className="line" />
      <div className="copyright">
        <div className="copyright-msgs">
          <span className="cpr msg1">
            {settings.siteTitle} provides a smooth and secure betting experience
            with a variety of reliable payment options. Whether you’re placing
            bets on casino games or sports, our platform ensures quick and
            hassle-free transactions. Enjoy the convenience of seamless deposits
            and withdrawals, and focus on the thrill of the game.
          </span>
          <span className="cpr msg2">
            © Copyright 2024. All Rights Reserved. Powered by
            {settings.siteTitle}.
          </span>
        </div>
        <div className="copyright-imgs">
          <img
            src="data:image/png;base64,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"
            className="copyright-img"
            alt="GamCare"
          />
          <img
            src="data:image/png;base64,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"
            className="copyright-img"
            alt="18+"
          />
        </div>
      </div>
    </div>
  );
};

export default BottomTab;
