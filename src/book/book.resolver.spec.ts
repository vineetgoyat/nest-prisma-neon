import { BookResolver } from './book.resolver';

describe('BookResolver', () => {
  let resolver: BookResolver;

  beforeEach(() => {
    const mockBookService: Partial<Record<string, any>> = {};
    resolver = new BookResolver(mockBookService as any);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
