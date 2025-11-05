import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ProtocolSearchProps {
  onSearch: (query: string) => void;
  onAISearch: (query: string) => void;
  isAILoading?: boolean;
}

export const ProtocolSearch = ({ onSearch, onAISearch, isAILoading }: ProtocolSearchProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleAISearch = () => {
    if (query.trim()) {
      onAISearch(query);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search protocols or describe what you need..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          className="pl-10"
        />
      </div>
      <Button onClick={handleSearch} variant="outline">
        Search
      </Button>
      <Button 
        onClick={handleAISearch} 
        disabled={isAILoading || !query.trim()}
        className="bg-gradient-to-r from-primary to-primary/80"
      >
        {isAILoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        AI Suggest
      </Button>
    </div>
  );
};
