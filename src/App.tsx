import Header from './components/Header'
import Projects from './views/Projects'
import { useEffect } from 'react'
import './App.css'
import ApiService from '../src/api/apiService'

function App() {
  useEffect(() => {
    ApiService.fetchUsers()
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
      })
  }, [])

  return (
    <div className="App">
      <Header />
      <Projects />
    </div>
  )
}

export default App
