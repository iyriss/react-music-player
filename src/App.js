import { useState } from "react";
// Import styles
import "./styles/app.scss";
// Import music
import chillHop from "./util";
// Import components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";

function App() {
  const [songs, setSongs] = useState(chillHop());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="App">
      <Song currentSong={currentSong} />
      <Player
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library songs={songs} />
    </div>
  );
}

export default App;
