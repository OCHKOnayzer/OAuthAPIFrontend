import React,{FC} from 'react';
import classes from '../style.module.css';
import okClasses from './style.module.css'
import ok from '../../../image/ok.svg';

const ATOKbtn = () => {

  const VK_CLIENT_ID = '';
  
  const VK_REDIRECT_URI = '';

  const refAuthVk = () => { 

    const vkAuthUrl = ''

    window.location.href = vkAuthUrl;

  }

  return (
    <div>
      <button className={`${classes.authBtn} ${okClasses.okBtn}`} onClick={refAuthVk}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
            <img src={ok} alt="" />
          </span>
          <span>Войти через ОK</span>
        </div>
       
      </button>
    </div>
  )
}

export default ATOKbtn