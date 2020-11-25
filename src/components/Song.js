// import React from "react";

const Song = ({ currentSong, isPlaying }) => {
  console.log(currentSong);
  return (
    <div className="song-container">
      <img
        className={isPlaying ? "song-cover" : "hidden"}
        src={currentSong.cover}
        alt={currentSong.name}
      ></img>
      <h2> {currentSong.name} </h2>
      <h3> {currentSong.artist} </h3>
    </div>
  );
};

export default Song;
