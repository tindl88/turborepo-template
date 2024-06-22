import { useRouter } from '@/navigation';

import { ROUTES } from '@/constants/routes.constant';

import { act, fireEvent, render } from '@tests/unit/utils/test.util';

import Unauthenticated from '../unauthenticated';

vi.mock('@/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn()
  })
}));

describe('Unauthenticated Component', () => {
  test('should not renders the component if visible is false', async () => {
    const { queryByTestId } = render(<Unauthenticated />);

    const main = queryByTestId('unauthenticated');

    expect(main).not.toBeInTheDocument();
  });

  test('should renders the component if visible is true', async () => {
    const { findByTestId } = render(<Unauthenticated visible={true} />);

    const btnSignIn = await findByTestId('btn-signin');
    const btnSignUp = await findByTestId('btn-signup');

    expect(btnSignIn).toBeInTheDocument();
    expect(btnSignUp).toBeInTheDocument();
  });

  test('should navigate to LOGIN route when Sign In button is clicked', async () => {
    const { findByTestId } = render(<Unauthenticated visible={true} />);

    const btnSignIn = await findByTestId('btn-signin');

    expect(btnSignIn.innerHTML).toBe('Sign in');

    act(() => {
      fireEvent.click(btnSignIn);
    });

    expect(useRouter().push).toHaveBeenCalledWith(ROUTES.SIGN_IN);
  });

  test('should navigate to REGISTER route when Sign Up button is clicked', async () => {
    const { findByTestId } = render(<Unauthenticated visible={true} />);

    const btnSignUp = await findByTestId('btn-signup');

    expect(btnSignUp.innerHTML).toBe('Sign up');

    act(() => {
      fireEvent.click(btnSignUp);
    });

    expect(useRouter().push).toHaveBeenCalledWith(ROUTES.REGISTER);
  });
});
