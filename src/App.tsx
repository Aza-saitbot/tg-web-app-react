import React, { useEffect } from 'react'
import './App.scss'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import ProductList from './components/ProductList/ProductList'
import Form from './components/Form/Form'
import Home from "./pages/Home";


const App = () => {
    const {tg} = useTelegram()
    useEffect(() => {
        // приложения полностью проинициализировался, его можно отрисовать
        tg.ready()
    }, [])

    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={'form'} element={<Form/>}/>
            </Routes>
        </div>
    )
}

export default App