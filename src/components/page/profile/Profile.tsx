import { useContext } from 'react';
import classes from './style.module.css';
import { StoreContext } from '../../..';
import { IUser } from '../../../types/IUser';

const Profile = () => {

  const store = useContext(StoreContext);

  const handleLogout = () => {
    
    store.logOut()

    console.log('Выход из системы');
  };


  const user: IUser = store.user;
  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileCard}>
        <div className={classes.profileTitle}>Профиль пользователя</div>
        <div className={classes.profileDetails}>
          <div>
            <strong>Имя:{store.user.first_name}</strong> 
          </div>
          <div>
            <strong>Фамилия:{user.last_name}</strong> 
          </div>
          <div>
            <strong>Телефон:{user.number}</strong>
          </div>
          <div>
            <strong>Почта:{user.email}</strong>
          </div>
        </div>
        <button className={classes.logoutButton} onClick={handleLogout}>
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Profile;
