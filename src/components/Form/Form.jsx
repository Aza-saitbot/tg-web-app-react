import React, { useCallback, useEffect, useState } from 'react'
import './Form.css'
import { useTelegram } from '../../hooks/useTelegram'

const Form = () => {
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [subject, setSubject] = useState('physical')
    const {tg} = useTelegram()

    //useCallback - использую для того что бы, при каждом перерисовке,
    // функция не создавалась новая (сохранить ссылку на функцию)
    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        console.log('data',data)
        tg.sendData(JSON.stringify(data))
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if (!country || !street) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])

    const onChangeCountry = (e) => {
        setCountry(e.target.value)
    }
    const onChangeStreet = (e) => {
        setStreet(e.target.value)
    }
    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваше данные</h3>
            <input value={country} onChange={onChangeCountry} className={'input'} type="text" placeholder={'Страна'}/>
            <input value={street} onChange={onChangeStreet} className={'input'} type="text" placeholder={'Улица'}/>
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value="physical">Фиц. лицо</option>
                <option value="legal">Юр. лицо</option>
            </select>
        </div>
    )
}

export default Form