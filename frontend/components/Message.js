import React from 'react'
import styled, { keyframes } from 'styled-components'
import PT from 'prop-types'

const opacity = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const StyledMessage = styled.div`
  animation: ${opacity} 1s forwards;
`
const MessageContainer = styled.div`
`;

export default function Message({ message }) {
  return (
    <MessageContainer>
    <StyledMessage key={message} id="message" className="Message__StyledMessage-sc-51el9x-0 eZpUtz">
      {message}
    </StyledMessage>
  </MessageContainer>
  )
}

Message.propTypes = {
  message: PT.string.isRequired,
}
