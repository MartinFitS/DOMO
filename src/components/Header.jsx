import React from "react";
import { Avatar } from "antd";

const Header = () => (
  <div className="header-container">
    <div className="profile">
      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=male" style={{width:"50px", height:"50px"}} />
    </div>
  </div>
);

export default Header;
