import React, { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'
import Header from './components/Navbar/Header'



const App = () => {

    const {tg,onToggleButton}=useTelegram()

    useEffect(()=>{
        // приложения полностью проинициализировался, его можно отрисовать
        tg.ready()
    },[])



    return (
        <div className="App">
            <Header/>
            <button onClick={onToggleButton}>toggle</button>
        </div>
    )
}

export default App