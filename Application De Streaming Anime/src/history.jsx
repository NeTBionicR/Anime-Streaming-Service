import { useHistoryContext } from "./HistoryContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function History() {
    const { history, loading } = useHistoryContext();
    const [currentPage, setCurrentPage] = useState(1);
    const episodesPerPage = 6;
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!history || history.length === 0) {
        return (
            <div>
                <h1 className="title has-text-centered">Il n'y a pas d'historique disponible</h1>
            </div>
        );
    }

    const renderEpisodes = () => {
        const startIndex = (currentPage - 1) * episodesPerPage;
        const endIndex = startIndex + episodesPerPage;
        const episodesToDisplay = history.slice(startIndex, endIndex);

        return episodesToDisplay.map((episode) => (
            <div
                key={episode.episodeId}
                className="column is-4"
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex="0"
                aria-pressed="false"
                onClick={() => navigate(`/viewepisode?episodeId=${episode.episodeId}`)}
                onKeyPress={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        navigate(`/viewepisode?episodeId=${episode.episodeId}`);
                    }
                }}
            >
                <div className="card">
                    <div className="card-image" style={{ height: "200px" }}>
                        <figure
                            className="image"
                            style={{ height: "100%" }}
                        >
                            <img
                                src={episode.imgURL}
                                alt={`Image de ${episode.title || "l'épisode"}`}
                                style={{ objectFit: "cover", height: "100%" }}
                            />
                        </figure>
                    </div>
                    <div className="card-content" style={{ padding: "0.5rem" }}>
                        <div className="content">
                            <p
                                className="title is-4 has-text-centered"
                                style={{ color: "#485FC7", marginBottom: "0.5rem" }}
                                role="button"
                                tabIndex="0"
                                aria-pressed="false"
                                onClick={() => navigate(`/Details?animeID=${episode.tvshowId}`)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        navigate(`/Details?animeID=${episode.tvshowId}`);
                                    }
                                }}
                            >
                                {episode.tvshowTitle}
                            </p>
                            <p
                                className="title is-4 has-text-centered"
                                style={{ color: "#485FC7", marginBottom: "0.5rem" }}
                                role="button"
                                tabIndex="0"
                                aria-pressed="false"
                                onClick={() => navigate(`/episodes?seasonId=${episode.seasonId}`)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        navigate(`/episodes?seasonId=${episode.seasonId}`);
                                    }
                                }}
                            >
                                Saison {episode.seasonNumber}
                            </p>
                            <p
                                className="title is-4 has-text-centered"
                                style={{ color: "#485FC7" }}
                                role="button"
                                tabIndex="0"
                                aria-pressed="false"
                                onClick={() => navigate(`/viewepisode?episodeId=${episode.episodeId}`)}
                                onKeyPress={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        navigate(`/viewepisode?episodeId=${episode.episodeId}`);
                                    }
                                }}
                            >
                                {episode.episodeTitle}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        ));
    };

    const totalPages = Math.ceil(history.length / episodesPerPage);

    function tableauPages() {
        let p = [];
        for (let i = 1; i <= totalPages; i++) {
            p.push(i);
        }
        return p;
    }

    return (
        <div className="container">
            <h1 className="title has-text-centered">Historique</h1>
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
