import React,{useContext} from 'react';
import { Context } from '.';
import Login from './components/page/login/Login';
function App() {

  const {store} = useContext(Context)

  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
