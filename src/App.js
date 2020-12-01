import { useState } from "react";
// Import styles
import "./styles/app.scss";
// Import music
import chillHop from "./util";
// Import components
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

function App() {
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openLibrary, setOpenLibrary] = useState(false);
  return (
    <div className="App">
      <Nav openLibrary={openLibrary} setOpenLibrary={setOpenLibrary} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        songs={songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Library
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
        openLibrary={openLibrary}
      />
    </div>
  );
}

export default App;
