import React, { createContext } from 'react'

export const AudioContext = createContext({
  id: null,
  audio: null,
  image: null,
  setAudio: () => {},
  autoPlay: false,
  trackName: null,
  collectionName: null,
})

const Audio = (props) => {
  const [id, setId] = React.useState(null);
  const [audio, setAudio] = React.useState(null);
  const [image, setImage] = React.useState(null);
  const [trackName, setTrackName] = React.useState(null);
  const [collectionName, setCollectionName] = React.useState(null);

  const toggleAudio = (audioId, audioLink, audioImage, collectionName, trackName) => {
    setId(audioId);
    setAudio(audioLink);
    setImage(audioImage);
    setCollectionName(collectionName);
    setTrackName(trackName);
  };

  return (
    <AudioContext.Provider
      value={{
        id: id,
        audio: audio,
        image: image,
        setAudio: toggleAudio,
        collectionName: collectionName,
        trackName: trackName,
      }}
    >
      {props.children}
    </AudioContext.Provider>
  )
}

export default Audio