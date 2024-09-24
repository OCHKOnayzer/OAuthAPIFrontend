import { useEffect, useState } from 'react';
import classes from '../style.module.css';
import yaClasses from './style.module.css';
import Store from '../../../store';

const ATYAbtn = () => {

  const [goData,setGoData] = useState<boolean>(false)

  const store = new Store();

  const handleError = () =>{ 

  }

  const clientId = 'c6de9c3e0c1341048fb7c790261852bd';
  const redirectUri = 'http://localhost:3000';

  const YandexOAuth = () => {
    const authUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;

    setGoData(prev=> !prev)

    const provider = 'yandex'

    localStorage.setItem('provider', provider)

  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code:any = urlParams.get('code');

    const parametr = localStorage.getItem('provider')

    if(parametr === 'yandex'){ 
      if (code) {
        store.loginWithYandex(code,handleError)
          .then(() => {
            console.log(code)
            window.location.href = '/'
          })
          .catch((error: any) => {
            console.error('Ошибка обработки авторизации', error);
          });
      }
    }
  }, []);

  return (
    <div>
      <button className={`${classes.authBtn} ${yaClasses.yandexBtn}`} onClick={YandexOAuth}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
            
          </span>
          <span>Войти через Yandex</span>
        </div>
      </button>
    </div>
  );
};

export default ATYAbtn;
