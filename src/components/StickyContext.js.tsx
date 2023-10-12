// StickyContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StickyContextType {
    isStickyLeft: boolean;
    setIsStickyLeft: React.Dispatch<React.SetStateAction<boolean>>;
}

const StickyContext = createContext<StickyContextType | undefined>(undefined);

export const StickyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isStickyLeft, setIsStickyLeft] = useState(false);

    return (
        <StickyContext.Provider value={{ isStickyLeft, setIsStickyLeft }}>
            {children}        </StickyContext.Provider>
    );
};

export const useSticky = (): StickyContextType => {
    const context = useContext(StickyContext);
    if (context === undefined) {
        throw new Error('useSticky must be used within a StickyProvider');
    }
    return context;
};
