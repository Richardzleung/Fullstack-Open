import { useState } from 'react'

export const useField = (name) => {  
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetField = () => {
    setValue('')
  }

  return {
    name,
    value,
    onChange,
    resetField
  }
}

export const removeReset = object => {
  const {resetField,...rest} = object
  return rest
}