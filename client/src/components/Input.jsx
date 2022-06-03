import React from 'react'

export default function Input({value, setValue, placeholder}) {
    const renderInput = (value, setValue, placeholder) => {
        return <input 
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder={`${placeholder}`}
            name={`${placeholder}`}
        />
        
    }
  return (
    <div>
        <label>
            {renderInput(value, setValue, placeholder)}
        </label>
    </div>
  )
}
