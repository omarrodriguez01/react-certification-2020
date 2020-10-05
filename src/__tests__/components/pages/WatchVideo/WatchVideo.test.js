import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import WatchVideo from '../../../../components/pages/WatchVideo/WatchVideo';
import LoginPage from '../../../../components/pages/Login';
import FavsContextProvider from '../../../../providers/FavsContext';

const customProvider = (ui) => {
  return render(
    <BrowserRouter>
      <FavsContextProvider>
        <AuthContextProvider>
          <SearchProvider>{ui}</SearchProvider>
        </AuthContextProvider>
      </FavsContextProvider>
    </BrowserRouter>
  );
};

jest.mock('../../../../api/YoutubeApi', () => {
  return {
    getVideoDetails: jest.fn((id) => {
      return {
        kind: 'youtube#videoListResponse',
        etag: 'YGcV9MrYlPYXvC6W2rNQ1vWCZyc',
        items: [
          {
            etag: '78mzsdxfp-7aj-oJT5N10LdDGaE',
            id: 'g_uRK3JExqY',
            kind: 'youtube#video',
            snippet: {
              publishedAt: '2020-10-03T19:08:10Z',
              channelId: 'UCGmnsW623G1r-Chmo5RB4Yw',
              title: 'I Found A Good Jake Paul Diss Track',
              description:
                'https://www.instagram.com/ksi ↵https://www.tiktok.com/@ksi↵https://twitter.com/KSI',
              thumbnails: {
                high: {
                  url: 'https://i.ytimg.com/vi/g_uRK3JExqY/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
            },
          },
        ],
      };
    }),
    getRelatedVideos: jest.fn(() => {
      return {
        kind: 'youtube#searchListResponse',
        etag: '5pR7zVzwWkr_VPbEx_ZcBtbYkz8',
        items: [
          {
            kind: 'youtube#searchResult',
            etag: 'xJkz7DmC6FOh1aj3mPo5cmzxAxc',
            id: { kind: 'youtube#video', videoId: 'xsI0KiVQOAw' },
            snippet: {
              publishedAt: '2020-10-01T16:21:01Z',
              channelId: 'UCGmnsW623G1r-Chmo5RB4Yw',
              title: 'It‘s So Hard Not To Laugh At This',
              description:
                'https://www.instagram.com/ksi ↵https://www.tiktok.com/@ksi↵https://twitter.com/KSI',
              thumbnails: {
                high: {
                  url: 'https://i.ytimg.com/vi/q1VX54wWVlo/default.jpg',
                  width: 120,
                  height: 90,
                },
              },
            },
          },
        ],
      };
    }),
  };
});

describe('watchvideo test', () => {
  test('test if video gets rendered', async () => {
    await act(async () => {
      customProvider(<WatchVideo />);
    });
    expect(screen.getByText('I Found A Good Jake Paul Diss Track')).toBeInTheDocument();
  });
});

describe('wtchvideo logged test', () => {
  test('test if option to add Favorite appears after login', async () => {
    await act(async () => {
      customProvider(<LoginPage />);
    });
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], {
        target: {
          value: 'wizeline',
        },
      });
      fireEvent.change(screen.getAllByRole('textbox')[1], {
        target: {
          value: 'Rocks!',
        },
      });
      fireEvent.click(screen.getByRole('button'));
    });
    await act(async () => {
      customProvider(<WatchVideo />);
    });
    const rrerender = await screen.getByText('Add Favorite');
    expect(rrerender).toBeInTheDocument();
  });
});
