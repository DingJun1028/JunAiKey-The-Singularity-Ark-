
import React from 'react';
import PageHeader from '../components/PageHeader';
import ContributionIcon from '../components/icons/ContributionIcon';
import BilingualLabel from '../components/BilingualLabel';
import Card from '../components/Card';

const ContributionPage: React.FC = () => {
    return (
        <div className="animate-fade-in space-y-8">
            <PageHeader
                title="貢獻儀表板 (Contribution Dashboard)"
                subtitle="追蹤您對社群的貢獻與獲得的榮譽。(Track your contributions and honors within the community.)"
                icon={<ContributionIcon className="w-8 h-8" />}
            />

            <Card className="p-6 text-center">
                 <h2 className="text-xl font-semibold text-matrix-cyan mb-4">
                    <BilingualLabel label="Coming Soon" />
                </h2>
                <p className="text-matrix-dark">
                   <BilingualLabel label="貢獻追蹤系統正在開發中。未來，您將能在此看到您的社群影響力。(The contribution tracking system is in development. In the future, you will be able to see your community impact here.)" />
                </p>
            </Card>
        </div>
    );
};

export default ContributionPage;
