import lazyLoading from './lazyLoading'

export default {
  name: 'Dashboard',
  path: '/dashboard',
  component: lazyLoading('dashboard/Dashboard'),
  meta: {
    default: false,
    title: 'Dashboard',
    iconClass: 'vuestic-icon vuestic-icon-dashboard'
  }
}
