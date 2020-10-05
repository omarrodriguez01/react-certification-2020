import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import SearchResults from '../../../../components/pages/SearchResults/SearchResults';

const customProvider = (ui) => {
  return render(
    <BrowserRouter>
      <AuthContextProvider>
        <SearchProvider>{ui}</SearchProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

jest.mock('../../../../api/YoutubeApi', () => {
  return {
    searchAPI: jest.fn(() => {
      return {
        kind: 'youtube#videoListResponse',
        etag: 'Fo1rJT3idzTaZsNhBNZOFDs_9-I',
        items: [
          {
            etag: 'aUsSd_Ga2BbVoMfpG3Ph6Y_41-Q',
            id: { kind: 'youtube#video', videoId: 'g_uRK3JExqY' },
            kind: 'youtube#searchResult',
            snippet: {
              channelId: 'UCGmnsW623G1r-Chmo5RB4Yw',
              channelTitle: 'JJ Olatunji',
              description:
                'https://www.instagram.com/ksi https://www.tiktok.com/@ksi https://twitter.com/KSI.',
              liveBroadcastContent: 'none',
              publishTime: '2020-10-03T19:08:10Z',
              publishedAt: '2020-10-03T19:08:10Z',
              thumbnails: {
                high: {
                  url: 'https://i.ytimg.com/vi/g_uRK3JExqY/default.jpg',
                  width: 120,
                  height: 90,
                },
              },
              title: 'I Found A Good Jake Paul Diss Track',
            },
          },
        ],
      };
    }),
  };
});

describe('Search Reults tests', () => {
  test('test if renders response', async () => {
    await act(async () => {
      customProvider(<SearchResults />);
    });
    expect(screen.getByText('I Found A Good Jake Paul Diss Track')).toBeInTheDocument();
  });
});
