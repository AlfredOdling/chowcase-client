import React from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";

const UserProfile = () => {
  const email = localStorage.getItem("user_email");

  const dispatch = useDispatch();
  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li>My Account</li>
      <li>Connections</li>
      <li onClick={() => dispatch(userSignOut())}>Logout</li>
    </ul>
  );

  return (
    <div className="gx-flex-row gx-align-items-center gx-justify-content-center gx-mb-4 gx-avatar-row">
      <Avatar
        src={"https://via.placeholder.com/150"}
        className="gx-size-40 gx-mr-3"
        alt=""
      />

      <Popover
        placement="top"
        content={userMenuOptions}
        trigger="click"
        className="gx-mt-2"
      >
        <span className="gx-avatar-name">
          {email || ""}
          <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
        </span>
      </Popover>
    </div>
  );
};

export default UserProfile;
