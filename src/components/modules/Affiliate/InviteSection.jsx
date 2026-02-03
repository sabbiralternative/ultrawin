import { Fragment, useState } from "react";
// import { LuCirclePlus } from "react-icons/lu";
import { MdOutlineContentCopy } from "react-icons/md";
import { useGetIndex } from "../../../hooks";
import AddNewUser from "../../modal/Affiliate/AddNewUser";
import assets from "../../../assets";
import { handleCopyToClipBoard } from "../../../utils/handleCopyToClipBoard";
import { settings } from "../../../api";

const InviteSection = () => {
  const [showAddNewUserModal, setShowAddNewUserModal] = useState(false);
  const { data } = useGetIndex({
    type: "get_referral_code",
  });

  return (
    <Fragment>
      {showAddNewUserModal && (
        <AddNewUser setShowAddNewUserModal={setShowAddNewUserModal} />
      )}
      <div data-v-4c49d924 className="nw-affi-invite-sec mb-5">
        <div className="nw-affi-invite-content-wrapper" data-v-4c49d924>
          <div className="nw-affi-invite-content" data-v-4c49d924>
            <h2 data-v-4c49d924>Invite your friends</h2>
            <p data-v-4c49d924>to join and you can receive huge bonuses</p>
          </div>
          <div className="nw-affi-invite-img" data-v-4c49d924>
            <img
              src={assets.affiInvite}
              alt="affi-invite-img"
              data-v-4c49d924
            />
          </div>
        </div>
        {settings?.referral_create_account && (
          <div className="nw-affi-add-new-user-btn-sec" data-v-4c49d924>
            <button
              onClick={() => setShowAddNewUserModal(true)}
              className="nw-affi-add-new-user-btn"
              data-bs-target="#AfAddNewUser"
              data-bs-toggle="modal"
              data-v-4c49d924
            >
              <span data-v-4c49d924>
                {/* <LuCirclePlus size={18} /> */} + ADD NEW USER
              </span>
            </button>
          </div>
        )}

        <div data-v-4c49d924 className="nw-affi-qr-invite-wrapper">
          <div data-v-4c49d924 className="nw-affi-qr-invite-code">
            <div data-v-4c49d924 className="nw-affi-qr-invite-heading">
              <img
                data-v-4c49d924
                src={assets.affiInviteGift}
                alt="invite-gift"
              />
              <h3 data-v-4c49d924>Invitation Code</h3>
            </div>
            <div data-v-4c49d924 className="nw-affi-share-link-sec">
              <span data-v-4c49d924>{data?.result?.link}</span>
              <button
                style={{ position: "absolute", right: "10px", top: "0px" }}
                onClick={() => handleCopyToClipBoard(data?.result?.text)}
                data-v-4c49d924
                className="thm-but thm-bdr-btn affi-cancel-btn affi-yellow-btn"
              >
                <MdOutlineContentCopy color="#000" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InviteSection;
