import React from "react";
import { useSongContext } from "./SongContext";

function SongList({ listaCanciones: list }) {
  const context = useSongContext();

  return (
    <section>
      {context.list ? (
        context.list.map((song) => (
          <div className="row-song" onClick={() => context.setSelectedSong(song)}>
            <h4>{song.title}</h4>
            <h5>{song.artist}</h5>
          </div>
        ))
      ) : (
        <h1>Cargando...</h1>
      )}
    </section>
  );
}
export default SongList;
