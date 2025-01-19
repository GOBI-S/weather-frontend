
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Home from "./pages/Home"
// import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
