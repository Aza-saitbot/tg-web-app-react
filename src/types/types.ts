export interface IImage{
    id:number
    src:string
}

export interface IProduct {
    id:string
    title:string
    price:number
    description:string
    images:Array<IImage>
}

export interface IVideoItem{
    id:number
    url:string
}