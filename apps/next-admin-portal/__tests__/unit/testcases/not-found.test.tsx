import NotFoundPage from '@/app/[locale]/(error)/not-found';

import { pageParams } from '@tests/unit/constants';
import { render } from '@tests/unit/utils/test.util';

describe('NotFound Page', () => {
  test('should renders the page', async () => {
    const { findByTestId } = render(NotFoundPage(pageParams));

    const content = await findByTestId('error-info');

    expect(content).toBeInTheDocument();
  });
});
