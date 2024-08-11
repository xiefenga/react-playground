import 'allotment/dist/style.css'

import Body from '@/components/body'
import Header from './components/header'
import { PlaygroundProvider } from '@/context'

const App = () => {

  return (
    <div className="h-screen w-screen flex flex-col">
      <PlaygroundProvider>
        <Header/>
        <Body />
      </PlaygroundProvider>
    </div>
  )
}

export default App
