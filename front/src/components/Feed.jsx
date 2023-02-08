import Post from "../post/Post";
import "./Feed.css";
import TopicList from "./TopicList";

export default function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <TopicList />
        {this.state.topics.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}