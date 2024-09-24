// Декларации для изображений
declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Декларации для CSS модулей
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Декларации для uuid
declare module 'uuid' {
  export function v4(): string;
}

// Декларации для VK SDK
// types/vkid-sdk.d.ts
// types/vkid-sdk.d.ts
declare module '@vkid/sdk' {
export class OneTap {
  constructor();
  render(options: { container: HTMLElement }): this;
  on(event: string, callback: (data: any) => void): void;
}

export class Config {
  static init(options: { app: string; redirectUrl: string; state?: string; codeVerifier?: string; scope?: string }): void;
}

export class Auth {
  static login(): Promise<any>;
  static exchangeCode(code: string): Promise<{ access_token: string; refresh_token: string; id_token: string }>;
  static userInfo(accessToken: string): Promise<any>;
}

export const WidgetEvents: {
  ERROR: string;
};
}
