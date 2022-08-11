import React, { Component, useState } from 'react';
import Base from './base';
import $ from 'jquery'
import jwt_decode from 'jwt-decode'
import { useSelector, useDispatch } from 'react-redux';
import { Route, useNavigate } from "react-router-dom";


const Login = () => {

  const [error_message, seterror_message] = useState('')
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const login = (username, password) => {
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
            <div className="error" style={{color:"red", float:"right"}}>{error_message}</div>
            <button onClick={() => login(username, password)} type="submit" className="btn btn-primary" style={{width:"100%", marginTop:"10px"}}>Login</button>
          </div>
        </div>
      </div>
    </Base>
  );
}

export default Login