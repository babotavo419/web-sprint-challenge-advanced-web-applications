import React from 'react'
import { render } from '@testing-library/react'
import Spinner from './Spinner'
import '@testing-library/jest-dom'

test('Spinner renders correctly when on is true', () => {
  const { container, getByText } = render(<Spinner on={true} />)

  // Check if the spinner text is present
  const spinnerText = getByText('Please wait...')
  expect(spinnerText).toBeInTheDocument()

  // Check if the spinner id is present
  const spinner = container.querySelector('#spinner')
  expect(spinner).toBeTruthy()
})

test('Spinner does not render when on is false', () => {
  const { queryByText, container } = render(<Spinner on={false} />)

  // Check if the spinner text is not present
  const spinnerText = queryByText('Please wait...')
  expect(spinnerText).not.toBeInTheDocument()

  // Check if the spinner id is not present
  const spinner = container.querySelector('#spinner')
  expect(spinner).toBeNull()
})

