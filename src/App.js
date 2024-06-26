import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CategoryProducts from './pages/CategoryProducts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:category_id" element={<CategoryProducts />} />
      </Routes>
    </Router>
  );
}

export default App;