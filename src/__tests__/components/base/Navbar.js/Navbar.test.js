import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../../../components/base/Navbar/Navbar';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import FavsContextProvider from '../../../../providers/FavsContext';
import LoginPage from '../../../../components/pages/Login';
import SearchResults from '../../../../components/pages/SearchResults/SearchResults';

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

describe('NavBar tests', () => {
  beforeEach(() => {});

  test('testing if Navbar renders', () => {
    const providerProps = {
      AuthValue: {
        userAuthenticated: false,
        Logout: jest.fn(() => {}),
      },
      searchValue: {},
    };
    customProvider(<Navbar />, { providerProps });
  });
});

describe('Login test', () => {
  test('test if get login renders', async () => {
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
      customProvider(<Navbar />);
    });
    const rrerender = await screen.getByText('logout');
    expect(rrerender).toBeInTheDocument();
  });
});

describe('Login test Navbar', () => {
  test('test if get login renders', async () => {
    await act(async () => {
      customProvider(<Navbar />);
    });
    await act(async () => {
      fireEvent.change(screen.getAllByRole('textbox')[0], {
        target: {
          value: 'wizeline',
        },
      });
      fireEvent.keyDown(screen.getByRole('textbox'), {
        key: 'Enter',
        code: 'Enter',
      });
    });
    await act(async () => {
      customProvider(<SearchResults />);
    });
    const rrerender = await screen.getByText('logout');
    expect(rrerender).toBeInTheDocument();
  });
});
