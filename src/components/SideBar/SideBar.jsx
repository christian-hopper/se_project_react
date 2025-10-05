import { useState } from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import "./SideBar.css";
import avatarImg from "../../assets/images/avatar.svg";

function Sidebar({ onLogout, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const placeholderLetter = currentUser
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__user">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt="User Avatar"
              className="sidebar__avatar avatar"
            />
          ) : (
            <div className="sidebar__avatar-placeholder avatar">
              {placeholderLetter}
            </div>
          )}
          <p className="sidebar__username">
            {currentUser?.name || "User name"}
          </p>
        </div>
        <div className="sidebar__buttons">
          <button
            className="sidebar__edit-button"
            onClick={() => setIsEditOpen(true)}
          >
            Change profile data
          </button>
          <button className="sidebar__logout-button" onClick={onLogout}>
            Log out
          </button>
        </div>
      </div>

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdateUser={onUpdateUser}
      />
    </>
  );
}

export default Sidebar;
