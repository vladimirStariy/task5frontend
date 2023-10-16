import { Routes, Route } from 'react-router-dom';
import MainScreen from '../main-screen/main.screen';
import AppNavbar from '../navbar/navbar';

const AppRouter = () => {
    return <>
        <AppNavbar />
        <Routes>
            <Route path='*' element={<MainScreen />} />
        </Routes>
    </> 
}

export default AppRouter;