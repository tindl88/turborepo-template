import { vi } from 'vitest';

export default vi.fn();
export const createLocalizedPathnamesNavigation = vi.fn(() => ({
  Link: vi.fn(),
  redirect: vi.fn(),
  getPathname: vi.fn(),
  usePathname: vi.fn(),
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn()
  })
}));
