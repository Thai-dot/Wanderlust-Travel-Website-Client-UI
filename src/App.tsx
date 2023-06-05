import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage';
// import "swiper/css/bundle";
import NavBar from './components/Common/NavBar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import TourDetail from './pages/TourDetail';
import 'react-day-picker/dist/style.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FilterPage from './pages/FilterPage';
import { Fragment } from 'react';
import PrivateRoute from './components/Common/PrivateRoute';
import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import UserPage from './pages/UserPage';
import Footer from './components/Footer/Footer';

import LocationPage from './pages/LocationPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/index.scss';
import BookingInformation from './components/BookingInformation/BookingInformation';
import CustomerQuotation from './pages/CustomerQuotation';
import SuccessPaymentPage from './pages/SuccessPaymentPage';
import CustomerBookingList from './pages/CustomerBookingList';
import About from './pages/About';
import ProviderQuotation from './pages/ProviderQuotation';



const App = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 0,
                cacheTime: 0,
                refetchOnWindowFocus: false
            }
        }
    });
    return (
        <QueryClientProvider client={queryClient}>
            <Fragment>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/about" element={<About />} />

                    <Route path="/tour/:id" element={<TourDetail />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/filter" element={<FilterPage />} />

                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/user-setting" element={<UserPage />} />
                        <Route
                            path="/my-quotations/:id"
                            element={<CustomerQuotation />}
                        />
                        <Route
                            path="/tour/:id/booking-information"
                            element={<BookingInformation />}
                        />
                        <Route
                            path="/tour/:id/success-payment"
                            element={<SuccessPaymentPage />}
                        />
                        <Route
                            path="/customer/booking-list"
                            element={<CustomerBookingList />}
                        />
                        <Route
                            path="/provider-quotation/:id"
                            element={<ProviderQuotation />}
                        />
                    </Route>

                    <Route path="/location/:id" element={<LocationPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>

                <ToastContainer autoClose={1000} />
                <Footer />
            </Fragment>
        </QueryClientProvider>
    );
};

export default App;
