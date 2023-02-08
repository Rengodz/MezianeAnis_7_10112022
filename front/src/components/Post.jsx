import React from "react";
import "./post.css";
import { useState } from "react";

export default function Post({ post }) {
    const [like,setLike] = useState(post.like)
    const [isLiked,setIsLiked] = useState(false)
  
    const likeHandler =()=>{
      setLike(isLiked ? like-1 : like+1)
      setIsLiked(!isLiked)
    }
    return (
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <img
                className="postProfileImg"
                src={''}
                alt=""
              />
              <span className="postUsername">
                
              </span>
              <span className="postDate">{post.date}</span>
            </div>
            <div className="postTopRight">
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post?.desc}</span>
            <img className="postImg" src={post.photo} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img className="likeIcon" src="assets/like.png" onClick={likeHandler} alt="" />
              <img className="likeIcon" src="assets/heart.png" onClick={likeHandler} alt="" />
              <span className="postLikeCounter">{like} personnes aiment ça</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">{post.comment} commenter</span>
            </div>
          </div>
        </div>
      </div>
    );
  }