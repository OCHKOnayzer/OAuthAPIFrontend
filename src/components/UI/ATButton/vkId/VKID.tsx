import React, { useEffect, useRef } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false); // Флаг для проверки инициализации OneTap

  useEffect(() => {
    VKID.Config.init({
      app: '52336772',
      redirectUrl: 'https://e35f-92-39-220-81.ngrok-free.app',
      scope: 'email phone',
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;
    }

    // Извлечение кода авторизации из URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code'); // Извлечение параметра code

    if (code) {
      console.log('Authorization code:', code);

      // Отправляем код на сервер для обмена на токены
      store.loginWithVkId(code, handleError);
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
