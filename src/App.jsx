import {BrowserRouter, Route, Routes} from "react-router-dom";
import { createContext, useState } from "react";
import {Home} from "./Home";
import {NoMatch} from "./NoMatch.jsx";
import {Navbar} from "./Navbar.jsx";
import {Login} from "./login.jsx";
import {SignUp} from "./signUp.jsx";
import {About} from "./About.jsx";
import {Details} from "./Details.jsx";
import {Profile} from "./profile.jsx";
import {History} from "./history.jsx";
import {AuthProvider} from "./AuthContext.jsx";
import {Season} from "./episodes.jsx";
import { Jouerepisode } from "./Jouerepisode.jsx";
import { HistoryProvider } from "./HistoryContext.jsx";
export const TokenContext = createContext();

export function App() {
    const [token, setToken] = useState(null)
    return (
        <TokenContext.Provider value = {{token, setToken}}>
            <AuthProvider>
                <HistoryProvider>
                    <BrowserRouter>
                        <Navbar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="*" element={<NoMatch/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/signUp" element={<SignUp/>}/>
                            <Route path="/About" element={<About/>}/>
                            <Route path="/Details" element={<Details/>}/>
                            <Route path="/profile" element={<Profile/>}/>
                            <Route path="/history" element={<History/>}/>
                            <Route path="/episodes" element={<Season/>}/>
                            <Route path="/viewepisode" element={<Jouerepisode/>}/>
                        </Routes>
                        <footer className="footer" style={{backgroundColor: "white"}}>
                            <div className="container">
                                <div className="content has-text-centered">
                                    <p>e2235970</p>
                                </div>
                            </div>
                        </footer>
                    </BrowserRouter>
                </HistoryProvider>
            </AuthProvider>
        </TokenContext.Provider>
    );
}