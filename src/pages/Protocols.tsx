import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProtocolSearch } from '@/components/protocols/ProtocolSearch';
import { ProtocolFilters } from '@/components/protocols/ProtocolFilters';
import { ProtocolGrid } from '@/components/protocols/ProtocolGrid';
import { ProtocolDetail } from '@/components/protocols/ProtocolDetail';
import { ProtocolStats } from '@/components/protocols/ProtocolStats';
import { useProtocols, useProtocolSearch, useAIRecommendations } from '@/hooks/useProtocols';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Info, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Protocol } from '@/types/database.types';

const Protocols = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [aiGeneratedIds, setAiGeneratedIds] = useState<string[]>([]);
  
  const { data: protocolsResponse, isLoading: protocolsLoading } = useProtocols(filters);
  const { data: searchResultsResponse, isLoading: searchLoading } = useProtocolSearch(
    searchQuery, 
    filters
  );
  const aiRecommendations = useAIRecommendations();

  const protocols = protocolsResponse?.data || [];
  const searchResults = searchResultsResponse?.data || [];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setAiGeneratedIds([]);
  };

  const handleAISearch = async (query: string) => {
    if (!user) {
      toast.info('Sign in to use AI recommendations', {
        description: 'Create an account to access AI-powered protocol suggestions',
        action: {
          label: 'Sign In',
          onClick: () => navigate('/login')
        }
      });
      return;
    }

    try {
      const result = await aiRecommendations.mutateAsync({
        query,
        userId: user.id
      });
      
      if (result?.data?.protocols) {
        setAiGeneratedIds(result.data.protocols.map((p: Protocol) => p.id));
      }
    } catch (error) {
      toast.error('AI search failed', {
        description: 'Please try again or use regular search'
      });
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setAiGeneratedIds([]);
  };

  const handleViewDetails = (protocol: Protocol) => {
    setSelectedProtocol(protocol);
  };

  const displayProtocols = searchQuery ? searchResults : protocols;
  const isLoading = searchQuery ? searchLoading : protocolsLoading;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">Protocol Library</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Explore verified research protocols, search by keywords, or use AI to find methods tailored to your needs.
          </p>
        </div>

        {/* Info Alert for Non-Authenticated Users */}
        {!user && (
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription>
              <a href="/register" className="font-medium text-primary hover:underline">
                Sign up
              </a>
              {' '}to access AI recommendations, save protocols, and contribute to the community.
            </AlertDescription>
          </Alert>
        )}

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <ProtocolSearch
            onSearch={handleSearch}
            onAISearch={handleAISearch}
            isAILoading={aiRecommendations.isPending}
          />
          <ProtocolFilters onFiltersChange={handleFiltersChange} />
        </div>

        {/* Stats */}
        <div className="mb-8">
          <ProtocolStats />
        </div>

        {/* Protocol Grid */}
        <ProtocolGrid
          protocols={displayProtocols}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
          aiGeneratedIds={aiGeneratedIds}
        />

        {/* Protocol Detail Modal */}
        {selectedProtocol && (
          <ProtocolDetail
            protocol={selectedProtocol}
            open={!!selectedProtocol}
            onOpenChange={(open) => !open && setSelectedProtocol(null)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Protocols;
