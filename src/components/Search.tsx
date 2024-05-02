import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import useDebouncer from '../hooks/useDebouncer'

type SearchProps = {
  onChange: (debouncedValue: string) => void
}

export default function Search({ onChange }: SearchProps) {
  const [inputValue, setInputValue] = useState('')

  useDebouncer({
    value: inputValue,
    delay: 500,
    callback: (debouncedValue) => {
      onChange(debouncedValue)
    },
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <Paper component="form" sx={{ p: '4px', display: 'flex', width: 300 }}>
      <InputBase sx={{ ml: 1, flex: 1 }} value={inputValue} placeholder="Search..." onChange={handleChange} />
    </Paper>
  )
}
