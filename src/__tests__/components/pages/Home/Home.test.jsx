import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import Home from '../../../../components/pages/Home/Home';

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
    searchTrending: jest.fn(() => {
      return {
        kind: 'youtube#videoListResponse',
        etag: 'Fo1rJT3idzTaZsNhBNZOFDs_9-I',
        items: [
          {
            contentDetails: {
              caption: 'false',
              contentRating: {},
              definition: 'hd',
              dimension: '2d',
              duration: 'PT6M39S',
              licensedContent: true,
              projection: 'rectangular',
            },
            kind: 'youtube#video',
            etag: '4OKQIrp3mjgRNNkrliE_8PPBnjw',
            id: 'q1VX54wWVlo',
            snippet: {
              categoryId: '1',
              channelId: 'UCqJ5zFEED1hWs0KNQCQuYdQ',
              channelTitle: 'Mikecrack',
              defaultAudioLanguage: 'es-ES',
              defaultLanguage: 'es',
              description: 'Mike',
              liveBroadcastContent: 'none',
              localized: {
                title:
                  '¡LOS SUPERPODERES DE MIKE! 😱⚡ Las Perrerías de Mike Ep. 2 (Temporada 1)',
                description:
                  'Mike quiere saber más sobre sus superpoderes. Rapt…: Bastián Cortés ↵Producción Musical: Dante Zhero',
              },
              publishedAt: '2020-10-03T18:00:10Z',
              tags: [
                'mikecrack',
                'mikecrak',
                'mike',
                'las perrerias de mike',
                'mikecrack perrerías de mike',
                'perrerias de mike temporada 1',
                'perrerias de mike ep 2',
                'perrerias de mike cap 2',
                'perrerias de mike 2',
                'super poderes',
                'superpoderes',
                'super poder',
                'superpoder',
                'super perro',
                'super perro mike',
                'super mike',
                'mike super poderes',
                'mike superpoderes',
                'mikecrack superpoderes',
                'perrrerias de mike superpoderes',
              ],
              thumbnails: {
                default: {
                  url: 'https://i.ytimg.com/vi/q1VX54wWVlo/default.jpg',
                  width: 120,
                  height: 90,
                },
              },
              title:
                '¡LOS SUPERPODERES DE MIKE! 😱⚡ Las Perrerías de Mike Ep. 2 (Temporada 1)',
            },
          },
        ],
      };
    }),
  };
});

describe('Home test', () => {
  test('test if trending videos render along with page', async () => {
    await act(async () => {
      customProvider(<Home />);
    });
    expect(screen.getByText('Trending')).toBeInTheDocument();
  });
});
