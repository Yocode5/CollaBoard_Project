
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../../src/pages/LoginPage';

jest.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => jest.fn(),
}));

const mockSetEmail = jest.fn();
const mockSetPassword = jest.fn();
const mockHandleSubmit = jest.fn((e) => {
  if (e) e.preventDefault();
});

let mockHookState = {
  email: '',
  setEmail: mockSetEmail,
  password: '',
  setPassword: mockSetPassword,
  errors: {},
  isLoading: false,
  handleSubmit: mockHandleSubmit,
};

jest.mock('../../src/hooks/useLoginForm', () => ({
  useLoginForm: () => mockHookState,
}));

describe('Login UI Component', () => {
  beforeEach(() => {
    mockHookState = {
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      isLoading: false,
      handleSubmit: mockHandleSubmit,
    };
    jest.clearAllMocks();
  });

  test('renders the login form elements correctly', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('triggers state updates when the user types', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByPlaceholderText(/email/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  test('calls handleSubmit when the login button is clicked', () => {
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  test('displays error messages when provided by the form', () => {
    mockHookState.errors = { 
      email: 'Invalid email address', 
      password: 'Password is required' 
    };
    
    render(<LoginPage />);
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('disables the submit button and shows loading text when loading', () => {
    mockHookState.isLoading = true;
    
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/loading/i);
  });
});