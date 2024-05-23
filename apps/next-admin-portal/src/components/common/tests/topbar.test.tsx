import { Session } from 'next-auth';

import { PreferenceEntity } from '@/modules/auth/interfaces/auth.interface';

import { render } from '@tests/unit/utils/test.util';

import TopBar from '../topbar';

vi.mock('next/navigation');

describe('TopBar Component', () => {
  const session: Session = {
    user: {
      id: 'user-id',
      name: 'Company',
      email: 'hello@email.com',
      image: '',
      preference: {
        language: 'en-us',
        theme: 'dark'
      } as PreferenceEntity,
      accessToken: 'access_token',
      refreshToken: 'refresh_token'
    },
    expires: '2025-10-10T10:10:10.000Z'
  };

  test('should renders the topbar with unauthenticated', async () => {
    const { findByTestId } = render(<TopBar userSession={null} />);

    const language = await findByTestId('languages');
    const unauthenticated = await findByTestId('unauthenticated');

    expect(language).toBeInTheDocument();
    expect(unauthenticated).toBeInTheDocument();
  });

  test('should renders the topbar with authenticated', async () => {
    const { findByTestId } = render(<TopBar userSession={session} />);

    const language = await findByTestId('languages');
    const authenticated = await findByTestId('authenticated');

    expect(language).toBeInTheDocument();
    expect(authenticated).toBeInTheDocument();
  });
});
