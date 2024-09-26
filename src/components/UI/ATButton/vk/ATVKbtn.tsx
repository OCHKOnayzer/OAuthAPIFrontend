import { useEffect } from 'react';
import classes from '../style.module.css';
import vkClasses from './style.module.css';
import Store from '../../../store';

const ATVKbtn = () => {

  const store = new Store()

  const handleError = () =>{ 

  }

  const VK_CLIENT_ID = '52310644';
  
  const VK_REDIRECT_URI = 'https://8d47-92-39-220-81.ngrok-free.app';

  const VK_SCOPE = "email";

  const refAuthVk = () => { 

    const vkAuthUrl = `https://oauth.vk.com/authorize?client_id=${VK_CLIENT_ID}&display=page&redirect_uri=${VK_REDIRECT_URI}&scope=${VK_SCOPE}&response_type=code&v=5.131`;

    window.location.href = vkAuthUrl;
  
    const provider = 'vk'

    localStorage.setItem('provider', provider)
   
  }

  useEffect(()=>{ 

    const urlParams = new URLSearchParams(window.location.search);
    const code: string | null = urlParams.get('code');
  
    
    // const parametr = localStorage.getItem('provider')
    if (code) {
      
      window.localStorage.setItem('auth_code', code);
  
      const auth_code = window.localStorage.getItem('auth_code');
  
      console.log(auth_code)
  
      store.loginWithVk(code, handleError)
        .then(() => {
          console.log('Авторизация прошла успешно');
          setTimeout(()=>{ 
            window.location.href = '/'
          },100)   
        })
        .catch((error: any) => {
          console.error('Ошибка обработки авторизации', error);
        });
    }
  },[store])

  return (
    <div>
      <button className={`${classes.authBtn} ${vkClasses.vkBtn}`} onClick={refAuthVk}>
        <div className={classes.btnContent}>
          <span className={classes.logoWrapper}>
          </span>
          <span>Войти через Vk</span>
        </div>
       
      </button>
    </div>
  )
}

export default ATVKbtn