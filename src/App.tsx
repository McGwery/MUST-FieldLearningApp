import './App.css'
import { Route, Routes } from 'react-router'
import GraduantListPage from './pages/graduants/GraduantListPage'
import CreateGraduantPage from './pages/graduants/CreateGraduantPage'
import EditGraduantPage from './pages/graduants/EditGraduantPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<GraduantListPage />} />
      <Route path="/create-graduant" element={<CreateGraduantPage />} />
      <Route path="/edit-graduant/:graduantId" element={<EditGraduantPage />} />
    </Routes>
  )
}

export default App
