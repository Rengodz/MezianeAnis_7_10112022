import React from 'react';
import axios from 'axios';


export default class TopicList extends React.Component {
  state = {
    topics: []
  }
  
  componentDidMount() {

    const useToken = JSON.parse(sessionStorage.getItem('jwt'));
    const token = useToken;
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

