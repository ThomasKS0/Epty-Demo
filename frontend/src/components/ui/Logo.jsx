import React from "react";
import "../../global.css";
const Logo = () => {
  return (
    <div>
      <svg
        viewBox="0 0 200 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="logo"
      >
        <path
          d="M30 15C30 8.37258 35.3726 3 42 3H58C64.6274 3 70 8.37258 70 15V45C70 51.6274 64.6274 57 58 57H42C35.3726 57 30 51.6274 30 45V15Z"
          fill="#1E3A8A"
        />
        <path d="M42 15H58V30H42V15Z" fill="#FF4500" />
        <path d="M50 30L58 45H42L50 30Z" fill="white" />

        <circle cx="50" cy="35" r="8" fill="#1E3A8A" />
        <rect x="46" y="35" width="8" height="12" fill="#1E3A8A" />

        <text x="75" y="40" fill="#1E3A8A" className="logo-text">
          EPTY
        </text>
        <path d="M125 15L130 10L135 15H125Z" fill="#FF4500" />
      </svg>
    </div>
  );
};

export default Logo;
