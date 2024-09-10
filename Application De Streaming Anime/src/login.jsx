import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "./AuthContext";

export function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false);
    const { setAuthToken } = useAuth();

    const handleLogin = async () => {
        setError("");
        setShowError(false);
        try {
            if (!username) {
                throw new Error("Le nom d'utilisateur est obligatoire.");
            }
            if (!password) {
                throw new Error("Le mot de passe est obligatoire.");
            }
            if (!validateUsername(username)) {
                throw new Error("Le nom d'utilisateur doit commencer par 'e' ou 'E' suivi de 7 chiffres.");
            }

            const response = await fetch("https://tvshowdbapi.herokuapp.com/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password })
            });
    
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Mauvais nom d'utilisateur ou mot de passe. Veuillez réessayer.");
            }

            const { token } = await response.json();
            setAuthToken(token);
            sessionStorage.setItem("authToken", token);
    
            navigate("/");
        } catch (error) {
            setError(error.message);
            setShowError(true);
        }
    };
    
    const handleCancel = () => {
        navigate("/");
    };

    const validateUsername = (username) => {
        const regex = /^[Ee][0-9]{7}$/;
        return regex.test(username);
    };

    return (
        <>
            <h1 className="title" style={{ textAlign: "center" }}>Connexion</h1>
            <h2 className="title has-text-centered" role="alert" aria-live="assertive">{showError && error}</h2>
            <div className="container">
                <div className="section">
                    <div className="content">
                        <div className="field">
                            <label className="label" htmlFor="email">Nom d'utilisateur</label>
                            <div className="control has-icons-left">
                                <input
                                    id="email"
                                    className="input"
                                    type="text"
                                    placeholder="e1234567"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    aria-required="true"
                                    aria-invalid={showError ? "true" : "false"}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="password">Mot de passe</label>
                            <div className="control has-icons-left">
                                <input
                                    id="password"
                                    className="input"
                                    type="password"
                                    placeholder="*******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-required="true"
                                    aria-invalid={showError ? "true" : "false"}
                                />
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-success" onClick={handleLogin} aria-label="Se connecter">Connexion</button>
                                <button className="button is-danger" onClick={handleCancel} aria-label="Annuler">Annuler</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
