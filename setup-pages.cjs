const fs = require('fs');
const path = require('path');

const pages = [
  'pages/Public/Home.jsx',
  'pages/Public/BooksCatalog.jsx',
  'pages/Public/BookDetails.jsx',
  'pages/Public/Categories.jsx',
  'pages/Public/About.jsx',
  'pages/Public/Contact.jsx',
  'pages/Public/FAQ.jsx',
  'pages/Public/DonorLeaderboard.jsx',
  'pages/Auth/Login.jsx',
  'pages/Auth/Register.jsx',
  'pages/Auth/ForgotPassword.jsx',
  'pages/User/UserDashboard.jsx',
  'pages/User/MyBorrowedBooks.jsx',
  'pages/User/BorrowHistory.jsx',
  'pages/User/Wishlist.jsx',
  'pages/User/Notifications.jsx',
  'pages/User/Profile.jsx',
  'pages/User/Settings.jsx',
  'pages/User/DonateBook.jsx',
  'pages/User/MyDonations.jsx',
  'pages/Admin/AdminDashboard.jsx',
  'pages/Admin/ManageBooks.jsx',
  'pages/Admin/AddBook.jsx',
  'pages/Admin/EditBook.jsx',
  'pages/Admin/ManageUsers.jsx',
  'pages/Admin/BorrowManagement.jsx',
  'pages/Admin/DonationManagement.jsx',
  'pages/Admin/ReportsAnalytics.jsx',
  'pages/Admin/AdminSettings.jsx',
  'pages/NotFound.jsx',
  'layouts/RootLayout.jsx',
  'layouts/DashboardLayout.jsx',
  'layouts/AdminLayout.jsx',
  'components/shared/Navbar.jsx',
  'components/shared/Footer.jsx'
];

pages.forEach(file => {
  const fullPath = path.join(__dirname, 'src', file);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const name = path.basename(file, '.jsx');
  const content = `import React from 'react';

/* =============================================
   ${name}
   ============================================= */

const ${name} = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">${name} Component</h1>
    </div>
  );
};

export default ${name};
`;

  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
  }
});

console.log('Setup complete!');
