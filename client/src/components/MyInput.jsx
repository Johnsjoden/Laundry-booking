import React from 'react'
import { Input } from '@mui/material'
export default function MyInput({value, setValue, placeholder}) {
    const renderInput = (value, setValue, placeholder) => {
        return <Input value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={`${placeholder}`}
            name={`${placeholder}`}>
            </Input>
    }
  return (
    <div>
        <label>
            {renderInput(value, setValue, placeholder)}
        </label>
    </div>
  )
}
