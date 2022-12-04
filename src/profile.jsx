import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import twitterLogo from "./assets/logo-login.png";
import homeLogo from "./assets/svg/home.svg";
import exploreLogo from "./assets/svg/hash.svg";
import notificationLogo from "./assets/svg/notification.svg";
import messageLogo from "./assets/svg/message.svg";
import profileLogo from "./assets/svg/profile.svg";
import moreLogo from "./assets/svg/more.svg";
import bookmarkLogo from "./assets/svg/bookmark.svg";
import listLogo from "./assets/svg/list.svg";
import threeDotLogo from "./assets/svg/threeDot.svg";

const ProfileDiv = styled.div`
  display: flex;
`;

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const onLogout = () => {
    localStorage.clear();
    setUser(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      setUser(true);
      navigate("/profile");
    }
  }, [user]);

  return (
    <React.Fragment>
      <ProfileDiv>
        <div className="w-[20%] ">
          <div className="w-[275px] h-[100%] fixed flex justify-end">
            <div className="px-3 justify-between">
              <div className="header-top flex items-start flex-col">
                <div className="header-top-logo w-[35px] h-[52px] py-[2px] flex items-center">
                  <Link to="/">
                    <img src={twitterLogo} alt="twitter" />
                  </Link>
                </div>
                <div className="header-top-menu mt-[2px] mb-1 flex items-center">
                  <div className="flex flex-col items-start">
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={homeLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Home
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={exploreLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Explore
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img
                          src={notificationLogo}
                          alt="home"
                          className="w-7"
                        />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Notifications
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={messageLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Messages
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={bookmarkLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Bookmarks
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={listLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Lists
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={profileLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          Profile
                        </div>
                      </div>
                    </Link>
                    <Link to="/">
                      <div className="p-3 flex">
                        <img src={moreLogo} alt="home" className="w-7" />
                        <div className="ml-4 mr-5 text-xl text-[#0F1419]">
                          More
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="header-top-button my-1">
                  <button className="px-[75px] py-[14px] my-1 bg-[#1D9BF0] text-[White] font-bold rounded-[25px]">
                    Tweet
                  </button>
                </div>
              </div>
              <div className="header-bottom my-3 p-3 flex items-center justify-between">
                <div className="">
                  <img src={twitterLogo} alt="" className="w-[30px]" />
                </div>
                <div className="">
                  <div className="text-[15px] font-bold">akashsabva</div>
                  <div className="text-[15px]">@akashsabva</div>
                </div>
                <div className="">
                  <img src={threeDotLogo} alt="" className="w-[20px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[80%]">Main</div>
      </ProfileDiv>
    </React.Fragment>
  );
}
