import React,{FC} from 'react';
import classes from '../style.module.css';
import mlClasses from './style.module.css'
import vk from '../../../image/vk.svg';

const ATMLbtn = () => {

  const VK_CLIENT_ID = '';
  
  const VK_REDIRECT_URI = '';

  const refAuthVk = () => { 

    const vkAuthUrl = ''

    window.location.href = vkAuthUrl;

  }

  return (
    <div>
      <button className={`${classes.authBtn} ${mlClasses.mailBtn}`} onClick={refAuthVk}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
            <img src={vk} alt="" />
          </span>
          <span>Войти через Mail.ru</span>
        </div>
       
      </button>
    </div>
  )
}

export default ATMLbtn