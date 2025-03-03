export const protectedRoutes = [
  {
    name: 'events',
    path: '/events',
    permissions: {
      read: 'events.read',
      create: 'events.create',
      update: 'events.update',
      delete: 'events.delete'
    }
  }
]
