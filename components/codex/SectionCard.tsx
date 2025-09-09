
import React from 'react';
import Card from '../Card';
import BilingualLabel from '../BilingualLabel';

const SectionCard: React.FC<{ title: string; children: React.ReactNode; id?: string }> = ({ title, children, id }) => (
    <Card className="p-6 bg-matrix-bg/50" id={id}>
        <h2 className="text-2xl font-bold text-matrix-cyan mb-4 border-b-2 border-matrix-dark/20 pb-2">
            <BilingualLabel label={title} />
        </h2>
        <div className="space-y-4 text-sm sm:text-base prose-styles text-matrix-light">
            {children}
        </div>
    </Card>
);

export default SectionCard;
