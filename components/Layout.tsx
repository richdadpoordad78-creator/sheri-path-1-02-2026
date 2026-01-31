
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden relative">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
