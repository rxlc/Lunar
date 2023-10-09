import ThreeScene from './ThreeScene'
import PointOfInterests from './PointOfInterests/PointOfInterests'
import Apollo from './Apollo'
import Toggle from './Toggle'
import Quakes from './Quakes'
import QuakeDetails from './QuakeDetails'
import SliderV from './Slider'

function App() {
  return (
    <div className="App" >
      <PointOfInterests/>
      <ThreeScene/>
      <Apollo/>
      <Quakes/>
      <Toggle/>
      <QuakeDetails/>
    </div>
  )
}

export default App
