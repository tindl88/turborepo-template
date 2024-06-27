import * as matchers from '@testing-library/jest-dom/matchers';

import { server } from '../libs/msw/server';

expect.extend(matchers);

vi.mock('@tanstack/react-query');
vi.mock('zustand');

class IntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver
});

Object.defineProperty(global.navigator, 'geolocation', {
  writable: true,
  configurable: true,
  value: {
    clearWatch: vi.fn(),
    getCurrentPosition: vi.fn(),
    watchPosition: vi.fn()
  }
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
