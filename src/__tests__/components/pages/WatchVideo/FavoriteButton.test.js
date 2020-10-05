import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import FavoriteButton from '../../../../components/pages/WatchVideo/WatchVideo.FavoriteButton';
import FavsContextProvider from '../../../../providers/FavsContext';

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

describe('Favorite Test', () => {
  test('test if Favorite button renders', async () => {
    await act(async () => {
      customProvider(<FavoriteButton />);
    });
    expect(screen.getByText('Add Favorite')).toBeInTheDocument();
  });
});

describe('Add & Remove Favorite Test', () => {
  test('test if adds Favortie and removes favorite after', async () => {
    await act(async () => {
      customProvider(<FavoriteButton />);
    });
    fireEvent.click(screen.getByText('Add Favorite'));
    let rerender = await screen.getByText('Remove Favorite');
    expect(rerender).toBeInTheDocument();
    fireEvent.click(screen.getByText('Remove Favorite'));
    rerender = await screen.getByText('Add Favorite');
    expect(rerender).toBeInTheDocument();
  });
});
