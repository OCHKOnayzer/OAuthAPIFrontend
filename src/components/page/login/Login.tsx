import classes from './style.module.css';
import ATVKbtn from '../../UI/ATButton/vk/ATVKbtn';
import ATOKbtn from '../../UI/ATButton/ok/ATOKbtn';
import ATYAbtn from '../../UI/ATButton/ya/ATYAbtn';
import VKIDAuthComponent from '../../UI/ATButton/vkId/VKID';
import ATMLbtn from '../../UI/ATButton/ml/ATMLbtn';

const Login = () => {
  return (
    <div className={classes.authContainer}>
      
      <h1 className={classes.authTitle}>Войти через социальные сети</h1>

      <div className={classes.authButtons}>
        
        {/* <VKIDAuthComponent/>      */}
        <ATVKbtn/>  
        <ATOKbtn/>
        <ATYAbtn/>
        <ATMLbtn/>
      </div>
      
    </div>
  );
};

export default Login;