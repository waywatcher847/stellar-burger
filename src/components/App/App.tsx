import MainPage from "../../pages/Main/Main";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ProfileOrdersPage } from "../../pages/Profile/ProfileOrdersPage";
import { ProfilePage } from "../../pages/Profile/ProfilePage";
import { LoginPage } from "../../pages/Login/Login";
import { RegisterPage } from "../../pages/Register/Register";
import { NotFoundPage } from "../../pages/NotFound/NotFound";
import { ForgotPage } from "../../pages/Forgot/Forgot";
import { ResetPage } from "../../pages/Reset/ResetPage";
import { AppHeader } from "../AppHeader/AppHeader";
import { fetchIngredients } from "../../services/slices/IngredientsSlice";
import { useDispatch } from "../../services/store";
import { ProtectedRoute } from "../Route/ProtectedRoute";
import { Modal } from "../Modal/Modal";
import { useModal } from "../../hooks/useModal";
import { IngredientDetails } from "../IngredientDetails/IngredientDetails";
import { OrderFeedPage } from "../../pages/Feed/Feed";
import { OrderPage } from "../../pages/Order/Order";
import { OrderFeedDetails } from "../Feed/Details/Details";
import { REMOVE_INGREDIENT_INFO } from "../../services/slices/CurrentIngredientSlice";

export const App = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const background_order = location.state?.background_order;
  const order = location.state && location.state.order;
  const items = location.state && location.state.items;
  const price = location.state && location.state.price;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <Routes location={background || background_order || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path={"feed/:number"} element={<OrderPage />} />
        <Route
          path={"profile/orders/:number"}
          element={
            <ProtectedRoute checkLoggedIn>
              <OrderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute>
              <ForgotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <ProtectedRoute>
              <ResetPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute checkLoggedIn>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute checkLoggedIn>
              <ProfileOrdersPage />
            </ProtectedRoute>
          }
        />
        <Route path="/feed" element={<OrderFeedPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                open={true}
                title="Детали ингредиентов"
                onClose={() => {
                  closeModal();
                  dispatch(REMOVE_INGREDIENT_INFO());
                  navigate("/");
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}

      {background_order && (
        <Routes>
          <Route
            path={"profile/orders/:number"}
            element={
              <Modal
                open={background_order}
                onClose={() => {
                  navigate(-1);
                }}
                title={`#${order.number}`}
              >
                <OrderFeedDetails order={order} items={items} price={price} />
              </Modal>
            }
          />
          <Route
            path={"/feed/:number"}
            element={
              <Modal
                open={background_order}
                onClose={() => {
                  navigate(-1);
                }}
                title={`#${order.number}`}
              >
                <OrderFeedDetails order={order} items={items} price={price} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
