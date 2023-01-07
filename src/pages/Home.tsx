import React from 'react';
import './Home.scss'
import ProductList from "../components/ProductList/ProductList";
import ReviewList from "../components/VideoList/VideoList";
import VideoList from "../components/VideoList/VideoList";


const stepsComponents = {
    0: ProductList,
    1: VideoList,
    2: ReviewList
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
            <Step/>
        </div>
    );
};

export default Home;