import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);

  const onClickHandle = (page) => {
    if (page === "logOut") {
      localStorage.clear();
      setUser(false);
    } else if (page === "profile") {
      navigate("/profile");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    } else {
      setUser(true);
      navigate("/");
    }
  }, [user]);

  return (
    <React.Fragment>
      <div>Home</div>
      <button
        className="my-3 px-4 py-[6px] bg-[#0d1419] text-white text-[15px] font-bold rounded-[20px] border-[#0d1419] border-0 border-solid"
        onClick={() => onClickHandle("logOut")}
      >
        Logout
      </button>
      <button
        className="my-3 px-4 py-[6px] bg-[#0d1419] text-white text-[15px] font-bold rounded-[20px] border-[#0d1419] border-0 border-solid"
        onClick={() => onClickHandle("profile")}
      >
        Profile
      </button>
    </React.Fragment>
  );
}
