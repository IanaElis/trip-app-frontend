import { BrowserRouter, Routes, Route } from "react-router-dom";
import TripPage from "../pages/TripPage";
import ItineraryPage from "../pages/ItineraryPage";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import FullItemPage from "../pages/FullItemPage"
import ProfilePage from "../pages/auth/ProfilePage/ProfilePage";
import NotificationsPage from "../pages/NotificationsPage"
import UsersPage from "../pages/admin/UsersPage"
import AppLayout from "./AppLayout";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage"
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage"
import ReportPage from "../pages/ReportPage";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<TripPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/reset-password" element={
                            <ResetPasswordPage />
                    }/>
                    <Route path="/forgot-password" element={
                            <ForgotPasswordPage />
                    }/>

                <Route element={<AppLayout />}>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    } />
                     <Route path="trips/:tripId/report" element={
                        <ProtectedRoute>
                            <ReportPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/notifications" element={
                        <ProtectedRoute>
                            <NotificationsPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/trips" element={
                        <ProtectedRoute>
                            <TripPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/trips/:tripId" element={
                        <ProtectedRoute>
                            <ItineraryPage />
                        </ProtectedRoute>
                    } />
                    <Route path="/trips/:tripId/items/:itemType/:itemId" element={
                        <ProtectedRoute>
                            <FullItemPage />
                        </ProtectedRoute>
                    } />


                    {/* Admin */}
                    <Route path="/users" element={
                        <ProtectedRoute>
                            <UsersPage />
                        </ProtectedRoute>
                    } />

                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;