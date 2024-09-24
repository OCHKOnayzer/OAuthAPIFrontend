
import { apiAuth } from "../http";

export default class AuthService {

    // Авторизация через Яндекс
    static async yandexLogin(code: string) {
        return apiAuth.post('/oauth/yandex', { code });
    }

    // Авторизация через ВКонтакте
    static async vkLogin(code: string) {
        return apiAuth.post('/oauth/vk', { code });
    }

    static async vkIdLogin(code:string){ 
        return apiAuth.post('/oauth/vkid', { code });
    }

    // Авторизация через Одноклассники
    static async okLogin(code: string) {
        return apiAuth.post('/oauth/ok', { code });
    }

    // Авторизация через Mail.ru
    static async mailruLogin(code: string) {
        return apiAuth.post('/oauth/mailru', { code });
    }

    static async logout() {
        return apiAuth.post('/logout');
    }
}
