import z from 'zod'
import './App.css'

import { ZodService } from './zod-service'


const zodService = new ZodService({
  isParsingEnabled: true, 
  shouldLogErrors: true, 
})

const userSchema = z.object({
  name: z.string()
})


function App() {


  const safeUser = zodService.parse(userSchema, {name: "Pontus"})

  return (
    <div>
      {safeUser.name}
    </div>
  )
}

export default App
