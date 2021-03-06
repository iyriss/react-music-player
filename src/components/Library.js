import React from "react";
import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  setSongs,
  openLibrary,
  currentSong,
}) => {
  return (
    <div className={`library ${openLibrary && "active-library"}`}>
      <h2> Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            song={song}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            key={song.id}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
