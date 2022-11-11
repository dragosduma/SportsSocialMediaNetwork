import { Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Users from './pages/Users';
import MainHeader from './components/MainHeader';

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </main>
    </div>
  );
}

export default App;
