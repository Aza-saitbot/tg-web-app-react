import React, {FC} from 'react';
import './ReviewList.scss'
import {IReviewList} from "../../types/types";

const ReviewList:FC<IReviewList> = ({list}) => {
    return (
        <div className='reviewList'>
            {list.map(item=>
                <div key={item.id} className='reviewList__item'>
                    <div className='reviewList__item__image'>
                        <img src={item.rsc} alt='image'/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewList;