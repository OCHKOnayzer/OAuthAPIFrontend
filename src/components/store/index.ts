import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import { AUTH_API_URL } from "../http";

interface IUser {
    id?: number;
    username?: string;
    email?: string;
    [key: string]: any;
}

export default class Store {
    user: IUser = {};
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);

    }

    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

    async checkAuth(): Promise<void> {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const response = await axios.get(`${AUTH_API_URL}/refresh`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
            }
        } catch (e) {
            console.log(e);
        }
    }

    // Статический метод, которому передается экземпляр Store
    static async loginWithYandex( code: any, handleError: (error: any) => void): Promise<void> {
        
        console.log('code:',code)

        try {
            const response = await AuthService.yandexLogin(code);
            console.log('Response from Yandex login:', response);  // Вывод ответа для отладки
           
        } catch (e) {
            console.log(e);
            handleError(e);
        }
    }

    static async loginWithVk( code: any, handleError: (error: any) => void): Promise<void> {
        
        console.log('code:',code)

        try {
            const response = await AuthService.vkLogin(code);
            console.log('Response from vk login:', response);
           
        } catch (e) {
            console.log(e);
            handleError(e);
        }
    }

}
