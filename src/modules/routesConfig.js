const routesConfig = [
  {
    id: 'app',
    title: 'Application',
    messageId: 'sidebar.application',
    type: 'group',
    children: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        messageId: 'sidebar.app.dashboard',
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'booking-list',
            title: 'booking list',
            messageId: 'sidebar.app.booking.list',
            type: 'item',
            url: '/booking-list',
          },
          {
            id: 'booking',
            title: 'booking status',
            messageId: 'sidebar.app.booking.status',
            type: 'item',
            url: '/booking',
          },
          {
            id: 'booking-config',
            title: 'booking config',
            messageId: 'sidebar.app.booking.config',
            type: 'item',
            url: '/booking-config',
          },
        ],
      },
      {
        id: 'account-menu',
        title: 'Dashboards',
        messageId: 'sidebar.app.account',
        type: 'collapse',
        icon: 'dashboard',
        children: [
          {
            id: 'personal',
            title: 'config',
            messageId: 'sidebar.app.account.config',
            type: 'item',
            url: '/personal',
          },
          {
            id: 'analytics',
            title: 'logout',
            messageId: 'sidebar.app.account.logout',
            type: 'item',
            url: '/signout',
          }
        ],
      }
    ],
  }
];
export default routesConfig;

// const routesConfig = [
//   {
//     id: 'booking',
//     title: '待受管理',
//     messageId: 'sidebar.booking',
//     type: 'group',
//     children: [
//       {
//         id: 'booking',
//         title: '待受状況',
//         messageId: 'sidebar.app.booking',
//         icon: 'dashboard',
//         type: 'item',
//         url: '/dashboards/analytics',
//       },
//       {
//         id: 'mail',
//         title: '待受リスト',
//         messageId: 'sidebar.app.booking',
//         icon: 'dashboard',
//         type: 'item',
//         url: '/dashboards/analytics',
//       },
//     ],
//   },
//   {
//     id: 'settings',
//     title: '設定',
//     messageId: 'sidebar.pages',
//     type: 'group',
//     children: [
//       {
//         id: 'settings-',
//         title: 'Error Pages',
//         messageId: 'sidebar.pages.errorPages',
//         type: 'collapse',
//         icon: 'report',
//         children: [
//           {
//             id: 'error-404',
//             title: '404',
//             messageId: 'sidebar.pages.errorPages.404',
//             type: 'item',
//             url: '/error-pages/error-404',
//           },
//           {
//             id: 'error-500',
//             title: '500',
//             messageId: 'sidebar.pages.errorPages.500',
//             type: 'item',
//             url: '/error-pages/error-500',
//           },
//           {
//             id: 'maintenance',
//             title: 'Maintenance',
//             messageId: 'sidebar.pages.errorPages.maintenance',
//             type: 'item',
//             url: '/error-pages/maintenance',
//           },
//           {
//             id: 'coming-soon',
//             title: 'Coming Soon',
//             messageId: 'sidebar.pages.errorPages.comingSoon',
//             type: 'item',
//             url: '/error-pages/coming-soon',
//           },
//         ],
//       },
//     ],
//   },
// ];
// export default routesConfig;
