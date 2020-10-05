import {
  searchTrending,
  searchAPI,
  getRelatedVideos,
  getVideoDetails,
} from '../../api/YoutubeApi';

describe('searchTrending', () => {
  it('retrieves trending videos from API', async () => {
    const result = await searchTrending();

    expect(result).toBeInstanceOf(Object);
  });
});

describe('searchAPI', () => {
  it('retrieves search results from API', async () => {
    const word = 'Wizeline';
    const result = await searchAPI(word);

    expect(result).toBeInstanceOf(Object);
  });
});

describe('RelatedVideos', () => {
  it('retrieves related videos from API', async () => {
    const id = 'g_uRK3JExqY';
    const result = await getRelatedVideos(id);

    expect(result).toBeInstanceOf(Object);
  });
});

describe('VideosDetails', () => {
  it('retrieves videos details from API', async () => {
    const id = 'g_uRK3JExqY';
    const result = await getVideoDetails(id);

    expect(result).toBeInstanceOf(Object);
  });
});
