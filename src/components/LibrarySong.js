const LibrarySong = ({ song, setCurrentSong, songs, setSongs }) => {
  const songSelectHandler = () => {
    setCurrentSong(song);
    // Add active state in selected song
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return {
          ...s,
          active: true,
        };
      } else {
        return {
          ...s,
          active: false,
        };
      }
    });
    setSongs(newSongs);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img src={song.cover} alt={song.name}></img>
      <div className="song-description">
        <h3> {song.name} </h3>
        <h4> {song.artist} </h4>
      </div>
    </div>
  );
};

export default LibrarySong;
