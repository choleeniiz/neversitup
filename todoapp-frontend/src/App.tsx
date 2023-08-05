import './App.css';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Login from './views/Login';
// import PrivateRoute from './components/PrivateRoute';
import Todo from './views/todo';
import { UserStore } from './stores/user.store';

const PrivateRoute = () => {
  const { accessToken } = UserStore()
  if (!accessToken) {
    return <Navigate to={'login'} replace />;
  }

  return <Outlet />;
};


const App = () => {
  return <ErrorBoundary>
    <BrowserRouter >
      <Routes>
        <Route path="/login" Component={Login} />
        <Route element={<PrivateRoute />}>
          <Route path="/" Component={Todo} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ErrorBoundary>
}

export default App;
