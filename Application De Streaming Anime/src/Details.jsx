import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Details() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const animeID = urlParams.get("animeID")
    const [animes, setAnime] = useState(null);
    const navigate = useNavigate();

    function handleClick(seasonId) {
        navigate(`/episodes?seasonId=${seasonId}`);
    }

    useEffect(() => {
        async function getAnime() {
            const rep = await fetch(`https://tvshowdbapi.herokuapp.com/tvshow?tvshowId=${animeID}`);
            if (rep.ok) {
                const data = await rep.json();
                console.log(data);
                setAnime(data);
            }
        }
        getAnime();
    }, [animeID]);

    return (
        <div>
            <div className="container">
                {animes !== null && (
                    <>
                        <div className="field-body">
                            <div className="column is-4-desktop is-4-tablet is-6-mobile">
                                <figure className="image">
                                    <img src={animes.imgURL} alt={`Image de ${animes.title}`} />
                                </figure>
                            </div>
                            <div className="column is-8">
                                <div className="column">
                                    <span id="titre" className="title is-2" aria-label={`Titre: ${animes.title}`}>{animes.title}</span>
                                </div>
                                <div className="column is-pulled-right">
                                    <span id="genres" aria-label={`Genres: ${animes.genres.map((t) => t.name).join(", ")}`}>{animes.genres.map((t) => t.name).join(", ")}</span>
                                </div>
                                <div className="column">
                                    <span id="date" aria-label={`Date de parution: ${animes.year}`}>{animes.year}</span>
                                </div>
                                <div className="column">
                                    <span id="episodes" aria-label={`Nombre d'épisodes: ${animes.episodeCount}`}>{animes.episodeCount} épisodes</span>
                                    <span id="guideline" aria-label={`Guideline Parental: ${animes.tvParentalGuideline}`} style={{ marginLeft: "6%" }}>{animes.tvParentalGuideline}</span>
                                </div>
                                <div className="column">
                                    <span id="studio" aria-label="Studio">Studio</span>
                                    <span id="studio-name" aria-label={`Nom du studio: ${animes.studio.name}`} style={{ marginLeft: "10.75%" }}>{animes.studio.name}</span>
                                </div>
                                <div className="column has-text-justified" aria-label="Plot">
                                    {animes.plot}
                                </div>
                                <div className="column">
                                    <audio controls id="cryURL" src={animes.audioURL} autoPlay aria-label="Audio">
                                        <source type="audio/ogg" />
                                        Votre navigateur ne supporte pas l'élément audio.
                                    </audio>
                                </div>
                            </div>
                        </div>
                        <div style={{ overflow: "auto" }}>
                            <div style={{ display: "flex", position: "relative", marginLeft: "0.9%", marginTop: 50, marginBottom: 50 }}>
                                {animes.roles.map((role) => (
                                    <div className="card has-text-centered" key={role.roleId} style={{ minHeight: 300, minWidth: 200, marginRight: 25 }}>
                                        <figure className="card-image">
                                            <img src={role.imgURL} alt={`Image de ${role.name}`} />
                                        </figure>
                                        <div>
                                            <span><b>{role.name}</b></span>
                                        </div>
                                        <span>{role.character}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ overflow: "auto" }}>
                            <div style={{ display: "flex", position: "relative", marginLeft: "0.9%", marginTop: 50, marginBottom: 50 }}>
                                {animes.seasons.map((seasons) => (
                                    <div
                                        className="column is-3 card has-text-centered"
                                        key={seasons.seasonId}
                                        style={{ minHeight: 300, minWidth: 200, marginRight: 25 }}
                                        role="button"
                                        tabIndex="0"
                                        aria-pressed="false"
                                        onClick={() => handleClick(seasons.seasonId)}
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                handleClick(seasons.seasonId);
                                            }
                                        }}
                                    >
                                        <figure className="card-image">
                                            <img src={seasons.imgURL} alt={`Image de la saison ${seasons.number}`} />
                                        </figure>
                                        <div style={{ marginTop: 10, height: 50 }}>
                                            <span className="title is-4">Saison {seasons.number}</span>
                                        </div>
                                        <div style={{ marginTop: 10, height: 50 }}>
                                            <span>{seasons.episodeCount} épisodes</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
