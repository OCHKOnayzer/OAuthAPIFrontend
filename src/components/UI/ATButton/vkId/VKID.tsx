import { useEffect, useRef, useState } from 'react';
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
      state: 'udhslldsxh56jzx',
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;

      oneTap.on('login', async (payload) => {
        console.log('Payload:', payload);
        const { code, device_id } = payload; // Получаем code и device_id
        
        // Обмен code на токены
        const tokenResponse = await store.exchangeCode(code, device_id);
        const { access_token } = tokenResponse; // Получаем access_token

        // Получаем информацию о пользователе
        const userInfo = await store.loginWithVkId(access_token);
        console.log('User Info:', userInfo);
      });

      oneTap.on('error', (error) => {
        console.error('Ошибка авторизации VK ID:', error);
      });
    }
  }, []);

  return <div ref={containerRef}></div>;
};

export default VKIDAuthComponent;
