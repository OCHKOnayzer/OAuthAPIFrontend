import { useEffect, useRef, useState } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false);
  const [deviceId, setDeviceId] = useState<string>('');

  const generateDeviceId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      setDeviceId(v.toString(16));
      return v.toString(16);
    });
  };

  useEffect(() => {
    generateDeviceId();

    VKID.Config.init({
      app: '52359597',
      redirectUrl: 'https://main--transcendent-frangipane-30b77b.netlify.app/',
      scope: 'email phone',
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;

      // Обработка результата авторизации
    oneTap.on('login', (payload) => {
      console.log('Payload:', payload);
      store.loginWithVkId(payload, deviceId, handleError);
    });

    // Проверка ошибок авторизации
    oneTap.on('error', (error) => {
      console.error('Ошибка авторизации VK ID:', error);
    });
    }
  }, [store]);

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
