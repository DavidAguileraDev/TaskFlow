import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import SignIn from "./login/sign-in/App.tsx";
import SignUp from "./login/sign-up/App.tsx";
import Dashboard from "./dashboard/App.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/sign-in" replace />} />

                <Route path="/sign-in" element={<SignIn />} />

                <Route path="/sign-up" element={<SignUp />} />

                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}   

export default App;