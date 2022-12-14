import React from 'react';
import './Home.scss'
import ProductList from "../components/ProductList/ProductList";
import VideoList from "../components/VideoList/VideoList";
import {IProduct, IReviewItem, IReviewList} from "../types/types";
import ReviewList from "../components/ReviewList/ReviewList";

import videoOne from './../assets/video/1.mp4'
import videoTwo from './../assets/video/2.mp4'
import videoThree from './../assets/video/3.mp4'
import videoFour from './../assets/video/4.mp4'
import videoFive from './../assets/video/5.mp4'

import OneOneImage from "./../assets/images/1-1.png"
import OneTwoImage from './../assets/images/1-2.png'
import TwoOneImage from './../assets/images/2-1.png'
import TwoTwoImage from './../assets/images/2-2.png'
import TwoThreeImage from './../assets/images/2-3.png'
import ThreeOneImage from './../assets/images/3-1.png'
import ThreeTwoImage from "./../assets/images/3-2.png"
import ThreeThreeImage from "./../assets/images/3-3.png"

import reviewOne from '../assets/reviews/1.png'
import reviewTwo from '../assets/reviews/2.png'
import reviewThree from '../assets/reviews/3.png'
import reviewFour from '../assets/reviews/4.png'
import reviewFive from '../assets/reviews/5.png'
import reviewSix from '../assets/reviews/6.png'
import reviewSeven from '../assets/reviews/7.png'
import reviewEight from '../assets/reviews/8.png'



const reviewList:Array<IReviewItem>=[
    {id:1,rsc:reviewOne},
    {id:2,rsc:reviewTwo},
    {id:3,rsc:reviewThree},
    {id:4,rsc:reviewFour},
    {id:5,rsc:reviewFive},
    {id:6,rsc:reviewSix},
    {id:7,rsc:reviewSeven},
    {id:8,rsc:reviewEight},
]


const productsList:Array<IProduct> = [
    {id: '1', title: 'Джинсы', price: 2000, description: 'Встречные, хорошо будет сидеть',images:[
            {id:1,src:OneOneImage},{id:2,src:OneTwoImage}
        ]},
    {id: '2', title: 'Куртки', price: 5000, description: 'Утепленные для зимы',images:[
            {id:1,src:TwoOneImage},{id:2,src:TwoTwoImage},{id:3,src:TwoThreeImage}
        ]},
    {id: '3', title: 'Сапоги', price: 4000, description: 'Зимние, кожа натуральное',images:[
            {id:1,src:ThreeOneImage},{id:2,src:ThreeTwoImage},{id:3,src:ThreeThreeImage}
        ]},
    // {id: '4', title: 'Шапка', price: 500, description: 'Утепленные для зимы',image:OneImage},
    // {id: '5', title: 'Брюки', price: 4000, description: 'Встречные, хорошо будет сидеть',image:OneImage},
    // {id: '6', title: 'Носки', price: 200, description: 'Зимние',image:OneImage},
    // {id: '7', title: 'Ботинки', price: 3000, description: 'Зимние, кожа натуральное',image:OneImage},
    // {id: '8', title: 'Часы', price: 5000, description: 'Швейцарские, механика',image:OneImage},
]


interface IVideoItem {
    id:number
    url:string
}
const videoList:Array<IVideoItem>=[
    {id:1, url:videoOne},
    {id:2, url:videoTwo},
    {id:3, url:videoThree},
    {id:4, url:videoFour},
    {id:5, url:videoFive},
]


const stepsComponents = {
    0: <ProductList list={productsList}/>,
    1: <VideoList list={videoList}/>,
    2: <ReviewList list={reviewList}/>
}

const titleTab={
    0:"Фотографии",
    1:"Видео",
    2:"Отзывы",
}

const Home = () => {
    const [step, setStep] = React.useState<number>(0);

    const Step = stepsComponents[step]

    const onNextStep = () => {
        setStep((prev) => prev + 1);
    };

    return (
        <div className='home'>
            <div className='home__switch'>
                <div className='home__switch__list'>
                    {Object.keys(stepsComponents).map(key=>
                    <div
                        onClick={()=>setStep(Number(key))}
                        className={`home__switch__list__item ${`${step}` === key ? 'active':''}`}
                        key={key}
                    >{titleTab[key]}</div>
                    )}

                </div>
            </div>
            {Step}
        </div>
    );
};

export default Home;