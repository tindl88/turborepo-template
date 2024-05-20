import LoginPage from '@/app/[locale]/(public)/login/page';

import { pageParams } from '@tests/unit/constants';
import { render } from '@tests/unit/utils/test.util';

describe('Login Page', () => {
  test('should renders the page', async () => {
    const { findByTestId } = render(LoginPage(pageParams));

    const content = await findByTestId('frm-login');

    expect(content).toBeInTheDocument();
  });
});
