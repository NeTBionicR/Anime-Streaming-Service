import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

export function Navbar() {
    const { authToken, clearAuthToken } = useAuth();

    function logout() {
        clearAuthToken();
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-menu">
                {authToken === null ? (
                    <>
                        <div className="navbar-start" style={{ backgroundColor: "#485FC7", width: "100%" }}>
                            <Link to="/" className="navbar-item" style={{ color: "white" }}>TP2</Link>
                        </div>
                        <div className="navbar-end" style={{ backgroundColor: "#485FC7" }}>
                            <Link to="/signUp" className="navbar-item" style={{ color: "white" }} aria-label="Sign Up">Sign Up</Link>
                            <Link to="/login" className="navbar-item" style={{ color: "white" }} aria-label="Login">Login</Link>
                            <Link to="/About" className="navbar-item" style={{ color: "white" }} aria-label="About">About</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="navbar-start" style={{ backgroundColor: "#485FC7", width: "100%" }}>
                            <Link to="/" className="navbar-item" style={{ color: "white" }}>TP2</Link>
                        </div>
                        <div className="navbar-end" style={{ backgroundColor: "#485FC7" }}>
                            <Link to="/history" className="navbar-item" style={{ color: "white" }} aria-label="History">History</Link>
                            <Link to="/profile" className="navbar-item" style={{ color: "white" }} aria-label="Profile">Profile</Link>
                            <Link to="/" className="navbar-item" style={{ color: "white" }} aria-label="Logout" onClick={logout}>Logout</Link>
                            <Link to="/About" className="navbar-item" style={{ color: "white" }} aria-label="About">About</Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}
