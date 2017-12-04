import lazyLoading from './lazyLoading.js'

export default {
  name: 'responses',
  meta: {
    title: 'Ответы жителей',
    iconClass: 'vuestic-icon vuestic-icon-tables'
  },
  path: '/responses',
  component: lazyLoading('responses/Index')
}
