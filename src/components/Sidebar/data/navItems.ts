export type NavItemStatus = 'active' | 'disabled' | 'coming-soon';

export interface NavLink {
  href: string;
  label: string;
  icon: string;
  status?: NavItemStatus;
}

export interface NavSection {
  label: string;
  links: NavLink[];
}

export const navItems: NavSection[] = [
  {
    label: 'Main',
    links: [
      { href: '/dashboard', label: 'Dashboard', icon: 'hugeicons:dashboard-square-02' },
      { href: '/quests', label: 'Quests', icon: 'hugeicons:task-01' },
      {
        href: '/achievements',
        label: 'Achievements',
        icon: 'hugeicons:champion',
        status: 'disabled',
      },
      {
        href: '/workouts',
        label: 'Workouts',
        icon: 'hugeicons:dumbbell-01',
      },
      { href: '/nutrition', label: 'Nutrition', icon: 'hugeicons:apple' },
      {
        href: '/progress',
        label: 'Progress',
        icon: 'hugeicons:chart-increase',
        status: 'disabled',
      },
      { href: '/shop', label: 'Shop', icon: 'hugeicons:shopping-bag-01' },
      { href: '/leaderboard', label: 'Leaderboard', icon: 'hugeicons:ranking', status: 'disabled' },
    ],
  },
];
