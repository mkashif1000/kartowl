import { useState, useEffect, useRef } from 'react';
import { Clock, TrendingUp, X, Search } from 'lucide-react';

interface SearchSuggestionsProps {
    searchQuery: string;
    onSuggestionClick: (query: string) => void;
    isVisible: boolean;
    onClose: () => void;
}

// Trending/popular searches (can be updated from API later)
const POPULAR_SEARCHES = [
    'iPhone 15',
    'Samsung Galaxy S24',
    'Airpods Pro',
    'Gaming Laptop',
    'Smart Watch',
    'Wireless Earbuds',
    'Power Bank 20000mAh',
    'Mechanical Keyboard',
];

const STORAGE_KEY = 'kartowl_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export function getRecentSearches(): string[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function saveRecentSearch(query: string) {
    try {
        const trimmed = query.trim();
        if (!trimmed || trimmed.length < 2) return;

        const recent = getRecentSearches();
        // Remove if exists, add to front
        const filtered = recent.filter(s => s.toLowerCase() !== trimmed.toLowerCase());
        const updated = [trimmed, ...filtered].slice(0, MAX_RECENT_SEARCHES);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
        console.error('Failed to save recent search', e);
    }
}

export function clearRecentSearches() {
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
        console.error('Failed to clear recent searches', e);
    }
}

export default function SearchSuggestions({
    searchQuery,
    onSuggestionClick,
    isVisible,
    onClose
}: SearchSuggestionsProps) {
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setRecentSearches(getRecentSearches());
    }, [isVisible]);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    // Filter suggestions based on current query
    const filteredPopular = searchQuery.trim()
        ? POPULAR_SEARCHES.filter(s =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, 4)
        : POPULAR_SEARCHES.slice(0, 4);

    const filteredRecent = searchQuery.trim()
        ? recentSearches.filter(s =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : recentSearches;

    const handleClearRecent = (e: React.MouseEvent) => {
        e.stopPropagation();
        clearRecentSearches();
        setRecentSearches([]);
    };

    const handleRemoveRecent = (e: React.MouseEvent, search: string) => {
        e.stopPropagation();
        const updated = recentSearches.filter(s => s !== search);
        setRecentSearches(updated);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    return (
        <div
            ref={containerRef}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden"
        >
            {/* Recent Searches */}
            {filteredRecent.length > 0 && (
                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            Recent Searches
                        </span>
                        <button
                            onClick={handleClearRecent}
                            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="space-y-1">
                        {filteredRecent.map((search) => (
                            <div
                                key={search}
                                onClick={() => onSuggestionClick(search)}
                                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer group"
                            >
                                <span className="text-sm text-slate-700 dark:text-slate-300">{search}</span>
                                <button
                                    onClick={(e) => handleRemoveRecent(e, search)}
                                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-all"
                                >
                                    <X className="w-3.5 h-3.5 text-slate-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Popular/Trending Searches */}
            <div className="p-3">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-3.5 h-3.5" />
                    Trending Searches
                </span>
                <div className="flex flex-wrap gap-2">
                    {filteredPopular.map((search) => (
                        <button
                            key={search}
                            onClick={() => onSuggestionClick(search)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-brand-purple hover:text-white transition-all"
                        >
                            <Search className="w-3 h-3" />
                            {search}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
