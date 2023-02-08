import React from "react";
import { useState, useEffect } from 'react';
import axios from "axios";
import "./Share.css";

const userImg = require('./fleur.jpg');
const accessToken = localStorage.getItem('accessToken');
const Share = () => {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

const POST_URL = 'http://localhost:5000/api/topics';
const handleSubmit = async (e) => {
    e.preventDefault();
        axios.post(POST_URL,
            JSON.stringify({
            title : title,
            body: body,
            }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': 'Bearer '+ accessToken },
                withCredentials: true
            },
        )
            
            .then((post) => {
                setPosts((posts) => [post, ...posts]);
                setTitle('');
                setBody('');
            })
            .catch((err) => {
                console.log(err.message);
            });
        
};

    return (
        <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src={userImg} alt="" />

            <form onSubmit={handleSubmit}>
            <input 
              placeholder="Que voulez vous exprimer ?"
              className="shareInput"

            />
            </form>
          </div>
          <hr className="shareHr"/>
          <div className="shareBottom">
              <div className="shareOptions">
                  <div className="shareOption">
                    
                      <span className="shareOptionText">Photo</span>
                  </div>
                  <div className="shareOption">
                      
                      <span className="shareOptionText">Tag</span>
                  </div>
              </div>
              <button className="shareButton" onClick={handleSubmit}>Partager</button>
          </div>
        </div>
      </div>
      
    );
  };

  export default Share;