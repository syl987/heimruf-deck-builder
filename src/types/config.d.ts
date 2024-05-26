declare module 'src/config' {
  export interface AppConfig {
    cardTypes: string[];
    cardSets: string[];
    collectibleOnly: boolean;
    locale: string;
  }
}
