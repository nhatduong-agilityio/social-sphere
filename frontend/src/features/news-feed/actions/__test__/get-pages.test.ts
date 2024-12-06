import { MOCK_PAGES } from '@/__mocks__';
import { getPages } from '../get-pages';

describe('getPages', () => {
  it('should return mock pages data successfully', async () => {
    const result = await getPages();
    expect(result).toEqual({ data: MOCK_PAGES });
  });
});
