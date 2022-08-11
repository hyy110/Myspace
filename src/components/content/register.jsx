import React, { Component } from 'react';
import Base from './base';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import $ from 'jquery'
import { useDispatch } from 'react-redux';
import jwt_decode from 'jwt-decode'

const Register = () => {

  const [error_message, seterror_message] = useState('')
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('')
  const [confirmpassword, setconfirmpassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const register = () => {
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/user/",
      type: "POST",
      data: {
        username,
        password,
        password_confirm: confirmpassword
      },
      success(resp) {
        if (resp.result === 'success') {
          $.ajax({
            url: "https://app165.acapp.acwing.com.cn/api/token/",
            type: "POST",
            data: {
              username,
              password
            },
            success(resp) {
              const {access, refresh} = resp;
              const access_obj = jwt_decode(access);
        
              setInterval(() => {
                $.ajax({
                  url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                  type: "POST",
                  data: {
                    refresh,
                  },
                  success(resp) {
                    console.log(resp)
                    dispatch({
                      type: 'updateAccess',
                      access: resp.access
                    })
                  }
                })
              }, 4.5*60*1000);
        
              $.ajax({
                url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                type: "GET",
                data: {
                  user_id: access_obj.user_id,
                },
                headers: {
                  'Authorization': 'Bearer ' + access,
                },
                success(resp) {
                  dispatch({
                    type: "updateUser",
                    username: resp.username,
                    id: resp.id,
                    photo: resp.photo,
                    followCount: resp.followerCount,
                    is_followed: resp.is_followed,
                    access: access,
                    refresh: refresh,
                    is_login: true
                  })
                  navigate("/myspace/friends")
                },
              })          
            },
          })
        } else {
          if (resp.result === "两个密码不一致") {
            seterror_message("password and confirmpassword do not match!")
          } else if (resp.result === "用户名已存在") {
            seterror_message("username already exists!")
          } else if (resp.result === "用户名和密码不能为空") {
            seterror_message("username or password empty!")
          }
        }
      }
    })
  }

  return ( 
    <Base>
      <div className="row justify-content-md-center">
        <div className="col-4">
          <div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input onChange={e => {setusername(e.target.value)}} type="text" className="form-control" id="username" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input onChange={e => {setpassword(e.target.value)}} type="password" className="form-control" id="password" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
              <input onChange={e => {setconfirmpassword(e.target.value)}} type="password" className="form-control" id="confirmpassword" />
            </div>
            <div className="error" style={{color:"red", float:"right"}}>{error_message}</div>
            <button onClick={register} type="submit" className="btn btn-primary" style={{width:"100%", marginTop:"10px"}}>Register</button>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Register
