import { render } from '@tests/unit/utils/test.util';

import Menu from '../menu';

describe('Menu Component', () => {
  test('should renders the menu', async () => {
    const { findByTestId, findByRole } = render(<Menu />);

    const menuElm = await findByTestId('main-menu');
    const lnkHome = await findByRole('link', { name: /Home/ });
    const lnkBlogs = await findByRole('link', { name: /Blogs/ });
    const lnkPhotos = await findByRole('link', { name: /Photos/ });
    const lnkGames = await findByRole('link', { name: /Game/ });

    expect(menuElm).toBeInTheDocument();
    expect(lnkHome).toBeInTheDocument();
    expect(lnkHome).toHaveAttribute('href', '/en-us');
    expect(lnkBlogs).toBeInTheDocument();
    expect(lnkBlogs).toHaveAttribute('href', '/en-us/blogs');
    expect(lnkPhotos).toBeInTheDocument();
    expect(lnkPhotos).toHaveAttribute('href', '/en-us/photos');
    expect(lnkGames).toBeInTheDocument();
    expect(lnkGames).toHaveAttribute('href', '/en-us/game');
  });
});
