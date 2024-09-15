import React,{FC} from 'react';
import classes from '../style.module.css';
import vkClasses from './style.module.css'
import vk from '../../../image/vk.svg';

const ATVKbtn = () => {

  const VK_CLIENT_ID = '';
  
  const VK_REDIRECT_URI = '';

  const refAuthVk = () => { 

    const vkAuthUrl = ''

    window.location.href = vkAuthUrl;

  }

  return (
    <div>
      <button className={`${classes.authBtn} ${vkClasses.vkBtn}`} onClick={refAuthVk}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
            <img src={vk} alt=""/>
          </span>
          <span>Войти через Vk ID</span>
        </div>
       
      </button>
    </div>
  )
}

export default ATVKbtn