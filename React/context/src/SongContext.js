import React, { useEffect, useState } from "react";
import canciones from "./listaCanciones.json";

const SongContext = React.createContext();

function SongProvider(props) {
  const [list, setList] = useState(false);
  const [selectedSong, setSelectedSong] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setList(canciones);
    }, 2000);
  }, []);

  function deleteSong(songTitle) {
    const index = list.findIndex(({ title }) => title === songTitle);
    list.splice(index, 1);
    setList(list);
    setSelectedSong({});
  }

  const value = {
    list,
    selectedSong,
    setSelectedSong,
    deleteSong,
  };

  return (
    // value es un objeto que indica qué datos son globales.
    <SongContext.Provider value={value} {...props} />
  );
}

const useSongContext = () => React.useContext(SongContext);

export { SongProvider, useSongContext };
