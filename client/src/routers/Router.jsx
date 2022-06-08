import { Route, Routes } from 'react-router-dom'
import CreateForm from '../components/CreateForm'
import Detail from '../components/Detail'
import Home from '../components/Home'
import LandingPage from '../components/LandingPage'

export default function Router() {
    return (
        <Routes>

            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home/:id" element={<Detail />} />
            <Route path="/pokemon" element={<CreateForm />} />

        </Routes>
    )

}
