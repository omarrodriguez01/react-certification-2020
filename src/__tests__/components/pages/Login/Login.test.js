import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { BrowserRouter } from 'react-router-dom';
import AuthContextProvider from '../../../../providers/Auth/AuthContext';
import SearchProvider from '../../../../providers/SearchProvider/SearchContext';
import FavsContextProvider from '../../../../providers/FavsContext';
import LoginPage from '../../../../components/pages/Login';
import 'mutationobserver-shim';
import Home from '../../../../components/pages/Home/Home';

global.MutationObserver = window.MutationObserver;

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

describe('Login test', () => {
  test('test if get login renders', async () => {
    await act(async () => {
      customProvider(<LoginPage />);
    });
    expect(screen.getByText('username')).toBeInTheDocument();
  });
});

describe('Login test', () => {
  test('test for succesful login', async () => {
    await act(async () => {
      customProvider(<LoginPage />);
    });
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
    fireEvent.click(screen.getByText('login'));
  });
});

describe('Login test', () => {
  test('test for invalid login', async () => {
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
          value: 'Rocks!sss',
        },
      });
      fireEvent.click(screen.getByRole('button'));
    });
    const rrerender = await screen.getByText(
      'Psssssst.... username: wizeline pass: Rocks!'
    );
    expect(rrerender).toBeInTheDocument();
  });
});

describe('Login test', () => {
  test('test if favorites renders on main page after login', async () => {
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
      customProvider(<Home />);
    });
    const rrerender = await screen.getByText('Favorites');
    expect(rrerender).toBeInTheDocument();
  });
});
