import QuestionPageContainer from "./components/QuestionPage/QuestionPageContainer/QuestionPageContainer";
import {Routes, Route} from "react-router-dom";
import Registration from "./components/Security/Registration/Registration";
import Login from "./components/Security/Login/Login";
import {MainPage} from "./components/MainPage/MainPage";

function App() {
    return (
        <div>
            <Routes>
                <Route path='/post/:question' element={} />
                <Route path='/' element={<QuestionPageContainer/>}/>
                <Route path='main' element={<MainPage/>} />
                <Route path='registration' element={<Registration/>}/>
                <Route path='login' element={<Login/>} />
            </Routes>
        </div>


    )
}

export default App;
