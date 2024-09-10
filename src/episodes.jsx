import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useHistoryContext } from "./HistoryContext";

function Episode({ episode, onClick, isWatched }) {
    return (
        <div className={`column is-3-desktop is-4-tablet is-6-mobile ${isWatched ? "is-watched" : ""}`}>
            <div
                className="card"
                style={{ display: "flex", flexDirection: "column" }}
                onClick={() => onClick(episode.episodeId)}
                role="button"
                tabIndex="0"
                aria-pressed="false"
                onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        onClick(episode.episodeId);
                    }
                }}
            >
                <div className="card-image" style={{ flex: "1 1 auto" }}>
                    <figure className="image is-square" style={{ margin: 0 }}>
                        <img
                            src={episode.imgURL}
                            alt={`Image de ${episode.title}`}
                            style={{
                                height: "60%",
                                filter: isWatched ? "grayscale(100%) blur(5px)" : "none"
                            }}
                        />
                    </figure>
                </div>
                <div className="card-content has-text-centered">
                    <div className="content" style={{ filter: isWatched ? "blur(2px)" : "none" }}>
                        <p className="title is-5" style={{ marginTop: "-5rem" }}>{episode.title}</p>
                        <p className="subtitle is-6" style={{ marginBottom: 0 }}>{episode.number}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Season() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const seasonId = urlParams.get("seasonId");
    const { history } = useHistoryContext();
    const [episodes, setEpisodes] = useState(null);
    const [tvshowTitle, setTvshowTitle] = useState("");
    const [seasonNumber, setSeasonNumber] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    function handleClick(episodeId) {
        navigate(`/viewepisode?episodeId=${episodeId}`);
    }

    useEffect(() => {
        async function getEpisodes() {
            const rep = await fetch(
                `https://tvshowdbapi.herokuapp.com/episodes?seasonId=${seasonId}`
            );
            if (rep.ok) {
                const data = await rep.json();
                setEpisodes(data.episodes);
                setTvshowTitle(data.tvshowTitle);
                setSeasonNumber(data.seasonNumber);
                console.log(data);
            }
        }
        getEpisodes();
    }, [seasonId]);

    const episodesPerPage = 8;
    const totalEpisodes = episodes ? episodes.length : 0;
    const totalPages = Math.ceil(totalEpisodes / episodesPerPage);

    const renderEpisodes = () => {
        if (!episodes) return null;
        const startIndex = (currentPage - 1) * episodesPerPage;
        const endIndex = startIndex + episodesPerPage;
        const episodesToDisplay = episodes.slice(startIndex, endIndex);

        return episodesToDisplay.map((episode) => {
            const isWatched = history.some((histEpisode) => histEpisode.episodeId === episode.episodeId);
            return <Episode key={episode.episodeId} episode={episode} onClick={handleClick} isWatched={isWatched} />;
        });
    };

    function tableauPages() {
        let p = [];
        for (let i = 1; i <= totalPages; i++) {
            p.push(i);
        }
        return p;
    }

    return (
        <div className="container">
            <h1 className="title has-text-centered">{tvshowTitle}</h1>
            <h2 className="title has-text-centered">Season {seasonNumber}</h2>
            <div className="columns is-multiline">
                {renderEpisodes()}
            </div>
            {totalPages > 1 && (
                <nav className="pagination" role="navigation" aria-label="pagination">
                    <button
                        className={currentPage === 1 ? "pagination-previous is-disabled" : "pagination-previous"}
                        onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
                        disabled={currentPage === 1}
                        aria-label="Page précédente"
                    >
                        &lt;
                    </button>
                    <button
                        className={currentPage === totalPages ? "pagination-next is-disabled" : "pagination-next"}
                        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                        disabled={currentPage === totalPages}
                        aria-label="Page suivante"
                    >
                        &gt;
                    </button>
                    <ul className="pagination-list">
                        {tableauPages().map((numPage) => (
                            <li key={numPage}>
                                <button
                                    className={currentPage === numPage ? "pagination-link is-current" : "pagination-link"}
                                    aria-label={`Page ${numPage}`}
                                    onClick={() => setCurrentPage(numPage)}
                                >
                                    {numPage}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </div>
    );
}
