// import React from "react";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });
  // Ref (instead of doing const audio = document.querySelector('audio'))
  const audioRef = useRef(null); // and as we added it to audio as ref attribute now instead of null current is => {current: audio }

  // Event Handlers
  const playSongHandler = () => {
    // console.log(audioRef.current); //output: <audio src="https://mp3.chillhop.com/serve.php/?mp3=10075"></audio>
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((audio) => {
            // audioRef.current.play();
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      // first divide it by 60 to show the minute and after the seconds. Every time it gets up to 60 it starts back at 0
    );
  };

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo((prev) => ({ ...prev, currentTime: e.target.value }));
  };

  const skipTrackHandler = (direction) => {
    const currentIndex = songs.findIndex((s) => s.id === currentSong.id);
    let newIndex = currentIndex + direction;

    //from first song to last song:
    if (newIndex < 0) {
      newIndex = songs.length - 1;
      //from last song to first song:
    } else if (newIndex >= songs.length) {
      newIndex = 0;
    }
    setCurrentSong(songs[newIndex]);
  };

  /*
    console.log("is it playing? ", isPlaying);
    // This to play only if library song is clicked and play btn is playing, it won't if it is not playing
    useEffect(() => {
      if (isPlaying && audioRef.current.paused) {
        audioRef.current.play();
      }
    }, [isPlaying, currentSong]);
  */

  // This to play when library song is clicked and play btn is either paused or playing
  const isInitialMount = useRef(true); //checking if its first mount

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then((audio) => {
            // audioRef.current.play();
            setIsPlaying(true);
          })
          .catch((error) => {
            console.log(error);
            // audioRef.current.pause();
            // setIsPlaying(false);
          });
      }
    }
  }, [currentSong]);

  return (
    <div className="player">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)} </p>
        <input
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currentTime}
          onChange={dragHandler}
          type="range"
        />
        {/* Added or zero below to fix NaN error */}
        <p> {getTime(songInfo.duration || 0)} </p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          onClick={() => skipTrackHandler(-1)}
          size="2x"
          icon={faAngleLeft}
        />
        <FontAwesomeIcon
          className="play-pause"
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          onClick={() => skipTrackHandler(1)}
          className="skip-forward"
          size="2x"
          icon={faAngleRight}
        />
      </div>
      <audio
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
