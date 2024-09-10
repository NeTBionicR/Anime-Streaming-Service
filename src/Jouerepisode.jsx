import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useHistoryContext } from "./HistoryContext";

export function Jouerepisode() {
    const navigate = useNavigate();
    const { authToken } = useAuth();
    const { fetchHistory } = useHistoryContext();
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const episodeId = urlParams.get("episodeId");
    const [episodeUrl, setEpisodeUrl] = useState("");

    useEffect(() => {
        async function getEpisodeUrl() {
            const rep = await fetch(
                `https://tvshowdbapi.herokuapp.com/viewepisode?episodeId=${episodeId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            if (rep.ok) {
                const data = await rep.json();
                setEpisodeUrl(data.videoURL);
                console.log(data);
                fetchHistory();
            } else if (rep.status === 401) {
                navigate("/login");
            }
        }
        if (authToken) {
            getEpisodeUrl();
        }
    }, [authToken, episodeId, navigate, fetchHistory]);

    if (!authToken) {
        return (
            <div className="has-text-centered">
                <h1 className="title">Vous devez vous connecter pour accéder à cette page.</h1>
                <a href="/login">Se connecter</a>
            </div>
        );
    }

    return (
        <>
            {episodeUrl ? (
                <div className="has-text-centered">
                    <video controls width="1000" height="600" aria-label="Lecteur vidéo">
                        <source src={episodeUrl} type="video/mp4" />
                        Votre navigateur ne supporte pas la balise vidéo.
                    </video>
                </div>
            ) : (
                <div className="has-text-centered">
                    <p>Chargement de l'épisode...</p>
                </div>
            )}
        </>
    );
}
