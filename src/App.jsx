import React, { useEffect, useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Signup from './pages/Signup';
import Term from './pages/Term';
import Privacy from './pages/Privacy';
import About from './pages/About';
import Contact from './pages/Contact';
import AppContext from './context/AppContext';
import DashboardComponent from './DashboardPages/Dashboard';
import Users from './DashboardPages/Users';
import Settings from './DashboardPages/Settings';
import OrderList from './DashboardPages/OrderList';
import Inbox from './DashboardPages/Inbox';
import Team from './DashboardPages/Team';
import ManageCategories from './DashboardPages/Categories';
import ProtectedManageSubCategories from './DashboardPages/SubCategory';
// import ProtectedManageSubCategories from './DashboardPages/SubCategory';
import SubCategoryItems from './DashboardPages/SubItems';
import AddProduct from './DashboardPages/NewItem';
import EditProduct from './DashboardPages/EditProduct';
import OrderPreview from './DashboardPages/ViewOrder';
import NewAdmin from './DashboardPages/NewAdmin';
import BlogPage from './DashboardPages/BlogPage';
import Logout from './DashboardPages/Logout';
import Dashboard from './pages/Dashboard';
import ProtectedCollections from './DashboardPages/Collections';
import { message } from 'antd';
// import Login from './pages/Login';
import Signin from './pages/Signin';
import Deposits from './DashboardPages/Deposits';
import Withdrawal from './DashboardPages/Withdrawal';
import MyAccount from './DashboardPages/MyAccounts';
import UpgradeAccount from './DashboardPages/UpgradeAccount';
import AdminDashboard from './DashboardPages/AdminDash';
import Investments from './DashboardPages/TradeHistory';


function App() {

  const accInfo =
  {
    userName: "---",
    role: "",
  }

  const defaultValues = {
    data: accInfo,
    logged: false,
    token: "rr",
  }

  let conceptValues = defaultValues;
  try {
    let e = JSON.parse(
      sessionStorage.getItem('appConcept')
    );
    console.log("got e ", e);
    if (e && e.data && e.token)
      conceptValues = e;
  } catch (e) {
    console.log(e);
  }

  const [appConcept, updateApp] = useState(conceptValues);
  useEffect(
    () => {
      try {
        let e = JSON.parse(
          sessionStorage.getItem('appConcept')
        );
        if (!e.data || !e.token)
          updateApp(e);
      } catch (e) {
        console.log(e);
      }
    }, []
  )
  const setLogin = (data, token) => {
    updateApp({ ...appConcept, data: { ...appConcept.data, ...data }, token: token, logged: true });
  }
  const setBalance = (balance) => {
    updateApp({ ...appConcept, data: { ...appConcept.data, wallet_balance:balance },});
  }

  const expiredSession = x => {
    sessionStorage.removeItem('appConcept');
    x == 1 ? message.error("Expired session") : message.error("Unauthorized");
    location.replace('/signup');
    if (x == 1)
      throw new Error("expired session")
    throw new Error("expired session");
  }

  useEffect(
    () => {
      sessionStorage.setItem("appConcept", JSON.stringify(appConcept));
    }, [appConcept]
  )

  async function myReq(url, data, post = true) {
    // console.log("using " + appConcept.token);
    const requestResponse = await fetch(url, {
      method: post ? "POST" : 'GET',
      cache: 'no-cache',
      headers: {
        'Authorization': `${appConcept.token}`,
        // 'Authorization': `Bearer ${appConcept.token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: post ? JSON.stringify(data) : null
    }, 10000).then(
      async x => {
        if (x.status == 403)
          return expiredSession(1);

        if (x.status == 403)
          return expiredSession(1);

        const result = await x.json();

        return result;
      }
    ).catch(
      err => {
        console.log("req err ", err);
        return ({ status: false, message: err || "Request error" });
      }
    );
    return requestResponse
  }
  const functions = {
    setLogin,
    myReq,
    setBalance
  }

  return (
    <>
      <AppContext.Provider value={{ ...appConcept, ...functions, }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='signup' element={<Signup />} />
            <Route path='signin' element={<Signin />} />
            <Route path='term' element={<Term />} />
            <Route path='privacy-policy' element={<Privacy />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<DashboardComponent />} />
              <Route path="home" element={<DashboardComponent />} />
              <Route path="deposits" element={<Deposits />} />
              <Route path="trade-history" element={<Investments />} />
              <Route path="withdrawals" element={<Withdrawal />} />
              <Route path="my-account" element={<MyAccount />} />
              <Route path="upgrade-account" element={<UpgradeAccount />} />
              <Route path="admin-section" element={<AdminDashboard />} />
              <Route path="subcat" element={<ProtectedManageSubCategories />} />
              <Route path="subcat-items" element={<SubCategoryItems />} />
              <Route path="collections" element={<ProtectedCollections />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="edit-product" element={<EditProduct />} />
              <Route path="order-list" element={<OrderList />} />
              <Route path="view-order" element={<OrderPreview />} />
              <Route path="new-admin" element={<NewAdmin />} />
              <Route path="inbox" element={<Inbox />} />
              <Route path="team" element={<Team />} />
              <Route path="settings" element={<Settings />} />
              <Route path="logout" element={<Logout />} />
              <Route path="blog" element={<BlogPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  )
}

export default App
