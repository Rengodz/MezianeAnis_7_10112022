import axios from 'axios';
import { useState, useEffect } from 'react';
import Share from './Share';

const TOPICS_URL = 'http://localhost:5000/api/topics';
const accessToken = localStorage.getItem('accessToken');

const TopicList = () => {
  const [topics, setTopics] = useState([]);
  console.log("Fetching data...");
  const fetchData = async () => {
    try {
      const response = await axios.get(TOPICS_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTopics(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Fetching data...");
    fetchData();
  }, []);

  const handleAddTopic = (newTopic) => {
    setTopics([...topics, newTopic]);
  };

  console.log(topics);

  return (
    <div>
      <Share onAddTopic={handleAddTopic} />
      <ul>
        {topics.map((topic) => (
          <li key={topic._id}>{topic.topicText}</li>
        ))}
      </ul>
    </div>
  );
};

export default TopicList;




