import React from 'react';
import axios from 'axios';

export default class TopicList extends React.Component {
  state = {
    topics: []
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/api/topics`)
      .then(res => {
        const topics = res.data;
        this.setState({ topics });
      })
  }

  render() {
    return (
      <ul>
        {
          this.state.topics
            .map(topic =>
              <li key={'62b1cd1506cc4bc8aa42bd43'}></li>
            )
        }
      </ul>
    )
  }
}

