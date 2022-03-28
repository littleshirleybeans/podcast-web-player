import React, { createContext, useState } from 'react'

export const QueueContext = createContext({
  queue: [],
  setQueue: () => {},
})

const Queue = (props) => {
  const [list, setList] = useState([]);

  const setQueue = (list) => {
    setList(list);
  }
  
  return (
    <QueueContext.Provider
      value={{
        queue: list,
        setQueue: setQueue,
      }}
    >
      {props.children}
    </QueueContext.Provider>
  )
}

export default Queue