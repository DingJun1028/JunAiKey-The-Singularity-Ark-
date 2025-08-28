
import type { MockFile } from './types';

export const APP_TITLE = "JunAiKey Genesis // Terminus Matrix";

export const MOCK_FILES: MockFile[] = [
    {
        path: "app/components/Dashboard.tsx",
        content: `
import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to the dashboard.</p>
        </div>
    );
}

export default Dashboard;
`
    },
    {
        path: "services/api.ts",
        content: `
export async function fetchData(endpoint: string) {
    try {
        const response = await fetch(\`/api/\${endpoint}\`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}
`
    }
];
