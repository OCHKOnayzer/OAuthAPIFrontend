import { createContext, useContext } from 'react';
import Store from '.';

const store = new Store(); // Создаем экземпляр Store

export const StoreContext = createContext<Store>(store);

export const useStore = () => {
    return useContext(StoreContext);
};
