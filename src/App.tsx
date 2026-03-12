import { About } from "./components/home/about"
import { Contact } from "./components/home/contact"
import { Footer } from "./components/home/footer"
import { Hero } from "./components/home/hero"
import { Projects } from "./components/home/projects"
import { Skills } from "./components/home/skills"
import { NavigationBar } from "./components/navbar"

function App() {


  return (
    <div className="relative">
      <NavigationBar />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
