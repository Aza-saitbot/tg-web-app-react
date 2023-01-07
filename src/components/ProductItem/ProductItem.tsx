import React, {FC, useState} from 'react'
import './ProductItem.scss'
import Button from '../Button/Button'
import Arrow from '../Arrow/Arrow'
import {IProduct} from "../../types/types";

interface IProductItem {
    product: IProduct
    onAdd: (product: IProduct) => void
    className: string
}

const ProductItem: FC<IProductItem> = ({product, onAdd, className}) => {
    const [selectedImage, setSelectedImage] = useState<number>(1)
    const totalImages = product.images.length

    const onAddHandler = () => {
        onAdd(product)
    }

    const handlerBack = () => {
        setSelectedImage(prevState => prevState - 1)
    }
    const handlerForward = () => {
        setSelectedImage(prevState => prevState + 1)

    }
    const srcImage = product.images.find(i => i.id === selectedImage)?.src

    return (
        <div className={'product' + className}>

                <div className='product__image'>
                    {selectedImage > 1 &&
                        <Arrow cb={handlerBack} direction="back"/>
                    }
                    <img src={srcImage} alt='image'/>
                    {selectedImage < totalImages &&
                        <Arrow cb={handlerForward} direction="forward"/>
                    }
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