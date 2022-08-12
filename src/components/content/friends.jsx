import React, { Component, useState } from 'react';
import Base from './base';
import $ from 'jquery'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Friends = () => {

  const [users, setusers] = useState([]);
  const [done, setdone] = useState(false)
  const is_login = useSelector(state => state.user.is_login);
  const navigate = useNavigate();

  const getuserlist = () => {
    if (!done) {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/userlist/",
        type: "GET",
        success(resp) {
          setusers(resp)
          setdone(true)
        }
      })
    }
  }

  const getuserinfo = (user_id) => {
    if (is_login) {
      navigate(`/myspace/userdynamics/${user_id}`);
    } else {
      navigate('/myspace/login')
    }
  }

  getuserlist();

  return ( 
    <Base>
      {users.map(user => (
          <div key={user.id} onClick={() => getuserinfo(user.id)} className="card hover" style={{marginBottom: "10px", cursor: "pointer"}}>
            <div className="card-body">
              <div className="row">
                <div className="col-1">
                  <img className="img-fluid" src={user.photo} alt="" />
                </div>
                <div className="col-11">
                  <div className="username" style={{fontWeight:"bold"}}>{user.username}</div>
                  <div className="folloerCount" style={{fontSize: "12px", color:"gray"}}>fans: {user.followerCount}</div>
                </div>
              </div>
            </div>
          </div>
      ))}
    </Base>
  );
}

export default Friends
