import React, { useEffect, useState } from 'react'
import './ProductItem.scss'
import Button from '../Button/Button'
import ThreeOneImage from '../../assets/images/3-1.png'

const ProductItem = ({product,className,onAdd}) => {
    const [images,setImages]=useState(product.images)
    const [selectedImage,setSelectedImage]=useState(product.images.length>0 ? product.images[0] : null)
console.log('selectedImage',selectedImage)
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product'+className}>
            {selectedImage && (
                <div key={selectedImage.id} className='product__image'>
                   <div style={{
                       backgroundColor: 'rgba(0,0,0,0.6)',
                       backgroundSize: '24px 24px',
                       backgroundRepeat: 'no-repeat',
                       backgroundPosition: 'center center',
                       borderRadius: 40,
                       bottom: 255,
                       left:8,
                       height: 40,
                       position: 'absolute',
                       width: 40,
                   }}>
                       <img src='https://fonts.gstatic.com/s/i/googlematerialicons/keyboard_arrow_right/v6/white-24dp/2x/gm_keyboard_arrow_right_white_24dp.png'/>
                   </div>
                    <img src={selectedImage.src} alt='image'/>
                </div>
            )}
            <div className={'product__title'}>{product.title}</div>
            <div className={'product__description'}>{product.description}</div>
            <div className={'product__price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            <Button className={'product__add-btn'}
            onClick={onAddHandler}
            >Добавить в корзину</Button>
            </div>
        </div>
    )
}

export default ProductItem