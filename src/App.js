import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "~/routes";
import DefaultLayout from "~/components/Layout/DefaultLayout";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import StaffDetails from "./components/details/StaffDetails";
import DepartDetails from "./components/details/DepartDetails";

function App() {
  const staffList = useSelector((state) => state.staff.list);
  const departList = useSelector((state) => state.depart.list);

  // Routes StaffDetails
  const staffRoutes = [];

  staffList.map((staff) => {
    const id = staff.id;
    var b = { path: `staffs/${id}`, component: StaffDetails, id: id };
    staffRoutes.push(b);
  });

  // Routes DepartDetails
  const departRoutes = [];
  for (var i = 0; i < departList.length; i++) {
    var c = { path: `departments/${i}`, component: DepartDetails, id: i };
    departRoutes.push(c);
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes page */}
          {publicRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <DefaultLayout>
                    <Page />
                  </DefaultLayout>
                }
              />
            );
          })}

          {/* Routes staff */}
          {staffRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            const id = route.id;
            return (
              <Fragment key={index}>
                {staffList.map((staff) => {
                  return (
                    <Route
                      key={staff.id}
                      path={route.path}
                      element={
                        <Layout>
                          <Page id={id} />
                        </Layout>
                      }
                    />
                  );
                })}
              </Fragment>
            );
          })}
          
          {/* Routes depart */}
          {departRoutes.map((route, index) => {
            const Layout = route.layout || DefaultLayout;
            const Page = route.component;
            const id = route.id;
            return (
              <Fragment key={index}>
                {departList.map((depart) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={
                        <Layout>
                          <Page id={id} />
                        </Layout>
                      }
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
