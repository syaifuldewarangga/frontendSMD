import DashboardIcon from '@mui/icons-material/Dashboard';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const appMenuItems = [
    {
      name: 'Dashboard',
      link: '/dashboard',
      Icon: DashboardIcon
    },
    {
      name: 'Master Data',
      Icon: CollectionsBookmarkIcon, 
      items: [
        {
          name: 'User',
          link: '/master-data/users',
        },
        {
          name: 'Departement',
          link: '/master-data/departement',
        },
        {
          name: 'Position',
          link: '/master-data/position',
        },
        {
          name: 'Bank',
          link: '/master-data/bank',
        },
        {
          name: 'Shift',
          link: '/master-data/shift',
        }
      ]
    },
    {
        name: 'Activity',
        Icon: ReceiptLongIcon,
        items: [ 
            {
                name: 'Attendance',
                link: '/activity/attendance'
            }, 
            // {
            //     name: 'Overtime',
            //     link: 'activity/overtime'
            // },
            // {
            //     name: 'Leave',
            //     link: 'activity/Time Off'
            // }
        ]
    }
  ]

  export { appMenuItems }