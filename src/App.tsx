import React,{useContext} from 'react';
import { Route, Routes } from "react-router-dom";
import { Context } from '.';
import Login from './components/page/login/Login';
import Profile from './components/page/profile/Profile';
function App() {

  const {store} = useContext(Context)

  return (
    <div className="App">
      <Routes>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/" element={<Login/>}/>

      </Routes>
      рудд
    </div>
  );
}

export default App;
