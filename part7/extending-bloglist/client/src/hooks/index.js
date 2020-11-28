import { useState } from 'react'

export const useField = (id) => {  
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const resetField = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    resetField,
    id
  }
}

export const removeReset = object => {
  const { resetField,...rest } = object
  return rest
}