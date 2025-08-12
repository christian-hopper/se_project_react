import "./SideBar.css";
import avatar from "../../assets/images/avatar.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="User Avatar" className="sidebar__avatar" />
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default Sidebar;
