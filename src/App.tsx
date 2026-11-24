import { Route, Routes } from 'react-router'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PropertiesPage from './pages/PropertiesPage'
function App() {
    return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
                <Route path="/properties" element={<PropertiesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
export default App