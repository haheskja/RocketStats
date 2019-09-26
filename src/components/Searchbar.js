import React, { useState } from 'react'
import { InputField, Button } from '@dhis2/ui-core'
import { useDispatch } from 'react-redux'
import { getAllReplays } from '../actions'
import DatePicker, { registerLocale } from "react-datepicker"
import en from 'date-fns/locale/en-GB'
import "react-datepicker/dist/react-datepicker.css"
registerLocale('en', en)

const Searchbar = () => {
    const [value, setValue] = useState('76561198016549603')
    const [date, setDate] = useState(new Date('2019-09-23T12:00:00Z'))
    const dispatch = useDispatch()

    const handleClick = () => {
        if(value !== '') dispatch(getAllReplays(value, date))
    }

    return(
        <div className="searchbar">
            <div className="inputField">
                <InputField
                label="Steam ID"
                name="Default"
                onChange={(ref) => setValue(ref.target.value)}
                type="text"
                value={value}
                />  
            </div>
            <div className="inputField">
                <DatePicker
                selected={date}
                dateFormat="dd/MM/yyyy"
                locale="en"
                name="Date"
                onChange={(val) => setDate(val)}
                customInput={
                    <InputField
                        label="Date"
                        name="Date"
                        type="text"
                        onChange={() => {}}
                    />
                }
                />
            </div>
        <Button
            name="Button"
            onClick={() => handleClick()}
            type="button"
            value="default"
            className='inputButton'
            >
                Generate stats
        </Button>  
        </div>
    )
}

export default Searchbar