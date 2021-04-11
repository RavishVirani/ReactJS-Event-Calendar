import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';
import { Provider } from 'react-redux';

function CalendarApp() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default CalendarApp;
