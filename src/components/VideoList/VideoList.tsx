import React from 'react';
import './VideoList.scss'
import ReactPlayer from "react-player";
import videoOne from '../../assets/video/1.mp4'
import videoTwo from '../../assets/video/2.mp4'
import videoThree from '../../assets/video/3.mp4'
import videoFour from '../../assets/video/4.mp4'
import videoFive from '../../assets/video/5.mp4'


interface IVideoItem {
    id:number
    url:string
}
const listVideo:Array<IVideoItem>=[
    {id:1, url:videoOne},
    {id:2, url:videoTwo},
    {id:3, url:videoThree},
    {id:4, url:videoFour},
    {id:5, url:videoFive},
]

const VideoList = () => {
    return (
        <div className="videoList">
            {listVideo.map(video=>
                <div key={video.id} className="videoList__item">

                    <ReactPlayer
                        width='100%'
                        height='580px'
                        controls={true}
                        url={video.url} />

                </div>
            )}
        </div>
    );
};

export default VideoList;