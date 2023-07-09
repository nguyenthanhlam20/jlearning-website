import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from 'react-redux';
import { TopNav } from './layouts/dashboard/top-nav';
import Header from './components/Header';
import { SideNav } from './layouts/dashboard/side-nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { routes } from './contexts/routes';
import React from 'react';
import { ROLE } from './constants/constants';
import ErrorPage from './pages/error';

function App() {
  let user = useSelector((state) => state.authen.user);
console.log(user);
  const renderRoute = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.isPrivate && !user ? <Navigate to="/signin" /> : route.component}
          exact={route.exact}
        />
      );
    });
  };

  return (
    <>
      <Router>
        <div>
          {user?.role_id == ROLE.ADMIN ? <TopNav /> : <Header />}
          {user?.role_id == ROLE.ADMIN ? <SideNav /> : <></>}

          <Routes>{renderRoute()}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          {user?.role_id != ROLE.ADMIN ? <Footer /> : <></>}
          <ScrollToTop />

        </div>
      </Router>
    </>
  );
}

export default App;
