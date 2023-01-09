import React, {useCallback, useEffect, useState} from 'react'
import './Form.scss'
import dayjs, { Dayjs } from 'dayjs';
import {useTelegram} from '../../hooks/useTelegram'

import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select, Stack, TextField
} from '@mui/material';
import {DateTimePicker, LocalizationProvider, MobileDatePicker, TimePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";



export const servicesList:Array<string>=[
    'Парикмахерские услуги',
    'Ногтевой сервис',
    'Коррекция окрашивания бровей',
    "Маникюр и педикюр"
]


const Form = () => {
    const [comment, setComment] = useState('')
    const [service, setService] = useState('Не выбрано')
    const [valueDate, setValueDate] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );
    const [time,setTime]=useState<Dayjs | null>()
    const {tg} = useTelegram()


    const handleChangeDate = (newValue: Dayjs | null) => {
        setValueDate(newValue);
    };
    const handleChangeTime = (newValue: Dayjs | null) => {
        setTime(newValue);
    };

    const [selected, setSelected] = useState<Array<string>>([]);
    const isAllSelected =
        servicesList.length > 0 && selected.length === servicesList.length;

    const handleChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelected(selected.length === servicesList.length ? [] : servicesList);
            return;
        }
        setSelected(value);
    };

    //useCallback - использую для того что бы, при каждом перерисовке,
    // функция не создавалась новая (сохранить ссылку на функцию)
    const onSendData = useCallback(() => {
        const data = {
            services:selected,
            comment,
            date:valueDate,
            time
        }
        tg.sendData(JSON.stringify(data))
    },  [service,valueDate,time,comment])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить'
        })
    }, [])

    useEffect(() => {
        if (!valueDate || !time) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [valueDate, time])

    const onChangeComment = (e) => {
        setComment(e.target.value)
    }

    return (
        <div className="form">
            <FormControl variant="outlined" fullWidth={true}>
                <InputLabel id="mutiple-select-label">Выбрать услугу</InputLabel>
                <Select
                    labelId="mutiple-select-label"
                    multiple
                    value={selected}
                    onChange={handleChange}
                    renderValue={(selected) => selected.join(", ")}
                
                >
                    <MenuItem
                        value="all"
                        classes={{
                            // root: isAllSelected ? classes.selectedAll : ""
                        }}
                    >
                        <ListItemIcon>
                            <Checkbox
                                // classes={{ indeterminate: classes.indeterminateColor }}
                                checked={isAllSelected}
                                indeterminate={
                                    selected.length > 0 && selected.length < servicesList.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            // classes={{ primary: classes.selectAllText }}
                            primary="Выбрать все"
                        />
                    </MenuItem>
                    {servicesList.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon>
                                <Checkbox checked={selected.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Stack spacing={3}>
                        <MobileDatePicker
                            label="Выбрать дату"
                            inputFormat="MM/DD/YYYY"

                            value={valueDate}
                            onChange={handleChangeDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Выбрать время"
                            value={time}
                            onChange={handleChangeTime}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>

            </div>
            <input value={comment} onChange={onChangeComment} className='form__comment' type="text" placeholder={'Комментария'}/>
        </div>
    )
}

export default Form