import React, {useState, useCallback, useEffect, FC} from 'react'
import './ProductList.scss'
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'
import {IProduct} from "../../types/types";



// верни нам просуммированное значения цен
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

interface IProductList {
    list:Array<IProduct>
}
const ProductList:FC<IProductList> = ({list}) => {
    const [addedItems, setAddedItems] = useState([])

    const {tg, queryId} = useTelegram()


    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId
        }

        fetch('http://localhost:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })

    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product:IProduct) => {
        const alreadyAdded = addedItems.find(i => i.id === product.id)
        let newItems = []
        if (alreadyAdded) {
            newItems = addedItems.filter(i => i.id !== product.id)
        } else {
            newItems = [...addedItems, product]
        }
        // обновления корзины
        setAddedItems(newItems)

        // проверяем если в корзине у нас товаров нет, то кнопку скрываем
        if (newItems.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className='list'>
            {list.map(item => (
                <ProductItem
                    key={item.id}
                    product={item}
                    onAdd={onAdd}
                    className='list__item'
                />
            ))}
        </div>
    )
}

export default ProductList