import React, { useState, useCallback, useEffect } from 'react'
import './ProductList.scss'
import ProductItem from '../ProductItem/ProductItem'
import { useTelegram } from '../../hooks/useTelegram'

const products = [
    {id: '1', title: 'Джинсы', price: 2000, description: 'Встречные, хорошо будет сидеть'},
    {id: '2', title: 'Куртки', price: 5000, description: 'Утепленные для зимы'},
    {id: '3', title: 'Сапоги', price: 4000, description: 'Зимние, кожа натуральное'},
    {id: '4', title: 'Шапка', price: 500, description: 'Утепленные для зимы'},
    {id: '5', title: 'Брюки', price: 4000, description: 'Встречные, хорошо будет сидеть'},
    {id: '6', title: 'Носки', price: 200, description: 'Зимние'},
    {id: '7', title: 'Ботинки', price: 3000, description: 'Зимние, кожа натуральное'},
    {id: '8', title: 'Часы', price: 5000, description: 'Швейцарские, механика'},
]

// верни нам просуммированное значения цен
const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
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

    const onAdd = (product) => {
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
            {products.map(item => (
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