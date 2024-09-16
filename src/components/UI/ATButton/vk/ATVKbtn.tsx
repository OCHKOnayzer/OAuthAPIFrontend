import React,{FC, useEffect} from 'react';
import classes from '../style.module.css';
import vkClasses from './style.module.css'
import vk from '../../../image/vk.svg';
import Store from '../../../store';

const ATVKbtn = () => {

  

  const handleError = () =>{ 

  }

  const VK_CLIENT_ID = '52310644';
  
  const VK_REDIRECT_URI = 'https://427e-88-80-62-218.ngrok-free.app';

  const VK_SCOPE = 'email,profile,phone,offline';

  const refAuthVk = () => { 

    const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URI}&scope=${VK_SCOPE}&response_type=code&v=5.131`;

    window.location.href = vkAuthUrl;

  }
  const urlParams = new URLSearchParams(window.location.search);
  const code: string | null = urlParams.get('code');

  if (code) {
    
    window.localStorage.setItem('auth_code', code);

    const auth_code = window.localStorage.getItem('auth_code');

    console.log(auth_code)

    Store.loginWithVk(auth_code, handleError)
      .then(() => {
        console.log('Авторизация прошла успешно');

      })
      .catch((error: any) => {
        console.error('Ошибка обработки авторизации', error);
      });
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