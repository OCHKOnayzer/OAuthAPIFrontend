declare module 'vk' {
    interface VK {
      init(params: { apiId: number }): void;
      Auth: {
        getLoginStatus(callback: (response: any) => void): void;
        login(callback: (response: any) => void, scope?: string): void;
      };
    }
  
    interface Window {
      VK: VK;
    }
  }
  