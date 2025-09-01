
import React from 'react';
import BearerOfTheKeyChapter from '../components/codex/BearerOfTheKeyChapter';
import GenesisSdkChapter from '../components/codex/GenesisSdkChapter';
import OmniCardCatalogChapter from '../components/codex/OmniCardCatalogChapter';

import SanctumIcon from '../components/icons/SanctumIcon';
import ArchitectureIcon from '../components/icons/ArchitectureIcon';
import CardStackIcon from '../components/icons/CardStackIcon';

export interface CodexChapter {
    id: string;
    title: string;
    subtitle: string;
    icon: React.FC<{className?: string}>;
    component: React.FC;
}

export const codexChapters: CodexChapter[] = [
    {
        id: 'bearer-of-the-key',
        title: '聖鑰持有者',
        subtitle: 'The Bearer of the Sacred Key',
        icon: SanctumIcon,
        component: BearerOfTheKeyChapter,
    },
    {
        id: 'omni-card-catalog',
        title: '萬能卡牌目錄集',
        subtitle: 'The Omni-Card Catalog',
        icon: CardStackIcon,
        component: OmniCardCatalogChapter,
    },
    {
        id: 'genesis-engine-sdk',
        title: '創世引擎SDK',
        subtitle: 'Genesis Engine SDK',
        icon: ArchitectureIcon,
        component: GenesisSdkChapter,
    }
];
