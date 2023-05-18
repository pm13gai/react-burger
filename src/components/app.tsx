import { useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HomePage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, ProfilePage } from '../pages';
import { OnlyAuth, OnlyUnAuth } from "./protected-route";
import AppHeader from './header/app-header'
import {
  REMOVE_INGREDIENT_FOR_MODAL
} from '../services/actions/ingredient-details';
import Modal from './modals/modal';
import IngredientDetails from './modals/ingredient-details';
import { NotFound } from './not-found';
import { getIngredients } from '../services/actions/menu';
import { useAppDispatch } from '../hooks/hooks';
import { FeedPage } from '../pages/feed';
import OrderInfoCard from './feed/order-info-card';
import ProfileOrders from './profile/profile-orders';
import { ProfileUser } from './profile/profile-user';

export default function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const handleCloseModal = () => {
    dispatch({ type: REMOVE_INGREDIENT_FOR_MODAL })
    navigate(-1);
  };

  return (
    <div className="flex flex-column h100pcnt overflow-h">

      <AppHeader />

      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<OrderInfoCard />} />

        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />

        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />}>
          <Route index element={<ProfileUser />} />
          <Route path="orders" element={<ProfileOrders />} />
        </Route>
        <Route path="/profile/orders/:id" element={<OnlyAuth component={<OrderInfoCard />} />} />


        <Route path="*" element={<NotFound />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal header='Детали ингредиента' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfoCard />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal onClose={handleCloseModal}>
                <OrderInfoCard />
              </Modal>
            }
          />
        </Routes>
      )}



    </div>
  );
}


