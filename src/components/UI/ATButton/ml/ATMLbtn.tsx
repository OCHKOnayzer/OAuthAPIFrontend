import { useEffect } from 'react';
import classes from '../style.module.css';
import mlClasses from './style.module.css';
import Store from '../../../store';

const ATMLbtn = () => {
  const handleError = () => {
   
  };

  const store = new Store();

  const Mail_CLIENT_ID = '91bdcb05404e4dad9fdee6d080c7426c';
  const Mail_REDIRECT_URI = 'http://localhost:3000';

  const refAuthMailRu = () => {
    const mailAuthUrl = `https://oauth.mail.ru/login?client_id=${Mail_CLIENT_ID}&response_type=code&scope=userinfo,contacts&redirect_uri=${Mail_REDIRECT_URI}&state=some_state`;
    window.location.href = mailAuthUrl;   
    
    const provider = 'mailrus'

    localStorage.setItem('provider', provider)
    
  };

  useEffect(() => {
    const hashParams = new URLSearchParams(window.location.search.substring(1));
    const code = hashParams.get('code');

    const parametr = localStorage.getItem('provider')

    if(parametr === 'mailrus'){

      console.log('code mail ru:', code);

    if (code) {
    
      store.loginWithMailRu(code, handleError)
        .then(() => {
          setTimeout(()=>{ 
            window.location.href = '/'
          },100)
          console.log(store.isAuth)
          
        })
        .catch((error: any) => {
          console.error('Ошибка обработки авторизации', error);
        });
    }
  }
  }, [store]);

  return (
    <div>
      <button className={`${classes.authBtn} ${mlClasses.mailBtn}`} onClick={refAuthMailRu}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
          </span>
          <span>Войти через Mail.ru</span>
        </div>
      </button>
    </div>
  );
};

export default ATMLbtn;
