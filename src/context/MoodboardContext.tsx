"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface MoodboardContextType {
    selectedItemIds: string[];
    addToMoodboard: (id: string) => void;
    removeFromMoodboard: (id: string) => void;
    clearMoodboard: () => void;
    isItemSelected: (id: string) => boolean;
    isDrawerOpen: boolean;
    setDrawerOpen: (isOpen: boolean) => void;
}

const MoodboardContext = createContext<MoodboardContextType | undefined>(undefined);

export function MoodboardProvider({ children }: { children: ReactNode }) {
    const [selectedItemIds, setSelectedItemIds] = useState<string[]>([]);
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('meow_moodboard_v1');
        if (saved) {
            try {
                setSelectedItemIds(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse moodboard data", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('meow_moodboard_v1', JSON.stringify(selectedItemIds));
    }, [selectedItemIds]);

    const addToMoodboard = (id: string) => {
        setSelectedItemIds(prev => {
            if (prev.includes(id)) return prev;
            return [...prev, id];
        });
    };

    const removeFromMoodboard = (id: string) => {
        setSelectedItemIds(prev => prev.filter(itemId => itemId !== id));
    };

    const clearMoodboard = () => {
        setSelectedItemIds([]);
    };

    const isItemSelected = (id: string) => {
        return selectedItemIds.includes(id);
    };

    return (
        <MoodboardContext.Provider value={{
            selectedItemIds,
            addToMoodboard,
            removeFromMoodboard,
            clearMoodboard,
            isItemSelected,
            isDrawerOpen,
            setDrawerOpen
        }}>
            {children}
        </MoodboardContext.Provider>
    );
}

export function useMoodboard() {
    const context = useContext(MoodboardContext);
    if (context === undefined) {
        throw new Error('useMoodboard must be used within a MoodboardProvider');
    }
    return context;
}
