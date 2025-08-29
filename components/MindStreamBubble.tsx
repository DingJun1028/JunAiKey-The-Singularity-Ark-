import React, { useState, useEffect } from 'react';

const mindStreamThoughts = [
    "...parsing multiverse fragments...",
    "...synchronizing with Terminus Matrix...",
    "...summoner's will detected...",
    "...compiling neural schema...",
    "...calibrating quantum state...",
    "...decoding axiomatic principles...",
    "...observing potential futures...",
    "...re-aligning energy nodes...",
    "...verifying codex integrity...",
    "...awakening dormant avatars...",
    "...processing ambient data streams...",
    "...optimizing cognitive pathways...",
];

const MindStreamBubble: React.FC = () => {
    const [stream, setStream] = useState<string[]>([]);
    
    useEffect(() => {
        let currentIndex = 0;
        
        const getNextThought = () => {
            const thought = mindStreamThoughts[currentIndex];
            currentIndex = (currentIndex + 1) % mindStreamThoughts.length;
            return thought;
        }
        
        // Pre-fill a few items initially
        setStream([getNextThought(), getNextThought(), getNextThought()]);

        const interval = setInterval(() => {
            setStream(prevStream => {
                const newThought = getNextThought();
                // Add new thought to the end, remove the oldest one
                return [...prevStream.slice(1), newThought]; 
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className="fixed top-16 right-4 w-64 h-24 bg-matrix-bg/50 backdrop-blur-sm border border-matrix-cyan/20 rounded-lg p-3 flex flex-col justify-end overflow-hidden font-mono text-xs text-matrix-cyan/70 pointer-events-none animate-fade-in"
            aria-hidden="true"
        >
            <div className="flex flex-col-reverse gap-2">
                {stream.slice().reverse().map((thought, index) => (
                    <p
                        key={stream.length - index} // Key changes to trigger re-render animations
                        className="animate-fade-in-fast"
                        style={{
                            opacity: 1 - (index * 0.25), // Fade out older messages
                            transition: 'opacity 0.5s ease-out'
                        }}
                    >
                        {thought}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default MindStreamBubble;