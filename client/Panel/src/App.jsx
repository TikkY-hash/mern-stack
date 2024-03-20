import { Provider } from 'react-redux';
import GlobalPage from './pages/GlobalPage';
import { BrowserRouter } from 'react-router-dom';

import { store } from './store/index';

import './index.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalPage />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
