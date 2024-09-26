import { useEffect } from 'react';
import classes from '../style.module.css';
import okClasses from './style.module.css';
import Store from '../../../store';

const ATOKbtn = () => {

  const handleError = () => {
    // Обработка ошибок
  };

  const store = new Store();

  const refAuthOk = () => {
    const OK_CLIENT_ID = '512002515808';
    const OK_REDIRECT_URI = 'http://localhost:3000';
    const OK_SCOPE = 'GET_EMAIL';
    const OK_LAYOUT = 'w';
    const response_type = 'code';  

    const okAuthUrl = `https://connect.ok.ru/oauth/authorize?client_id=${OK_CLIENT_ID}&scope=${OK_SCOPE}&response_type=${response_type}&redirect_uri=${encodeURIComponent(OK_REDIRECT_URI)}&layout=${OK_LAYOUT}`;
    
    window.location.href = okAuthUrl;


    const provider = 'okAuth'

    localStorage.setItem('provider', provider)

  };

  useEffect(() => {
   
    const urlParams = new URLSearchParams(window.location.search);
    const code: string | null = urlParams.get('code');

    const parametr = localStorage.getItem('provider')

    if(parametr === 'okAuth'){

      if (code) {
        
        store.loginWithOk(code, handleError)
          .then(() => {
            console.log('Авторизация прошла успешно');

            localStorage.removeItem('provider');

            setTimeout(()=>{ 

              window.location.href = '/'
            },100)
            console.log(store.isAuth)

          })
          .catch((error: any) => {
            console.log(store.isAuth)
            console.error('Ошибка обработки авторизации', error);
          });
      }else{
        console.log('code bam bam:',code);
      }
    }
    
  }, [store]);

  return (
    <div>
      <button className={`${classes.authBtn} ${okClasses.okBtn}`} onClick={refAuthOk}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
          </span>
          <span>Войти через OK</span>
        </div>
      </button>
    </div>
  );
};

export default ATOKbtn;
