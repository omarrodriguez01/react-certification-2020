import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../components/App';

test('renders page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
