import { useEffect, useRef, useState } from 'react';
import * as VKID from '@vkid/sdk';
import Store from '../../../store';

// Функция для генерации случайного code_verifier
function generateCodeVerifier() {
  const array = new Uint8Array(128); // длина массива 128 байт
  window.crypto.getRandomValues(array);
  
  // Преобразуем Uint8Array в обычный массив чисел
  return btoa(String.fromCharCode.apply(null, Array.from(array)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // URL-safe Base64
}
// Функция для создания code_challenge (SHA256 хэш от code_verifier)
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  // Преобразуем Uint8Array в обычный массив чисел
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(digest))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, ''); // URL-safe Base64
}

const VKIDAuthComponent = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const store = new Store();
  const oneTapInitialized = useRef(false);

  const [codeVerifier, setCodeVerifier] = useState<string>(''); // Состояние для хранения code_verifier

  useEffect(() => {
   

    // Генерация code_verifier
    const verifier = generateCodeVerifier();
    setCodeVerifier(verifier);

    // Генерация code_challenge из code_verifier
    generateCodeChallenge(verifier).then((codeChallenge) => {
      // Инициализация VKID SDK с использованием code_challenge
      VKID.Config.init({
        app: '52336772',
        redirectUrl: 'https://main--transcendent-frangipane-30b77b.netlify.app',
        scope: 'email phone',
        codeChallenge: codeChallenge, // Передаем code_challenge в VKID SDK
        codeChallengeMethod: 'S256', // Метод хеширования (SHA256)
      }as any);
    });

    if (!oneTapInitialized.current && containerRef.current) {
      const oneTap = new VKID.OneTap();
      oneTap.render({ container: containerRef.current });
      oneTapInitialized.current = true;

      // Обработка результата авторизации
      oneTap.on('login', (payload) => {
        console.log('Payload:', payload);
        store.loginWithVkId(payload, codeVerifier, handleError);
      });

      // Проверка ошибок авторизации
      oneTap.on('error', (error) => {
        console.error('Ошибка авторизации VK ID:', error);
      });
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
