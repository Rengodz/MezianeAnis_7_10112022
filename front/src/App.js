import { Route, Switch, Redirect } from 'react-router-dom';
import { useState , useEffect} from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import TopicList from './components/TopicList';
import Register from './components/Register';
import Profil from './components/Profil';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setLoggedIn(true);
    }
  }, []);


  return (
    <main className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          {loggedIn ? (
            <Redirect to="/topics" />
          ) : (
            <Register setLoggedIn={setLoggedIn} />
          )}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/topics">
          <TopicList />
        </Route>

        <Route path="/profile">
          <Profil />
        </Route>
      </Switch>
      <Footer />
    </main>
  );
}

export default App;
