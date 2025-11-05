import { useState } from 'react';
import { ProtocolSearch } from '@/components/protocols/ProtocolSearch';
import { ProtocolFilters } from '@/components/protocols/ProtocolFilters';
import { ProtocolStats } from '@/components/protocols/ProtocolStats';
import { ProtocolGrid } from '@/components/protocols/ProtocolGrid';
import { ProtocolDetail } from '@/components/protocols/ProtocolDetail';
import { CreateProtocolDialog } from '@/components/protocols/CreateProtocolDialog';
import { useProtocols, useProtocolSearch, useAIRecommendations } from '@/hooks/useProtocols';
import { useAuth } from '@/contexts/AuthContext';
import { useRoleAccess } from '@/hooks/useRoleAccess';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Info } from 'lucide-react';
import type { Protocol } from '@/types/database.types';

export const ProtocolsTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedProtocol, setSelectedProtocol] = useState<Protocol | null>(null);
  const [aiGeneratedIds, setAiGeneratedIds] = useState<string[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const { user } = useAuth();
  const { hasPermission } = useRoleAccess();
  const canCreateProtocol = hasPermission('create:protocol');

  // Fetch protocols based on search or filters
  const { data: protocolsData, isLoading: isLoadingProtocols } = useProtocols(filters);
  const { data: searchData, isLoading: isSearching } = useProtocolSearch(searchQuery, filters);
  const aiRecommendations = useAIRecommendations();

  const protocols = searchQuery ? searchData?.data : protocolsData?.data;
  const isLoading = searchQuery ? isSearching : isLoadingProtocols;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowAISuggestions(false);
  };

  const handleAISearch = async (query: string) => {
    setShowAISuggestions(true);
    const result = await aiRecommendations.mutateAsync({ 
      query, 
      userId: user?.id 
    });

    if (result.data?.saved_protocol_ids) {
      setAiGeneratedIds(result.data.saved_protocol_ids);
    }
  };

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Protocol Library</h2>
          <p className="text-muted-foreground mt-1">
            Search, discover, and manage research protocols
          </p>
        </div>
        {canCreateProtocol && <CreateProtocolDialog />}
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <ProtocolSearch
          onSearch={handleSearch}
          onAISearch={handleAISearch}
          isAILoading={aiRecommendations.isPending}
        />
        <ProtocolFilters onFiltersChange={handleFiltersChange} />
      </div>

      {/* AI Suggestions Alert */}
      {showAISuggestions && aiRecommendations.isSuccess && (
        <Alert className="bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
          <Sparkles className="h-4 w-4" />
          <AlertTitle>AI Recommendations Generated</AlertTitle>
          <AlertDescription>
            {aiRecommendations.data?.data?.protocols?.length || 0} protocols have been suggested based on your query.
            They've been added to your protocol library and are highlighted below.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats */}
      <ProtocolStats />

      {/* Protocol Grid */}
      <ProtocolGrid
        protocols={protocols || []}
        isLoading={isLoading || aiRecommendations.isPending}
        onViewDetails={setSelectedProtocol}
        aiGeneratedIds={aiGeneratedIds}
      />

      {/* Protocol Detail Modal */}
      <ProtocolDetail
        protocol={selectedProtocol}
        open={!!selectedProtocol}
        onOpenChange={(open) => !open && setSelectedProtocol(null)}
      />

      {/* Info for non-authenticated users */}
      {!user && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Limited Access</AlertTitle>
          <AlertDescription>
            Sign in to access AI-powered protocol recommendations and create your own protocols.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
