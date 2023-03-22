import axios from 'axios';
import { useState, useEffect } from 'react';
import Share from './Share';
import Topic from './Topic';

const TOPICS_URL = 'http://localhost:5000/api/topics';
const accessToken = localStorage.getItem('accessToken');

const TopicList = () => {
  const [topics, setTopics] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(TOPICS_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log('response data:', response.data);
      const sortedTopics = response.data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
      console.log('sorted topics:', sortedTopics);
      setTopics(sortedTopics);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };

  const handleRemoveTopic = (id) => {
    setTopics(topics.filter((topic) => topic._id !== id));
  };

  return (
    <div>
      <Share onAddTopic={handleAddTopic} />
      <ul>
        {topics.map((topic) => (
          <Topic key={topic._id} topic={topic} onRemoveTopic={handleRemoveTopic} />
        ))}
      </ul>
    </div>
  );
};

export default TopicList;