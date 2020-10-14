import React from 'react';

export const dashBoardConfigs = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/booking-list',
        component: React.lazy(() => import('./Analytics')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/booking',
        component: React.lazy(() => import('./Booking')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/personal',
        component: React.lazy(() => import('./Personal')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/booking-config',
        component: React.lazy(() => import('./BookingConfig')),
      },
    ],
  },
];
