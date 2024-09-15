import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../style.module.css';
import yaClasses from './style.module.css';
import vk from '../../../image/vk.svg';
import Store from '../../../store';  // Импортируем store

const handleError = () =>{ 

}

const ATYAbtn = () => {
  const clientId = 'c6de9c3e0c1341048fb7c790261852bd';
  const redirectUri = 'http://localhost:3000';  // Указываем URL для редиректа

  // Функция для начала OAuth авторизации
  const YandexOAuth = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  // Обрабатываем код после редиректа
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code:any = urlParams.get('code');
    console.log('Received code:', code);

    if (code) {
      // Передаем код в Store для авторизации
      Store.loginWithYandex(code,handleError, (error: any) => {
        console.error('Ошибка авторизации через Яндекс', error);
      })
        .then(() => {
         console.log()// После успешной авторизации можно перенаправить на главную страницу
        })
        .catch((error: any) => {
          console.error('Ошибка обработки авторизации', error);
        });
    }
  }, []);

  return (
    <div>
      <button className={`${classes.authBtn} ${yaClasses.yandexBtn}`} onClick={YandexOAuth}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
            <img src={vk} alt="Yandex logo" />
          </span>
          <span>Войти через Yandex</span>
        </div>
      </button>
    </div>
  );
};

export default ATYAbtn;
