interface Telegram {
    WebApp:any
}
interface Window {
    Telegram:Telegram
}

declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*.png' {
    const src: string;
    export default src;
}

