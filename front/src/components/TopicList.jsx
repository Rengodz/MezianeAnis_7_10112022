import React from 'react';
import axios from 'axios';


export default class TopicList extends React.Component {
  state = {
    topics: []
  }
  
  componentDidMount() {

    let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzhmOWIyYzE1ZGFhN2ZiNzFkYjlhNmEiLCJpYXQiOjE2NzAzNTU3NzAsImV4cCI6MTY3MDQ0MjE3MH0.5jNuGZxXCl5EXKj8k2kxUZxcpkXB-X92nL-6Bz576lM';
    const instance = axios.create({
      baseURL: 'http://localhost:5000/api/',
      timeout: 1000,
      headers: {'Authorization': 'Bearer '+token}
    
    });

    instance.get('/topics')
    .then(response => {
      const topics = response.data;
      console.log(topics);
      this.setState({ topics });
    })

  }

  render() {
    return (
      <ul>
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

