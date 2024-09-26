import {useContext} from 'react';
import { Route, Routes } from "react-router-dom";
import Login from './components/page/login/Login';
import Profile from './components/page/profile/Profile';
import { StoreContext } from '.';
import { observer } from "mobx-react-lite";
import VkIdAuthTest from './components/page/login/VkIdAuthTest';

function App() {

  const store = useContext(StoreContext);



  console.log()

  if(store.isAuth === false){ 
    return (
      <div>
        <Routes>
        <Route path='/VkIdTest' element={<VkIdAuthTest/>}/>
        <Route path="/" element={<Login/>}/>
          
        </Routes>
      </div>
    ) 
  }else{ 
    return (
      <div className="App">
        <Routes>
        
          <Route path="/" element={<Profile/>}/>

        </Routes>
      </div>
    );

  }

  
}

export default observer(App);
