import { RedisIoAdapter } from './redis-io-adapter';

describe('RedisIoAdapter', () => {
  it('should be defined', () => {
    expect(new RedisIoAdapter()).toBeDefined();
  });
});
