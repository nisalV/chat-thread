import Thread from './components/pages/thread'
import { ThreadProvider } from './contexts/commentContext'

function App() {
  return (
    <ThreadProvider>
      <Thread />
    </ThreadProvider>
  )
}

export default App
