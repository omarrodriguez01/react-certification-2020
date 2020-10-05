import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import RelatedVideos from '../../../../components/pages/RelatedVideos/RelatedVideos';

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

describe('RelatedVideos test', () => {
  test('test if get related videos', async () => {
    await act(async () => {
      customProvider(<RelatedVideos />);
    });
    expect(screen.getByText('Related Videos')).toBeInTheDocument();
  });
});
