import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss';
import { Provider } from 'react-redux';
import { store } from './store.ts';
import { RoutsIndex } from './routes/RoutsIndex.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
        <RoutsIndex/>
    </Provider>
  </StrictMode>,
)
