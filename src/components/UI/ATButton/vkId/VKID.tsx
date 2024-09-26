import { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false);

  useEffect(() => {
    VKID.Config.init({
      app: '52336772',
      redirectUrl: 'https://main--transcendent-frangipane-30b77b.netlify.app',
      scope: 'email phone',
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;
    }

    // Проверяем код авторизации в URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('device_id');
    if (code) {
      console.log('Authorization code:', code);

      store.loginWithVkId(code,deviceId,state,handleError)
      .then(() => {
        console.log('Авторизация прошла успешно');
        setTimeout(()=>{ 
          window.location.href = '/'
        },100)   
      })
      .catch((error: any) => {
        console.error('Ошибка обработки авторизации', error);
      });
      
    } else {
      console.error('Authorization code not found in URL.');
    }
  }, []);

  const handleError = (error: any) => {
    console.error('Ошибка авторизации VK ID:', error);
  };

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default VKIDAuthComponent;
