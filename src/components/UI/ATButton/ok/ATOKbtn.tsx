import React, { useEffect } from 'react';
import classes from '../style.module.css';
import okClasses from './style.module.css'
import ok from '../../../image/ok.svg';
import Store from '../../../store';

const ATOKbtn = () => {

  const handleError = () => { }

  const OK_CLIENT_ID = '512002515808';
  const OK_REDIRECT_URI = 'http://localhost:3000';
  const OK_SCOPE = 'VALUABLE_ACCESS';
  const OK_LAYOUT = 'w';
  const response_type = 'code';  

  const refAuthOk = () => {
    const okAuthUrl = `https://connect.ok.ru/oauth/authorize?client_id=${OK_CLIENT_ID}&scope=${OK_SCOPE}&response_type=${response_type}&redirect_uri=${encodeURIComponent(OK_REDIRECT_URI)}&layout=${OK_LAYOUT}`;

    window.location.href = okAuthUrl;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const code: string | null = urlParams.get('code');

  if (code) {
    console.log('Received code:', code);
    Store.loginWithOk(code, handleError)
      .then(() => {
        console.log('Авторизация прошла успешно');
        
      })
      .catch((error: any) => {
        console.error('Ошибка обработки авторизации', error);
      });
  } else {
    console.log('Code не найден');
  }

  return (
    <div>
      <button className={`${classes.authBtn} ${okClasses.okBtn}`} onClick={refAuthOk}>
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

export default ATOKbtn;
