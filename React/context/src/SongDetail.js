import React from "react";
import { useSongContext } from "./SongContext";

function SongDetail() {
  const context = useSongContext();

  return (
    <div>
      {context.selectedSong.title ? <h1>{context.selectedSong.title}</h1> : <h1>Selecciona una canción</h1>}
      {context.selectedSong ? <button onClick={() => context.deleteSong(context.selectedSong.title)}>Borrar</button> : null}
    </div>
  );
}

export default SongDetail;
