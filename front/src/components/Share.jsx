import React from "react";
import axios from "axios";
import "./Share.css";

const userImg = require('./fleur.jpg');
const POST_URL = 'http://localhost:5000/api/topics';
const handleSubmit = async (e) => {
    e.preventDefault();
        const response = await axios.post(POST_URL,
            JSON.stringify({  }),
            {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                withCredentials: true
            }
        );
        localStorage.setItem('accessToken', response?.data.token);
    
}

export default function Share() {
    return (
        <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img className="shareProfileImg" src={userImg} alt="" />
            <input
              placeholder="Que voulez vous exprimer ?"
              className="shareInput"
            />
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
              <button className="shareButton">Partager</button>
          </div>
        </div>
      </div>
      
    );
  }