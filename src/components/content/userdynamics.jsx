import React, { Component, useState } from 'react';
import Base from './base';
import UserInfo from './userdynamics/userinfo';
import UserPost from './userdynamics/userpost';
import UserWrite from './userdynamics/userwrite';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import $ from 'jquery'

const Userdynamics = () => {

  let access = useSelector(state => state.user.access)
  const user_id = useParams().userid;

  const is_me = () => {
    if (user_id === "65") 
      return false;
    else return true;
  }
  const [postCount, setpostCount] = useState(3)
  const [posts, setposts] = useState([])

  $.ajax({
    url: "https://app165.acapp.acwing.com.cn/myspace/post/",
    type: "GET",
    data: {
      user_id: user_id,
    },
    headers: {
      'Authorization': 'Bearer ' + access
    },
    success(resp) {
      setposts(resp)
      setpostCount(resp.length + 1)
    }
  })

  const post_a_post = (content) => {
    $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "POST",
        data: {
          content: content,
        },
        headers: {
          'Authorization': 'Bearer ' + access
        },
        success(resp) {
          console.log(content, resp)
        }
    })
  }

  const delete_a_post = (post_id) => {
    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/post/",
      type: "DELETE",
      data: {
        post_id
      },
      headers: {
        'Authorization': 'Bearer ' + access
      },
      success(resp) {
        console.log(post_id, resp)
      }
    })
  }

  return ( 
    <Base>
      <div className="row">
        <div className="col-3">
          <UserInfo user_id={user_id} />
          <div hidden={is_me()}><UserWrite hidden={true} posts={posts} postCount={postCount} post_a_post={post_a_post} /></div>
        </div>
        <div className="col-9">
          <UserPost posts={posts} postCount={postCount} delete_a_post={delete_a_post} />
        </div>
      </div>
    </Base>
  );
}

export default Userdynamics