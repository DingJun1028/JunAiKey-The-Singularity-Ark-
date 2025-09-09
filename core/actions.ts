import type { FavoriteItem } from '../types';
import { sidebarNavItems } from './navigation';

// Flatten the navigation items into a single list of actions that can be favorited.
export const allAvailableActions: FavoriteItem[] = Object.values(sidebarNavItems)
  .flat()
  .map(item => ({
    id: item.path,
    label: item.label,
    path: item.path,
    icon: item.icon,
  }));
