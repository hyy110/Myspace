import React, { Component, useState } from 'react';

const UserWrite = (props) => {

  return ( 
    <div className="form-floating" style={{marginTop: "20px"}}>
      <textarea className="form-control" style={{height: "100px"}}></textarea>
      <label htmlFor="floatingTextarea2">Add Post</label>
      <button onClick={() => props.post_a_post(document.querySelector('textarea').value)} type="button" className="btn btn-info btn-sm" style={{float: "right", marginTop: "10px"}}>Add Post</button>
    </div>
  );
}

export default UserWrite;