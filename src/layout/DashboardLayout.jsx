import React, { useState } from 'react';
import Sidebar from '../components/dashboard/components/Sidebar';
import Header from '../components/dashboard/components/Header';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen  bg-gray-100 bg-opacity-60">

      {/* Header Section */}
      <Header onToggle={toggleSidebar} />

      {/* Main Content with Sidebar and Outlet */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isCollapsed={isCollapsed} onToggle={toggleSidebar} />
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
