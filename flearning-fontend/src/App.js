import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { TopNav } from './layouts/dashboard/top-nav';
import Header from './components/Header';
import { SideNav } from './layouts/dashboard/side-nav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { routes } from './contexts/routes';
import React  from 'react';
import authenSlice from './redux/authenSlice';
import { decryptToken } from './helpers/decryptToken';
import { ROLE } from './constants/constants';
import { ROUTE_CONSTANTS } from './constants/route.constants';

const PrivateRoute = ({ element }) => {
  const token = sessionStorage.getItem("token");

  return token ? element : <Navigate to="/signin" />;
};


function App() {
  const dispatch = useDispatch();
  const { setUser } = authenSlice.actions;
  let token = useSelector((state) => state.authen.token);
  let user = null;
  if (token === null) {
    token = sessionStorage.getItem("token");
    if (token) {
      user = decryptToken(token);
      dispatch(setUser(user));
    }
  } else {
    user = JSON.parse(sessionStorage.getItem("user"));
    dispatch(setUser(user));
  }
  console.log("user: ", user);

  // const [isRefresh, setIsRefresh] = React.useState(false);

  const renderRoute = () => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.component
          }
          exact={route.exact}
        />
      );
    });
  };

  // console.log("render");

  // React.useEffect(() => {
  //   setIsRefresh(true);
  // }, [token]);


  return (
    <>
      <Router>
       <div>
       {user?.role_id == ROLE.ADMIN ? <TopNav /> : <Header />} 
         {user?.role_id == ROLE.ADMIN? <SideNav /> : <></>} 
          
         <Routes>{renderRoute()}</Routes>
          {user?.role_id != ROLE.ADMIN? <Footer /> : <></>} 
          <ScrollToTop /> 
      
       </div>
      </Router>
    </>
  );
}

export default App;
