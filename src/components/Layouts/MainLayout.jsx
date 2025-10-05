import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../UI/Navbar';
import Footer from '../UI/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;