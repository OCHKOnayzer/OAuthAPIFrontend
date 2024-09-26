import { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false);
  const codeVerifier = 'FGH767Gd65'

  useEffect(() => {
    VKID.Config.init({
      app: '52336772',
      redirectUrl: 'https://main--transcendent-frangipane-30b77b.netlify.app',
      scope: 'email phone',
      codeVerifier:codeVerifier,
      state: 'dj29fnsadjsd82',
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;
    }

    // Проверяем код авторизации в URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const deviceId = urlParams.get('device_id');
    const state = urlParams.get('state');

    console.log("code:",code)
    console.log("deviceId:",deviceId)
    console.log("state:",state)

    if (deviceId) {
      console.log('Authorization code:', deviceId);

      store.loginWithVkId(deviceId,handleError)
      .then(() => {
        console.log('Авторизация прошла успешно');
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
