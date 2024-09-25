import classes from './style.module.css';
import ATVKbtn from '../../UI/ATButton/vk/ATVKbtn';
import ATOKbtn from '../../UI/ATButton/ok/ATOKbtn';
import ATYAbtn from '../../UI/ATButton/ya/ATYAbtn';
import VKIDAuthComponent from '../../UI/ATButton/vkId/VKID';
import ATMLbtn from '../../UI/ATButton/ml/ATMLbtn';
import { useEffect, useState } from 'react';


const Login = () => {
  
  function generateCodeVerifier() {
    const array = new Uint8Array(128); // длина массива 128 байт
    window.crypto.getRandomValues(array);
    
    // Преобразуем Uint8Array в обычный массив чисел
    return btoa(String.fromCharCode.apply(null, Array.from(array)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, ''); // URL-safe Base64
}
      const [deviceId, setDeviceId] = useState<string>('');

      useEffect(() => { 
        // Генерация deviceId, если его нет
        const newDeviceId = generateCodeVerifier(); // Используем случайную строку как deviceId
      
        setDeviceId(newDeviceId);
        localStorage.setItem('device_id', newDeviceId); // Сохраняем новое значение в localStorage

        console.log("hello world:", deviceId); // Логируем новое значение deviceId

      },[])
 

  return (
    <div className={classes.authContainer}>
      
      <h1 className={classes.authTitle}>Войти через социальные сети</h1>

      <div className={classes.authButtons}>
        <VKIDAuthComponent/>     
        <ATVKbtn/>  
        <ATOKbtn/>
        <ATYAbtn/>
        <ATMLbtn/>
      </div>
      
    </div>
  );
};

export default Login;