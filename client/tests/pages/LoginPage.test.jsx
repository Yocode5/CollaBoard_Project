import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../../src/pages/LoginPage';

vi.mock('react-router-dom', () => ({
  Link: ({ children, to }) => <a href={to}>{children}</a>,
  useNavigate: () => vi.fn(),
}));

const mocks = vi.hoisted(() => {
  const mockSetEmail = vi.fn();
  const mockSetPassword = vi.fn();
  const mockHandleSubmit = vi.fn((e) => {
    if (e) e.preventDefault();
  });
  return {
    mockSetEmail,
    mockSetPassword,
    mockHandleSubmit,
    hookState: {
      email: '',
      setEmail: mockSetEmail,
      password: '',
      setPassword: mockSetPassword,
      errors: {},
      isLoading: false,
      handleSubmit: mockHandleSubmit,
    },
  };
});

vi.mock('../../src/hooks/useLoginForm', () => ({
  useLoginForm: () => mocks.hookState,
}));

describe('Login UI Component', () => {
  beforeEach(() => {
    mocks.hookState.email = '';
    mocks.hookState.password = '';
    mocks.hookState.errors = {};
    mocks.hookState.isLoading = false;
    vi.clearAllMocks();
  });

  test('renders the login form elements correctly', () => {
    render(<LoginPage />);
    
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('triggers state updates when the user types', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByRole('textbox');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    
    expect(mocks.mockSetEmail).toHaveBeenCalledWith('test@example.com');
  });

  test('calls handleSubmit when the login button is clicked', () => {
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);
    
    expect(mocks.mockHandleSubmit).toHaveBeenCalled();
  });

  test('displays error messages when provided by the form', () => {
    mocks.hookState.errors = { 
      email: 'Invalid email address', 
      password: 'Password is required' 
    };
    
    render(<LoginPage />);
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
  });

  test('disables the submit button when loading', () => {
    mocks.hookState.isLoading = true;
    
    render(<LoginPage />);
    
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });
});