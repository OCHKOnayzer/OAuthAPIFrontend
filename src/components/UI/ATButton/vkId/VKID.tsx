import { useEffect } from 'react';
import classes from '../style.module.css';
import Store from '../../../store';

const VKIDAuthComponent = () => {
  const store = new Store();
  
  const VK_CLIENT_ID = '52336772';
  const VK_REDIRECT_URI = 'https://main--transcendent-frangipane-30b77b.netlify.app/vkIdTest';
  const VK_SCOPE = "email";

  // Функция для генерации code_verifier
  

  const refAuthVk = async () => {
    const codeVerifier = 'FGH767Gd65dsf76TgBh98vGFFDsF7GfEtr67gFGFufFGH767gd65dsf76TFggBh98vGbv';
    const codeChallenge = 'AXKbf0z9tG2lugDm9YKRmnmihXWuzOZAe3rLec3zVcI'; // Это заранее сгенерированное значение    

    // Сохраняем codeVerifier для последующего обмена на токены
    localStorage.setItem('code_verifier', codeVerifier);

    const vkAuthUrl = `https://id.vk.com/authorize?response_type=code&client_id=${VK_CLIENT_ID}&scope=${VK_SCOPE}&redirect_uri=${VK_REDIRECT_URI}&state=XXXRandomZZZ&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = vkAuthUrl;

    localStorage.setItem('provider', 'vk');
  };

  return (
    <div>
      <button className={`${classes.authBtn}`} onClick={refAuthVk}>
        <div className={classes.btnContent}>
          <span>Войти через VkId</span>
        </div>
      </button>
    </div>
  );
};

export default VKIDAuthComponent;
