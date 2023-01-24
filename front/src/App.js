import { Routes, Route } from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import TopicList from './components/TopicList';
import Register from './components/Register';

function App() {
  return (
    <main className="App">
      <Header />
      <Routes>
      <Route path="/" element={<Register />}></Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="topic" element={<TopicList />}></Route>
      </Routes>
      <Footer />
      
    </main>
  );
}

export default App;