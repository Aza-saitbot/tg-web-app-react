import React from 'react'
import './ProductItem.scss'
import Button from '../Button/Button'

const ProductItem = ({product,className,onAdd}) => {

    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product'+className}>
            <div className='product__image'>
                <img src={product.image} alt='image'/>
            </div>
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