


export function AlbumCom({ title, urlImage, artists, categories }: Album) {
    return (
        <div className="album">
            <img src={urlImage} alt={title} />
            <div className="area_info">
                <h3>{title}</h3>
                <div className="artists">
                    {artists.map(a => <span key={a.id}>{a.name}</span>)}
                </div>
                <div className="categories">
                    {categories.map(c => <span key={c.id}>{c.title}</span>)}
                </div>
            </div>
        </div>
    );
}
