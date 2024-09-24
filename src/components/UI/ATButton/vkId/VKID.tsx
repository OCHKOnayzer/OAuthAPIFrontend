import { useEffect, useRef, useState } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false);

  const [deviceId , setDeviceId] = useState<string>('')

  const generateDeviceId = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0,
          v = c === 'x' ? r : (r & 0x3) | 0x8;
          
          setDeviceId(v.toString(16))
          return v.toString(16);
        
      });
    };

   

  useEffect(() => {

    console.log("device:",deviceId)

    generateDeviceId()

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

    // Проверяем код авторизации в URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
      console.log('Authorization code:', code);

      // Удаляем код из URL после обработки
      window.history.replaceState({}, document.title, window.location.pathname);

      store.loginWithVkId(code, deviceId, handleError);
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
