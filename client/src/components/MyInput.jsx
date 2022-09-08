import React from 'react'
import { Input } from '@mui/material'
export default function MyInput({value, setValue, placeholder, type}) {
    const renderInput = (value, setValue, placeholder, type) => {
        return <Input value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={`${placeholder}`}
            name={`${placeholder}`}
            type={type}>
            </Input>
    }
  return (
    <div>
        <label>
            {renderInput(value, setValue, placeholder, type)}
        </label>
    </div>
  )
}
