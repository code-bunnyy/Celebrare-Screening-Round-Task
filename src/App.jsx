import { useState } from 'react'
import './App.css'

import Gallery from './components/Gallery'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='flex flex-col items-center bg-[#f6fafa]'>
            <Gallery />
        </div>
    )
}

export default App
