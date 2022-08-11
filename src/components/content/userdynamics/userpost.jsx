import React, { Component } from 'react';

const UserPost = (props) => {
  

  return ( 
    <div className="card">
      <div className="card-body">
        {props.posts.map(post => (
          <div className="card" key={post.id} style={{marginBottom: "20px"}}>
            <div className="card-body">
              {post.content}
              <button onClick={() => props.delete_a_post(post.id)} type="button" className="btn btn-warning btn-sm" style={{float: "right"}}>Delete</button>
            </div>
        </div>
        ))}
      </div>
    </div>
    
  );
}
 
export default UserPost;