import './App.css'
import { useState } from 'react'
import Header from './Components/Header/Header'
import Middle from './Components/Middle/Middle'

export default function App() {

  let [displayDark, setDisplayDark] = useState(false)

  function handleDisplayDark(){
    setDisplayDark(prevState=>!prevState)
  }

  return (
    <>
      <Header display_mode={displayDark} display_func={handleDisplayDark} />
      <Middle display_mode={displayDark} />
    </>
  )

}
