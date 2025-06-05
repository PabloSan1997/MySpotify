

export function YourOneSong({ title, urlImage, album }: Song) {

  return (
    <div className="your_one_song">
      <img src={urlImage} alt={title} />
      <div className="area_info">
        <span className="title">{title}</span>
        <div className="artist">{album.artists.map(p=><span key={p.id}>{p.name}</span>)}</div>
      </div>
    </div>
  );
}
