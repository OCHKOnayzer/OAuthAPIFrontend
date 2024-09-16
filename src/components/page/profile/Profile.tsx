// Profile.jsx
import React from 'react';
import classes from './style.module.css';

const Profile = () => {
  const handleLogout = () => {
    // Логика выхода из системы
    console.log('Выход из системы');
  };

  return (
    <div className={classes.profileContainer}>
      <div className={classes.profileCard}>
        <div className={classes.profileTitle}>Профиль пользователя</div>
        <div className={classes.profileDetails}>
          <div>
            <strong>Имя:</strong> 
          </div>
          <div>
            <strong>Фамилия:</strong> 
          </div>
          <div>
            <strong>Телефон:</strong>
          </div>
          <div>
            <strong>Почта:</strong>
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
