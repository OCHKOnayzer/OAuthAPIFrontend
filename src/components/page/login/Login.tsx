import React from 'react';
import classes from './style.module.css';
import coin from '../../image/coin.png';
import ATVKbtn from '../../UI/ATButton/vk/ATVKbtn';
import ATOKbtn from '../../UI/ATButton/ok/ATOKbtn';
import ATYAbtn from '../../UI/ATButton/ya/ATYAbtn';
import ATMLbtn from '../../UI/ATButton/ml/ATMLbtn';
const Login = () => {
  return (
    <div className={classes.authContainer}>
      <div className={classes.authLogo}>
        <img src={coin} alt="Logo" />
      </div>
      <h1 className={classes.authTitle}>Войти через социальные сети</h1>

      <div className={classes.authButtons}>
        {/* <ATVKbtn/>  
        <ATOKbtn/> */}
        <ATYAbtn/>
        {/* <ATMLbtn/> */}
      </div>
      <div className={classes.authFooter}>
        <a href="/privacy-policy">Политика конфиденциальности</a> |{' '}
        <a href="/terms">Условия использования</a>
      </div>
    </div>
  );
};

export default Login;