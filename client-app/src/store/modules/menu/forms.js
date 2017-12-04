import lazyLoading from './lazyLoading'

export default {
  name: 'Добавить событие',
  meta: {
    title: 'Добавить событие',
    iconClass: 'vuestic-icon vuestic-icon-forms'
  },
  path: '/events',
  component: lazyLoading('events/create/CreateEvent')
  // children: [
  //   {
  //     name: 'FormElements',
  //     path: '/forms/form-elements',
  //     component: lazyLoading('forms/form-elements/FormElements'),
  //     meta: {
  //       title: 'Form Elements'
  //     }
  //   },
  //   {
  //     name: 'Form Wizards',
  //     path: '/forms/form-wizard',
  //     component: lazyLoading('forms/form-wizard/FormWizard'),
  //     meta: {
  //       title: 'Form Wizards'
  //     }
  //   }
  // ]
}

