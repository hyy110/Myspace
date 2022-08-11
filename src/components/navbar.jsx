import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const NavBar = () => {

  const username = useSelector(state => state.user.username)
  const is_login = useSelector(state => state.user.is_login)
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({
      type: "updateUser",
      username: "",
      id: 1,
      photo: "",
      followCount: -1,
      is_followed: false,
      access: "",
      refresh: "",
      is_login: false,
    })
  }

  return ( 
    <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link className="navbar-brand" to="/myspace">Myspace</Link>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myspace/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/myspace/friends">Friends</Link>
                </li>
              </ul>
              <ul className="navbar-nav" hidden={is_login}>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myspace/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/myspace/register">Register</Link>
                </li>
              </ul>
              <ul className="navbar-nav" hidden={!is_login}>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/myspace/userdynamics/65">{username}</Link>
                </li>
                <li className="nav-item">
                  <Link onClick={logout} className="nav-link active" to="/myspace/login">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </React.Fragment>
  );
}

export default NavBar;