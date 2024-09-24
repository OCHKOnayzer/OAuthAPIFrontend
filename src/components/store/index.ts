import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import { AUTH_API_URL } from "../http";
import { IUser } from "../../types/IUser";

export default class Store {
    user: IUser = {};
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);
        this.checkAuth(); 
    }

    setAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

    async checkAuth() {

        try {

            let accessToken = localStorage.getItem('access_token');

            let provider = localStorage.getItem('provider')

            console.log("token",accessToken)
            console.log("provider",provider)

            if (accessToken) {
                const response = await axios.get(`${AUTH_API_URL}/checkAuth`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    },
                    withCredentials: true
                });

                console.log("user data",response.data.user)

                this.setAuth(true);

                console.log(this.isAuth)

                this.setUser(response.data.user);

                console.log("user data:",response.data.user.last_name)

            } else {
                this.setAuth(false);
                this.setUser({});
            }
        } catch (e) {
            console.log(e);
            this.setAuth(false);
            this.setUser({});
        }
    }

    async loginWithYandex(code: string, handleError: (error: any) => void): Promise<void> {
        console.log('code:', code);

        try {
            const response = await AuthService.yandexLogin(code);
            const { user, accessToken,provider } = response.data;

            localStorage.setItem('provider',provider);

            console.log(user)

            this.setUser(user);
            this.setAuth(true);

            localStorage.setItem('access_token', accessToken);

            console.log("token:",localStorage.getItem('access_token'))

        } catch (e) {
            console.error(e);
            handleError(e);
        }
    }

    async loginWithVk(code: string, handleError: (error: any) => void): Promise<void> {
        console.log('code:', code);
    
        try {
            
            const response = await AuthService.vkLogin(code);

            const { user, accessToken, provider } = response.data;

            console.log(response.data)
    
            console.log('Access token:', accessToken);
            console.log('Provider:', provider);
    
            this.setUser(user);
            this.setAuth(true);

            localStorage.setItem('access_token', accessToken);
    
            console.log("token:",localStorage.getItem('access_token'))

        } catch (e) {
            console.error('Error during login with VK:', e);
            handleError(e);
        }
    }

    async loginWithVkId(token: string,deviceId:string, handleError: (error: any) => void): Promise<void> {
        try {

            const response = await AuthService.vkIdLogin(token,deviceId);
    
            const { user, accessToken, provider } = response.data;

            console.log("provider", provider)

            localStorage.setItem('provider',provider);

            this.setUser(user);
            this.setAuth(true);


            localStorage.setItem('access_token', accessToken);
    
        } catch (e) {
            console.error('Ошибка при авторизации через VK ID:', e);
            handleError(e);
        }
    }

    async loginWithOk(code: string, handleError: (error: any) => void): Promise<void> {
        console.log('code:', code);

        try {
            const response = await AuthService.okLogin(code);
            const { user, accessToken, provider } = response.data;

            console.log("provider", provider)

            localStorage.setItem('provider',provider);

            console.log("token access:", accessToken)

            this.setUser(user);
            this.setAuth(true);


            localStorage.setItem('access_token', accessToken);
        } catch (e) {
            console.error(e);
            handleError(e);
        }
    }

    async loginWithMailRu(code: string, handleError: (error: any) => void): Promise<void> {
        console.log('code:', code);

        try {
            const response = await AuthService.mailruLogin(code);
            const { user, accessToken, provider } = response.data;

            console.log("provider", provider)

            localStorage.setItem('provider',provider);

            this.setUser(user);
            this.setAuth(true);


            localStorage.setItem('access_token', accessToken);
        } catch (e) {
            console.error(e);
            handleError(e);
        }
    }

    async logOut(){ 
        try{ 

            const result = await AuthService.logout();

            this.setAuth(false);
            this.setUser({})
            localStorage.removeItem('access_token');
            localStorage.removeItem('provider')


        }catch(e:any){ 
            console.log(e.message)
        }
    }

    
    

}
