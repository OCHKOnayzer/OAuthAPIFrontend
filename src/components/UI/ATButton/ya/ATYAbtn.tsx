import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from '../style.module.css';
import yaClasses from './style.module.css';
import vk from '../../../image/vk.svg';
import Store from '../../../store';



const ATYAbtn = () => {

  const [goData,setGoData] = useState<boolean>(false);

  const handleError = () =>{ 

  }

  const clientId = 'c6de9c3e0c1341048fb7c790261852bd';
  const redirectUri = 'http://localhost:3000';

  const YandexOAuth = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;

    setGoData(prev=> !prev)

  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code:any = urlParams.get('code');
    console.log('Received code:', code);

    if (code) {

      Store.loginWithYandex(code,handleError)
        .then(() => {
         console.log(code)
        })
        .catch((error: any) => {
          console.error('Ошибка обработки авторизации', error);
        });
    }
  }, [goData]);

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
