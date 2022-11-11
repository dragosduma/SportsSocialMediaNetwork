import { Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Users from './components/Users';
function App() {
  return (
    <div>
      <Route path="/welcome">
        <Welcome />
      </Route>
      <Route path="/users">
        <Users />
      </Route>
    </div>
  );
}

export default App;
