// This file defines the core data structure for the new two-tiered navigation system.
import type { Realm, NavItem, RealmId } from '../types';

// Import all icons
import DashboardIcon from '../components/icons/DashboardIcon';
import NotesIcon from '../components/icons/NotesIcon';
import SanctumIcon from '../components/icons/SanctumIcon';
import EvolveIcon from '../components/icons/EvolveIcon';
import ConsoleIcon from '../components/icons/ConsoleIcon';
import NexusIcon from '../components/icons/NexusIcon';
import ShuttleIcon from '../components/icons/ShuttleIcon';
import CodexIcon from '../components/icons/CodexIcon';

export const realms: Realm[] = [
    { id: 'core', name: '核心矩陣 (Core Matrix)', primaryPath: '/' },
    { id: 'knowledge', name: '知識聖殿 (Knowledge Sanctum)', primaryPath: '/notes' },
    { id: 'genesis', name: '創生螺旋 (Genesis Spiral)', primaryPath: '/evolution' },
    { id: 'summoner', name: '召喚使中樞 (Summoner\'s Nexus)', primaryPath: '/nexus' },
];

export const sidebarNavItems: Record<RealmId, NavItem[]> = {
    core: [
        { path: '/', label: '儀表板 (Dashboard)', icon: DashboardIcon },
        { path: '/shuttle', label: '數據穿梭機 (Data Shuttle)', icon: ShuttleIcon },
    ],
    knowledge: [
        { path: '/notes', label: '萬能筆記 (Omni-Notes)', icon: NotesIcon },
        { path: '/sanctum', label: '智慧聖殿 (Wisdom Sanctum)', icon: SanctumIcon },
    ],
    genesis: [
        { path: '/evolution', label: '神諭創生 (Agent Evolution)', icon: EvolveIcon },
        { path: '/console', label: '矩陣控制台 (Matrix Console)', icon: ConsoleIcon },
        { path: '/codex', label: '自主通典室 (Codex Chamber)', icon: CodexIcon },
    ],
    summoner: [
        { path: '/nexus', label: '召喚使中樞 (Summoner\'s Nexus)', icon: NexusIcon },
    ]
};
