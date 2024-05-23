import RegisterPage from '@/app/[locale]/(public)/register/page';

import { pageParams } from '@tests/unit/constants';
import { render } from '@tests/unit/utils/test.util';

describe('Register Page', () => {
  test('should renders the page', async () => {
    const { findByTestId } = render(RegisterPage(pageParams));

    const content = await findByTestId('frm-register');

    expect(content).toBeInTheDocument();
  });
});
