import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from './common/ErrorBoundary';

// Lazy Imports
const Loader = lazy(() => import("./common/Loader.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"))
const TermsandCondition = lazy(() => import("./pages/TermsandCondition.jsx"))
const RefundPolicy = lazy(() => import("./pages/RefundPolicy.jsx"))
const Sitemap = lazy(() => import("./pages/Sitemap.jsx"))
const PaymentStatus = lazy(() => import("./pages/PaymentStatus.jsx"));
const Invalidsite = lazy(() => import("./common/Invalidsite.jsx"))

const AdminLayout = lazy(() => import('./admin/layouts/AdminLayout'));
const AdminDashboard = lazy(() => import('./admin/pages/AdminDashboard'));
const AdminSettings = lazy(() => import('./admin/pages/Settings'));
const AdminStudents = lazy(() => import('./admin/pages/Students'));
const AdminPayments = lazy(() => import('./admin/pages/Payments'));
const AdminPlans = lazy(() => import('./admin/pages/Plans'));
const AdminChannels = lazy(() => import('./admin/pages/Channels'));
const AdminCoupons = lazy(() => import('./admin/pages/Coupons'));
const AdminNotifications = lazy(() => import('./admin/pages/Notifications'));
const AdminSupportTickets = lazy(() => import('./admin/pages/SupportTickets'));

// Student Imports
const StudentLayout = lazy(() => import('./student/layouts/StudentLayout'));
const StudentRegister = lazy(() => import('./student/pages/StudentRegister'));
const StudentForgotPassword = lazy(() => import('./student/pages/StudentForgotPassword'));
const StudentResetPassword = lazy(() => import('./student/pages/StudentResetPassword'));
const StudentDashboard = lazy(() => import('./student/pages/Dashboard'));
const StudentInvoices = lazy(() => import('./student/pages/Invoices'));
const StudentNotifications = lazy(() => import('./student/pages/Notifications'));
const StudentSupport = lazy(() => import('./student/pages/Support'));
const StudentSettings = lazy(() => import('./student/pages/Settings'));

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <SocketProvider>
          <BrowserRouter>
            <Toaster position="top-right" />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/not-working" element={<LandingPage />} />
                <Route path="/" element={<Invalidsite />} />
                <Route path="/login" element={<Login />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-and-conditions" element={<TermsandCondition />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/payment/status" element={<PaymentStatus />} />

                {/* New Routes */}
                <Route path="/register" element={<StudentRegister />} />
                <Route path="/forgot-password" element={<StudentForgotPassword />} />
                <Route path="/reset-password" element={<StudentResetPassword />} />

                <Route path="/admin" element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="settings" element={<AdminSettings />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="payments" element={<AdminPayments />} />
                  <Route path="plans" element={<AdminPlans />} />
                  <Route path="channels" element={<AdminChannels />} />
                  <Route path="coupons" element={<AdminCoupons />} />
                  <Route path="notifications" element={<AdminNotifications />} />
                  <Route path="support" element={<AdminSupportTickets />} />
                  {/* Additional admin routes can be added here */}
                </Route>

                <Route path="/student" element={<StudentLayout />}>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="invoices" element={<StudentInvoices />} />
                  <Route path="notifications" element={<StudentNotifications />} />
                  <Route path="support" element={<StudentSupport />} />
                  <Route path="settings" element={<StudentSettings />} />
                  {/* Additional student routes can be added here */}
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SocketProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}