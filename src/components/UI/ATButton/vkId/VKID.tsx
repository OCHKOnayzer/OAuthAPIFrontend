import React, { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false);

  useEffect(() => {

    VKID.Config.init({
      app: '52336772', // Идентификатор приложения.
      redirectUrl: 'https://e35f-92-39-220-81.ngrok-free.app', // Адрес для перехода после авторизации.
      state: 'dj29fnsadjsd82', // Произвольная строка состояния приложения.
      codeVerifier: 'FGH767Gd65', // Верификатор в виде случайной строки. Обеспечивает защиту передаваемых данных.
      scope: 'email phone', // Список прав доступа, которые нужны приложению.

    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;
    }

    // Проверяем код авторизации в URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log('Authorization code:', code);

      // Удаляем код из URL после обработки
      window.history.replaceState({}, document.title, window.location.pathname);

      
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

