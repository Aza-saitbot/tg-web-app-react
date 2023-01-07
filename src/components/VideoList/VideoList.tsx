import React, {FC} from 'react';
import './VideoList.scss'
import ReactPlayer from "react-player";
import {IVideoItem} from "../../types/types";

interface IVideoList {
    list:Array<IVideoItem>
}
const VideoList:FC<IVideoList> = ({list}) => {
    return (
        <div className="videoList">
            {list.map(video=>
                <div key={video.id} className="videoList__item">
                    <ReactPlayer

                        type="video/mp4"
                        width='100%'
                        height='580px'
                        controls={true}
                        url={video.url}
                    />
                </div>
            )}
        </div>
    );
};

export default VideoList;