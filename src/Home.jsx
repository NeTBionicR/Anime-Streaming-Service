import { useEffect, useState } from "react";
import { Anime } from "./Anime.jsx";

export function Home() {
    const [animes, setAnimes] = useState([]);
    const [studios, setStudios] = useState([]);
    const [titreFiltrer, setTitreFiltrer] = useState("");
    const [studioFiltrer, setStudioFiltrer] = useState("");
    const [taillePage, setTaillePage] = useState(8);
    const [pageCourante, setPageCourante] = useState(1);

    useEffect(() => {
        async function getAnimes() {
            const rep = await fetch("https://tvshowdbapi.herokuapp.com/tvshows");
            if (rep.ok) {
                const data = await rep.json();
                setAnimes(data);
            }
        }
        async function getStudios() {
            const rep = await fetch("https://tvshowdbapi.herokuapp.com/studios");
            if (rep.ok) {
                const data = await rep.json();
                setStudios(data);
            }
        }
        function nbAnimeParPages() {
            if (localStorage.getItem("nbAnimeParPages")) {
                setTaillePage(parseInt(localStorage.getItem("nbAnimeParPages")));
            } else {
                setTaillePage(8);
            }
        }
        getAnimes();
        getStudios();
        nbAnimeParPages();
    }, []);

    function filteredAnimes() {
        let anime = animes;
        if (titreFiltrer !== "") {
            anime = anime.filter((t) => t.title.toUpperCase().includes(titreFiltrer.toUpperCase()));
        }
        if (studioFiltrer !== "") {
            anime = anime.filter((t) => t.studio.name.includes(studioFiltrer));
        }
        return anime;
    }

    function nbPages() {
        return Math.ceil(filteredAnimes().length / taillePage);
    }

    function Paginer() {
        const debut = (pageCourante - 1) * taillePage;
        const fin = debut + taillePage;
        return filteredAnimes().slice(debut, fin);
    }

    function tableauPages() {
        let p = [];
        for (let i = 1; i <= nbPages(); i++) {
            p.push(i);
        }
        return p;
    }

    function changePage(itemsPerPage) {
        setTaillePage(itemsPerPage);
        localStorage.setItem("nbAnimeParPages", itemsPerPage);
        setPageCourante(1);
    }

    return (
        <div className="container">
            <div className="field-body" style={{ marginTop: 50, width: 500, marginLeft: "30%" }}>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label htmlFor="titre" className="label">Titre</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded">
                                <input
                                    id="titre"
                                    className="input"
                                    style={{ width: 200 }}
                                    type="text"
                                    placeholder="Titre de l'anime"
                                    aria-label="Filtrer par titre"
                                    onChange={(e) => {
                                        setTitreFiltrer(e.target.value);
                                        setPageCourante(1);
                                    }}
                                />
                            </p>
                        </div>
                    </div>
                </div>
                {studios.length > 0 && (
                    <div className="field is-horizontal" style={{ paddingLeft: 20 }}>
                        <div className="field-label is-normal">
                            <label className="label" htmlFor="studios">Studio</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control" style={{ minWidth: 200 }}>
                                    <div className="select is-fullwidth">
                                        <select id="studios" aria-label="Filtrer par studio" onChange={(e) => {
                                            setStudioFiltrer(e.target.value);
                                            setPageCourante(1);
                                        }}>
                                            <option key="default" value=""></option>
                                            {studios.map((studio) => (
                                                <option key={studio.studioId} value={studio.name}>
                                                    {studio.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="anime-list" style={{ marginTop: 50, display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                {Paginer().map((anime) => (
                    <Anime key={anime.id} animes={anime} />
                ))}
            </div>
            <nav className="pagination" role="navigation" aria-label="pagination" style={{ marginLeft: "3.3%", marginRight: "3.3%" }}>
                <button
                    className={pageCourante === 1 ? "pagination-previous is-disabled" : "pagination-previous"}
                    onClick={() => {
                        if (pageCourante > 1) {
                            setPageCourante(pageCourante - 1);
                        }
                    }}
                    aria-label="Page précédente"
                    disabled={pageCourante === 1}
                >
                    &lt;
                </button>
                <button
                    className={pageCourante === nbPages() ? "pagination-next is-disabled" : "pagination-next"}
                    onClick={() => {
                        if (pageCourante < nbPages()) {
                            setPageCourante(pageCourante + 1);
                        }
                    }}
                    aria-label="Page suivante"
                    disabled={pageCourante === nbPages()}
                >
                    &gt;
                </button>
                <ul className="pagination-list">
                    {tableauPages().map((numPage) => (
                        <li key={numPage}>
                            <button
                                className={pageCourante === numPage ? "pagination-link is-current" : "pagination-link"}
                                aria-label={`Page ${numPage}`}
                                onClick={() => setPageCourante(numPage)}
                            >
                                {numPage}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="has-text-centered container" style={{ marginTop: -55, width: 60}}>
                <label htmlFor="itemsPerPage" className="label" aria-label="Nombre d'animes par page"></label>
                <select
                    id="itemsPerPage"
                    className="select"
                    defaultValue={localStorage.getItem("nbAnimeParPages") ? localStorage.getItem("nbAnimeParPages") : 8}
                    aria-label="Nombre d'animes par page"
                    onChange={(e) => changePage(parseInt(e.target.value))}
                >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                </select>
            </div>
        </div>
    );
}
