/**
 * Created by yarik on 18.7.17.
 */
import lazyLoading from './lazyLoading'

export default {
  name: 'auth',
  hidden: true,
  meta: {
    default: true,
    expanded: false,
    title: 'Auth',
    iconClass: 'vuestic-icon vuestic-icon-auth'
  },
  path: '/auth/login',
  component: lazyLoading('auth/login/Login')
}
