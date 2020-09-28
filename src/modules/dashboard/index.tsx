import React from 'react';

export const dashBoardConfigs = [
  {
    auth: ['user'],
    routes: [
      {
        path: '/dashboards/analytics',
        component: React.lazy(() => import('./Analytics')),
      },
    ],
  },
  {
    auth: ['user'],
    routes: [
      {
        path: '/dashboards/booking',
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
        path: '/dashboards/booking-config',
        component: React.lazy(() => import('./BookingConfig')),
      },
    ],
  },
];
