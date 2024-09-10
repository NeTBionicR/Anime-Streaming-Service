import { useNavigate } from "react-router-dom";

export function Anime(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/Details?animeID=${props.animes.tvshowId}`);
    }

    return (
        <div className="column is-3-desktop is-4-tablet is-6-mobile">
            <div
                className="card has-text-black"
                onClick={handleClick}
                role="button"
                tabIndex="0"
                aria-pressed="false"
                onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleClick();
                    }
                }}
            >
                <div className="card-image">
                    <figure className="image is-square" style={{ "minHeight": 400 }}>
                        <img src={props.animes.imgURL} alt={`Image de ${props.animes.title}`} />
                    </figure>
                </div>
                <div className="card-content">
                    <div className="content">
                        <h3 className="title is-3 has-text-centered has-text-black" aria-label={`Titre: ${props.animes.title}`}>
                            {props.animes.title}
                        </h3>
                        <div className="mb-0 has-text-centered">
                            <span className="has-text-weight-bold has-text-centered" aria-label="Studio">Studio: </span>
                            <span>{props.animes.studio.name}</span>
                        </div>
                        <div className="mb-0 has-text-centered">
                            <span className="has-text-weight-bold is-multiline has-text-centered" aria-label="Genres">Genres: </span>
                            <span>{props.animes.genres.map((p) => p.name).join(", ")}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
