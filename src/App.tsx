import { Hero } from "./components/home/hero"
import { Projects } from "./components/home/projects"
import { NavigationBar } from "./components/navbar"

function App() {


  return (
    <div className="relative">
      <NavigationBar />
      <Hero />
      <Projects />
    </div>
  )
}

export default App
