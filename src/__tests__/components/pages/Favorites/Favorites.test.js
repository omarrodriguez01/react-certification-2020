import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import Favorites from '../../../../components/pages/Favorites/Favorites';
import FavsContextProvider from '../../../../providers/FavsContext';
import LoginPage from '../../../../components/pages/Login';

const customProvider = (ui) => {
  return render(
    <BrowserRouter>
      <AuthContextProvider>
      <FavsContextProvider>
        <SearchProvider>{ui}</SearchProvider>
        </FavsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
};

jest.mock('../../../../api/YoutubeApi', () => {
  return {
    getFavoritesVideos: jest.fn(() => {
      return {
        kind: 'youtube#videoListResponse',
        etag: 'PKlTcgzwnfrTrap4ghDJWiX2_V4',
        items: [
          {
            etag: 'WXn783kVdDIIz3wazZxZpydTc_g',
            id: 'UnXBuHbvm0k',
            kind: 'youtube#video',
            snippet: {
              categoryId: '24',
              channelId: 'UCNbwP-bKUlKrE_5qDwvFILQ',
              channelTitle: 'Antrax',
              defaultAudioLanguage: 'es',
              description:
                '★★GRACIAS POR VER EL VIDEO, LIKE Y SUSCRIBETE PARA MÁS★★↵Canales #TeamLeyenda↵@Fede Vigevani @Más SKabeche ↵►Sígueme en Instagram: https://www.instagram.com/YoSoyAntrax/↵►Sígueme en Twitter: https://twitter.com/YoSoyAntrax↵►Sígueme en Facebook: https://www.facebook.com/YoSoyAntrax↵★★★★★★★★★★★★★★★★★',
              liveBroadcastContent: 'none',
              localized: {
                title: '¡JUGAMOS AMONG US en VIDA REAL en una MANSIÓN! - [ANTRAX] ☣',
                description:
                  '★★GRACIAS POR VER EL VIDEO, LIKE Y SUSCRIBETE PARA…://www.facebook.com/YoSoyAntrax↵★★★★★★★★★★★★★★★★★',
              },
              publishedAt: '2020-10-01T21:30:01Z',
              tags: [
                'antrax',
                'antrax reto',
                'teamtrax',
                'antrax youtube',
                'Among us',
                'Among us vida real',
                'Antrax vida real',
                'Skabeche',
                'Fede vigevani',
                'Vecibanda',
                'Teamtrax',
              ],
              thumbnails: {
                high: {
                  url: 'https://i.ytimg.com/vi/UnXBuHbvm0k/hqdefault.jpg',
                  width: 480,
                  height: 360,
                },
              },
              title: '¡JUGAMOS AMONG US en VIDA REAL en una MANSIÓN! - [ANTRAX] ☣',
            },
          },
        ],
      };
    }),
  };
});

describe('Favorites test', () => {
  test('test if Favorite page renders', async () => {
    await act(async () => {
      customProvider(<Favorites />);
    });
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });
});

describe('Login test and Favorites', () => {
  test('test if access to Favorites page after login', async () => {
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
    })
    await act(async () => {
      customProvider(<Favorites />);
    });
    const rrerender = await screen.getByText('Favorites');
    expect(rrerender).toBeInTheDocument();
  });
});
