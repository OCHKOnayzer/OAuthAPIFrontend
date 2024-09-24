// types/mailru-sdk.d.ts
interface MRLoginState {
    user?: {
      id: string;
      email: string;
      // Дополнительные поля, если они есть в объекте пользователя
    };
    // Любые другие свойства, которые могут быть в состоянии авторизации
  }
  
  interface MRSDK {
    init: (config: {
      client_id: string;
      onlogin: (state: MRLoginState) => void;
      onlogout: () => void;
    }) => void;
  }
  
  // Добавляем объект MR к глобальному объекту Window
  interface Window {
    MR?: MRSDK;
  }
  