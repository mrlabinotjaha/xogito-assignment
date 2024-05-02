import { useEffect } from 'react'

type UseDebouncerProps = {
  value: string
  delay: number
  callback: (value: string) => void
}

export default function useDebouncer({ value, delay, callback }: UseDebouncerProps): void {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay, callback])
}
