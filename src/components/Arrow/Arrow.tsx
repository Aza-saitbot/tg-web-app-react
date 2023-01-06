import React, {FC} from 'react'

const refIconForward = 'https://fonts.gstatic.com/s/i/googlematerialicons/keyboard_arrow_right/v6/white-24dp/2x/gm_keyboard_arrow_right_white_24dp.png'
const refIconBack  = 'https://fonts.gstatic.com/s/i/googlematerialicons/keyboard_arrow_left/v6/white-24dp/2x/gm_keyboard_arrow_left_white_24dp.png'

interface IArrow {
    direction:"back"|"forward"
    cb:()=>void
}
const Arrow:FC<IArrow > = ({direction,cb}) => {
    const leftRight=direction === 'back' ? ({left:8}):({right:8})
    const path = direction === "back" ? refIconBack : refIconForward
    return (
        <div
            onClick={cb}
            style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            backgroundSize: '24px 24px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            borderRadius: 40,
            bottom: 255,
            height: 40,
            cursor:'pointer',
            position: 'absolute',
            width: 40,
            ...leftRight
        }}>
            <img
                alt='ArrowBack'
                 src={path}/>
        </div>
    )
}

export default Arrow