<<<<<<< HEAD

=======
>>>>>>> feature-branch
// This file defines the core data structure for the new two-tiered navigation system.
import type { Realm, NavItem, RealmId } from '../types';

// Import all icons
<<<<<<< HEAD
import AitableIcon from '../components/icons/AitableIcon';
import ArchitectureIcon from '../components/icons/ArchitectureIcon';
import CardStackIcon from '../components/icons/CardStackIcon';
import CodexIcon from '../components/icons/CodexIcon';
import ConsoleIcon from '../components/icons/ConsoleIcon';
import ContributionIcon from '../components/icons/ContributionIcon';
import DashboardIcon from '../components/icons/DashboardIcon';
import DeckIcon from '../components/icons/DeckIcon';
import EcosystemIcon from '../components/icons/EcosystemIcon';
import EvolveIcon from '../components/icons/EvolveIcon';
import LayoutIcon from '../components/icons/LayoutIcon';
import NexusIcon from '../components/icons/NexusIcon';
import NotesIcon from '../components/icons/NotesIcon';
import SanctumIcon from '../components/icons/SanctumIcon';
import ShuttleIcon from '../components/icons/ShuttleIcon';
import TemplateIcon from '../components/icons/TemplateIcon';
import ThemeIcon from '../components/icons/ThemeIcon';

export const realms: Realm[] = [
    { id: 'core', name: '核心矩陣 (Core Matrix)', primaryPath: '/', icon: DashboardIcon },
    { id: 'knowledge', name: '知識聖殿 (Knowledge Sanctum)', primaryPath: '/notes', icon: NotesIcon },
    { id: 'genesis', name: '創生螺旋 (Genesis Spiral)', primaryPath: '/evolution', icon: EvolveIcon },
    { id: 'summoner', name: '召喚使中樞 (Summoner\'s Nexus)', primaryPath: '/nexus', icon: NexusIcon },
    { id: 'partner', name: '永續夥伴 (Sustainable Partners)', primaryPath: '/partners/ecosystem', icon: EcosystemIcon },
=======
import DashboardIcon from '../components/icons/DashboardIcon';
import NotesIcon from '../components/icons/NotesIcon';
import SanctumIcon from '../components/icons/SanctumIcon';
import EvolveIcon from '../components/icons/EvolveIcon';
import ConsoleIcon from '../components/icons/ConsoleIcon';
import NexusIcon from '../components/icons/NexusIcon';
import ShuttleIcon from '../components/icons/ShuttleIcon';
import CodexIcon from '../components/icons/CodexIcon';
import LayoutIcon from '../components/icons/LayoutIcon';
import AitableIcon from '../components/icons/AitableIcon';
import ThemeIcon from '../components/icons/ThemeIcon';
import EcosystemIcon from '../components/icons/EcosystemIcon';
import ContributionIcon from '../components/icons/ContributionIcon';

export const realms: Realm[] = [
    { id: 'core', name: '核心矩陣 (Core Matrix)', primaryPath: '/' },
    { id: 'knowledge', name: '知識聖殿 (Knowledge Sanctum)', primaryPath: '/notes' },
    { id: 'genesis', name: '創生螺旋 (Genesis Spiral)', primaryPath: '/evolution' },
    { id: 'summoner', name: '召喚使中樞 (Summoner\'s Nexus)', primaryPath: '/nexus' },
    { id: 'partner', name: '永續夥伴 (Sustainable Partners)', primaryPath: '/partners/ecosystem' },
>>>>>>> feature-branch
];

export const sidebarNavItems: Record<RealmId, NavItem[]> = {
    core: [
        { path: '/', label: '儀表板 (Dashboard)', icon: DashboardIcon },
        { path: '/aitable', label: '萬能智卡 (Aitable)', icon: AitableIcon },
        { path: '/shuttle', label: '通用同步中樞 (Universal Sync Hub)', icon: ShuttleIcon },
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
<<<<<<< HEAD
        { path: '/cards', label: '萬能聖典 (Omni Codex)', icon: CardStackIcon },
        { path: '/deck-builder', label: '聖典構築器 (Deck Builder)', icon: DeckIcon },
        { path: '/card-templates', label: '卡牌模板 (Card Templates)', icon: TemplateIcon },
=======
>>>>>>> feature-branch
        { path: '/layout', label: '介面佈局 (UI Layout)', icon: LayoutIcon },
        { path: '/theme', label: '主題自訂 (Theme Customization)', icon: ThemeIcon },
    ],
    partner: [
        { path: '/partners/ecosystem', label: '生態系統 (Ecosystem)', icon: EcosystemIcon },
        { path: '/partners/contribution', label: '貢獻儀表板 (Contribution Dashboard)', icon: ContributionIcon },
    ]
<<<<<<< HEAD
};
=======
};
>>>>>>> feature-branch
