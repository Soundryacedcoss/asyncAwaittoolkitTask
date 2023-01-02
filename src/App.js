import './App.css';
import { LandingPage } from './LandingPage';
import { Provider } from 'react-redux';
import store from './Store';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorPage } from './ErrorPage';
function App() {
  return (
    <>
    <Provider store={store}>
    <div className="App">
      <ErrorBoundary FallbackComponent={ErrorPage}>
      <LandingPage/>
      </ErrorBoundary>
    </div>
    </Provider>
    </>
  );
}

export default App;
