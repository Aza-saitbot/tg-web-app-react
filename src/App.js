import React, { useEffect } from 'react'
import './App.css'
import { useTelegram } from './hooks/useTelegram'



const App = () => {

    const {tg,onToggleButton}=useTelegram()

    useEffect(()=>{
        // приложения полностью проинициализировался, его можно отрисовать
        tg.ready()
    },[])



    return (
        <div className="App">
            <button onClick={onToggleButton}>toggle</button>
        </div>
    )
}

export default App