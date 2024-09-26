import React, { useEffect } from 'react'
import Store from '../../store';
const VkIdAuthTest = () => {

    const store = new Store();

    useEffect(()=>{ 
        const codeVerifier = 'FGH767Gd65dsf76TgBh98vGFFDsF7GfEtr67gFGFufFGH767gd65dsf76TFggBh987G45';
        const codeChallenge = 'icgH8-mkuhuYFnqQMvD9SyLWwFsxjhWo0tBy3BU0jFs'; // Это заранее сгенерированное значение   

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const deviceId = urlParams.get('device_id');
        const state = urlParams.get('state');
    
        console.log('code:', code);
        console.log('deviceId:', deviceId);
        console.log('state:', state);

        if (code&&deviceId&&state) {
        store.loginWithVkId(code,deviceId,state,codeVerifier,handleError)
            .then(() => {
            console.log('Авторизация прошла успешно');
            })
            .catch((error: any) => {
            console.error('Ошибка обработки авторизации', error);
            });
        } else {
        console.error('Authorization code not found in URL.');
        }

    },[])

    const handleError = (error: any) => {
        console.error('Ошибка авторизации VK ID:', error);
    };


  return (
    <div>hello world</div>
  )
}

export default VkIdAuthTest