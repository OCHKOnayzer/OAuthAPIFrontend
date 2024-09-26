import { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  // const store = new Store();
  const oneTapInitialized = useRef(false);
  const codeVerifier = 'FGH767Gd65dsf76TgBh98vGbvDsF7GhEtr67GtRf';

  useEffect(() => {
    // Инициализация конфигурации VK ID SDK
    VKID.Config.init({
      app: '52336772',
      redirectUrl: 'https://main--transcendent-frangipane-30b77b.netlify.app',
      scope: 'email phone',
      codeVerifier: codeVerifier,
      state: 'dj29fnsadjsd82',
    });

    // Инициализация One Tap только один раз
    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current })
        .on(VKID.WidgetEvents.ERROR, (error) => {
          console.error('Ошибка рендеринга One Tap:', error);
        });
      oneTapInitialized.current = true;
    }

    // Проверка кода авторизации и обработка ответ
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const deviceId = urlParams.get('device_id');
    const state = urlParams.get('state');
  
    console.log('code:', code);
    console.log('deviceId:', deviceId);
    console.log('state:', state);

    // if (code&&deviceId&&state) {
    //   store.loginWithVkId(code,deviceId,state,handleError)
    //     .then(() => {
    //       console.log('Авторизация прошла успешно');
    //     })
    //     .catch((error: any) => {
    //       console.error('Ошибка обработки авторизации', error);
    //     });
    // } else {
    //   console.error('Authorization code not found in URL.');
    // }
  }, []);

  // const handleError = (error: any) => {
  //   console.error('Ошибка авторизации VK ID:', error);
  // };

  return (
    <div>
      <div ref={containerRef}></div>
    </div>
  );
};

export default VKIDAuthComponent;
