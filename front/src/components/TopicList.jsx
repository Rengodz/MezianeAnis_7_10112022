import React from 'react';
import axios from 'axios';
import Share from './Share';
import Post from './Post';
import { useEffect, useState } from "react";

const TOPICS_URL = 'http://localhost:5000/api/topics';

const accessToken = localStorage.getItem('accessToken');

console.log(accessToken);



export default class TopicList extends React.Component {
  state = {
    topics: []
  }
  
  
  componentDidMount() {
  
    const instance = axios.create({
      baseURL: 'http://localhost:5000/api/',
      timeout: 1000,
      headers: {'Authorization': 'Bearer '+ accessToken}
    
    });

    instance.get(TOPICS_URL)
    .then(response => {
      const topics = response.data;
      console.log(topics);
      this.setState({ topics });
    })

  }


  render() {
    return (
      <ul className="toto">
        <Share/>
        {
          this.state.topics
            .map(topic =>
              <li key={topic._id}>{topic.topicText}</li>
            )
        }
      </ul>
    )
  }
}

