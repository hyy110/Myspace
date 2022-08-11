import React, { Component, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import $, { grep } from "jquery";

const UserInfo = (props) => {
  const [user, setuser] = useState({
    username: "",
    id: 1,
    photo: "",
    followCount: -1,
    is_followed: true,
    access: "",
    refresh: "",
    is_login: false,
  });
  const [follow, setfollow] = useState("+follow");
  const access = useSelector((state) => state.user.access);
  
  $.ajax({
    url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
    type: "GET",
    data: {
      user_id: props.user_id,
    },
    headers: {
      Authorization: "Bearer " + access,
    },
    success(resp) {
      setuser({
        username: resp.username,
        id: resp.id,
        photo: resp.photo,
        is_followed: resp.is_followed,
        followCount: resp.followerCount,
      });
      if (resp.is_followed) {
        setfollow("followed")
      } else {
        setfollow("+follow")
      }
    },
  });

  const handleClick = () => {
  
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
      type: "POST",
      data: {
        target_id: props.user_id,
      },
      headers: {
        Authorization: "Bearer " + access,
      },
      success(resp) {
        console.log(resp)
      },
    });

    if (user.is_followed) {
      setfollow("followed")
    } else {
      setfollow("+follow")
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-3">
            <img
              className="img-fluid"
              style={{ borderRadius: "50%" }}
              src={user.photo}
              alt=""
            />
          </div>
          <div className="col-9">
            <div className="username" style={{ fontWeight: "bold" }}>
              {user.username}
            </div>
            <div className="fans" style={{ fontSize: "12px", color: "gray" }}>
              fans: {user.followCount}
            </div>
            <button
              onClick={handleClick}
              className="btn btn-secondary btn-sm"
              style={{ border: "0px", padding: "2px 4px", fontSize: "12px" }}
            >
              {follow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
