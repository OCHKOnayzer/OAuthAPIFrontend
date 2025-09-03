import classes from '../style.module.css';
import Store from '../../../store';
import vkClasses from './style.module.css'

const VKIDAuthComponent = () => {
  const store = new Store();
  
  const VK_CLIENT_ID = '';
  const VK_REDIRECT_URI = '';
  const VK_SCOPE = "email phone";

  const refAuthVk = async () => {
    const codeVerifier = '';
    const codeChallenge = '';

    localStorage.setItem('code_verifier', codeVerifier);

    const vkAuthUrl = `https://id.vk.com/authorize?response_type=code&client_id=${VK_CLIENT_ID}&scope=${VK_SCOPE}&redirect_uri=${VK_REDIRECT_URI}&state=XXXRandomZZZ&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    window.location.href = vkAuthUrl;

    localStorage.setItem('provider', 'vk');
  };

  return (
    <div>
      <button className={`${classes.authBtn}  ${vkClasses.vkBtn}`} onClick={refAuthVk}>
        <div className={classes.btnContent}>
          <span>Войти через VkId</span>
        </div>
      </button>
    </div>
  );
};

export default VKIDAuthComponent;
