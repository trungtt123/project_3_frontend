import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { connect } from "react-redux";
import { HashRouter, Route, Link, NavLink, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from './screen/Home';
import Login from './screen/Login'
import Add from './screen/Add';
import Edit from './screen/Edit';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useCookies } from 'react-cookie';
import Signup from './screen/Signup';
import Post from './screen/Post';
import axios from 'axios';
import Infomation from './screen/Infomation';
import FooterTab from './components/FooterTab';
import BACKEND_URL from './const/url';
function App(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [userData, setUserData, removeUserData] = useCookies(['userData']);

  useEffect(() => {
    switch (props?.statusModal?.style) {
      case 'info':
        NotificationManager.info(props?.statusModal?.title, props?.statusModal?.description, 2000);
        break;
      case 'success':
        NotificationManager.success(props?.statusModal?.title, props?.statusModal?.description, 2000);
        break;
      case 'warning':
        NotificationManager.waring(props?.statusModal?.title, props?.statusModal?.description, 2000);
        break;
      case 'error':
        NotificationManager.error(props?.statusModal?.title, props?.statusModal?.description, 2000);
        break;
    }
  }, [props?.statusModal]);
  //setToken from cookie
  useEffect(() => {
    const initData = async () => {
      var response = await axios({
        method: 'get',
        url: `${BACKEND_URL}/api/group/getlistgroups`,
      });
      var listGroups = response?.data?.result;
      console.log(listGroups);
      await props.setListGroupsData(listGroups);
      await props.setUserData(user?.token, user?.userName, user?.fullName, user?.group);

    }
    var user = userData?.userData;
    if (user !== null && user !== undefined) {
      initData();
    }
  }, [userData]);
  console.log(props);
  return (
    <>
      <NotificationContainer />
      <HashRouter>
        <Routes>
          {(props?.userData?.token === null || props?.userData?.token === undefined) ?
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="*" element={<Login />} />
            </> :
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              {/* <Route path="/group/:id" element={<Group />} /> */}
              <Route path="group/:id/post/:id" element={<Post />} />
              <Route path="/add-post" element={<Add />} />
              <Route path="/group/:id/edit/:id" element={<Edit />} />
              <Route path="/infomation" element={<Infomation />} />
              <Route path="*" element={<Navigate to="/home" />} />
              {/* <Route path="/login" element={<Login />} /> */}
            </>
            /* } */
          }
        </Routes>
        {(props?.userData?.token === null || props?.userData?.token === undefined) ? <></> :
          <>
            <div style={{ height: 100 }}>

            </div>
            <div className="fixed-bottom">
              <FooterTab />
            </div>
          </>}
      </HashRouter>


    </>


  );
}
const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUserData: (token, userName, fullName, group) => dispatch({ type: "userData", userName: userName, fullName: fullName, token: token, group: group }),
    setListGroupsData: (listGroups) => dispatch({ type: "listGroups", listGroups: listGroups })
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
