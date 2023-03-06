import { Route , Switch} from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import TopicList from './components/TopicList';
import Register from './components/Register';

function App() {
  return (
    <main className="App">
      <Header />

      <Switch>

      <Route exact path="/">

       <Register />

       </Route>

      <Route path="/login">

       <Login />

       </Route>

      <Route path="/topic">
        <TopicList />
        </Route>

      </Switch>
      
      <Footer />
      
    </main>
  );
}

export default App;