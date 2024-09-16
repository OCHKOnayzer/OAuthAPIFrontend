import React,{FC, useEffect} from 'react';
import classes from '../style.module.css';
import vkClasses from './style.module.css'
import vk from '../../../image/vk.svg';
import Store from '../../../store';

const ATVKbtn = () => {

  const handleError = () =>{ 

  }

  const VK_CLIENT_ID = '52310644';
  
  const VK_REDIRECT_URI = 'https://3ce2-88-80-62-218.ngrok-free.app';

  const VK_SCOPE = 'email,profile,phone,offline';

  const refAuthVk = () => { 

    const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URI}&scope=${VK_SCOPE}&response_type=code&v=5.131`;

    // Редирект на ВКонтакте для авторизации
    window.location.href = vkAuthUrl;

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code: string | null = urlParams.get('code');
  
    if (code) {
      // Передаем код в Store для авторизации
      Store.loginWithYandex(code, handleError)
        .then(() => {
          console.log('Авторизация прошла успешно');
          // Перенаправляем на основной сайт после успешной авторизации
          window.location.href = 'http://localhost:3000'; // Замените на ваш основной URL
        })
        .catch((error: any) => {
          console.error('Ошибка обработки авторизации', error);
        });
    }
  }, []);

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