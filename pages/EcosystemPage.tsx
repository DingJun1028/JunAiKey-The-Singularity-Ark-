
import React from 'react';
import PageHeader from '../components/PageHeader';
import EcosystemIcon from '../components/icons/EcosystemIcon';
import BilingualLabel from '../components/BilingualLabel';
import Card from '../components/Card';

const EcosystemPage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="生態系統 (Ecosystem)"
                subtitle="探索與 JunAiKey 連接的夥伴與整合。(Explore partners and integrations connected to JunAiKey.)"
                icon={<EcosystemIcon className="w-8 h-8" />}
            />

            <Card className="p-6 text-center">
                <h2 className="text-xl font-semibold text-matrix-cyan mb-4">
                    <BilingualLabel label="Coming Soon" />
                </h2>
                <p className="text-matrix-dark">
                    <BilingualLabel label="生態系統地圖正在建構中。未來，您將在此處看到所有協作夥伴的網絡。(The ecosystem map is under construction. Soon, you will see a network of all collaborating partners here.)" />
                </p>
            </Card>
        </div>
    );
};

export default EcosystemPage;
