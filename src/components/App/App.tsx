import MainPage from "../../pages/Main/Main";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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
import { REMOVE_INGREDIENT_INFO } from "../../services/slices/CurrentIngredientSlice";

export const App = () => {
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div>
      <AppHeader />
      <Routes location={background || location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/*" element={<NotFoundPage />} />
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
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/ingredients/:id" element={<IngredientDetails />} />
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
    </div>
  );
};

export default App;
