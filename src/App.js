import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./App.css";
import {dataDigitalizationCard, dataHomeCard} from "./data/cardsdata";
//Reusables
import Drawer from "./reusable/drawer/Drawer";
import MenuCard from "./reusable/card/MenuCard";
import Dashboard from "./reusable/dashboard/Dashboard";
//Pages
import Labels from "./components/labels/Labels";
import Batches from "./components/batches/Batches";
import Documents from "./components/documents/Documents";
import GestionDeUsuarios from "./components/gestionDeUsuarios/GestionDeUsuarios";
import Landing from "./components/landing/Landing";
import {useDispatch, useSelector} from "react-redux";
import AppLayout from "./AppLayout";
import {useEffect} from "react";
//States
import {getUser} from "./states/authState";
import axiosBase from "./utils/axiosBase";

//Data
function App() {
  const {isLoggedIn, isError, isLoading} = useSelector((state) => state.auth);
  const {exp} = useSelector((state) => state.auth.activeUser.accessDecoded);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser({}));
  }, [isError, isLoading]);
  // console.log("isTokenExpired(exp)", isTokenExpired(exp));

  // useEffect(() => {
  //   if (isTokenExpired(exp)) {
  //     dispatch(loggingOut());
  //     dispatch(
  //       openAlertDialog({
  //         content: sessionExpiredString,
  //         icon: "timeLapsed",
  //         actionCancelButton: () => {},
  //       })
  //     );
  //   }
  // }, []);

  return (
    <div className="fondo">
      <div className="translucid">
        <BrowserRouter>
          <Drawer open={true} showMenu={true} />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              {!isLoggedIn ? (
                <>
                  <Route path="/landing" element={<Landing />}>
                    {" "}
                  </Route>
                  <Route path="/*" element={<Navigate to="/landing" />} />
                </>
              ) : (
                <>
                  <Route
                    path="/home"
                    element={<Dashboard cardsDataArray={dataHomeCard} />}
                  />
                  <Route
                    path="/digitalization"
                    element={
                      <Dashboard cardsDataArray={dataDigitalizationCard} />
                    }
                  />
                  <Route path="/digitalization/labels" element={<Labels />} />
                  <Route path="/digitalization/batches" element={<Batches />} />
                  <Route
                    path="/digitalization/batches/:id"
                    element={<Batches />}
                  />
                  <Route
                    path="/gestionDeUsuarios"
                    element={<GestionDeUsuarios />}
                  />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/documents/:id" element={<Documents />} />
                  <Route path="/login" element={<MenuCard />} />
                  <Route path="/*" element={<Navigate to="/home" />} />
                </>
              )}
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
