import React, { createContext, useState } from 'react'

export const MessageContext = createContext({
  msg: null,
  setMsg: () => {},
})

const Message = (props) => {
  const [message, setMessage] = useState(null);

  const setMsg = (msg) => {
    setMessage(msg);
  }
  
  return (
    <MessageContext.Provider
      value={{
        msg: message,
        setMsg: setMsg,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  )
}

export default Message