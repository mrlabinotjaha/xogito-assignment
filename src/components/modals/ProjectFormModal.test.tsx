// ProjectFormModal.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import ProjectFormModal from './ProjectFormModal'
import '@testing-library/jest-dom/extend-expect'

const mockStore = configureStore()
const store = mockStore({})

const users = [
  { id: '1', name: 'User1', email: 'user1@example.com' },
  { id: '2', name: 'User2', email: 'user2@example.com' },
]

describe('ProjectFormModal Component', () => {
  it('renders "Submit" button when modal is open', () => {
    render(
      <Provider store={store}>
        <ProjectFormModal isOpen={true} onClose={jest.fn()} users={users} project={null} />
      </Provider>
    )
    const submitButton = screen.getByRole('button', { name: /submit/i })
    expect(submitButton).toBeInTheDocument()
  })
})

describe('ProjectFormModal Validation', () => {
  it('displays validation errors when submitting an empty form', async () => {
    render(
      <Provider store={store}>
        <ProjectFormModal isOpen={true} onClose={jest.fn()} users={users} project={null} />
      </Provider>
    )

    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)

    expect(await screen.findByText('Name is required')).toBeInTheDocument()
    expect(await screen.findByText('Description is required')).toBeInTheDocument()
    expect(await screen.findByText('Owner is required')).toBeInTheDocument()
  })
})
