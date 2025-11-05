import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface ProtocolFiltersProps {
  onFiltersChange: (filters: any) => void;
}

const AVAILABLE_TAGS = [
  'molecular-biology',
  'protein-analysis',
  'cell-culture',
  'genomics',
  'immunology',
  'chemistry',
  'materials-science',
  'high-throughput',
  'microscopy',
  'spectroscopy'
];

export const ProtocolFilters = ({ onFiltersChange }: ProtocolFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    tags: [] as string[],
    minCost: 0,
    maxCost: 10000,
    minDuration: 0,
    maxDuration: 480,
    minSuccessRate: 0,
    verified: undefined as boolean | undefined,
    minRating: 0,
  });

  const updateFilters = (newFilters: any) => {
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleTag = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    updateFilters({ ...filters, tags: newTags });
  };

  const clearFilters = () => {
    const defaultFilters = {
      tags: [],
      minCost: 0,
      maxCost: 10000,
      minDuration: 0,
      maxDuration: 480,
      minSuccessRate: 0,
      verified: undefined,
      minRating: 0,
    };
    setFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const hasActiveFilters = filters.tags.length > 0 || 
    filters.minCost > 0 || 
    filters.maxCost < 10000 ||
    filters.minDuration > 0 ||
    filters.maxDuration < 480 ||
    filters.minSuccessRate > 0 ||
    filters.verified !== undefined ||
    filters.minRating > 0;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center justify-between mb-4">
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                Active
              </Badge>
            )}
          </Button>
        </CollapsibleTrigger>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <CollapsibleContent>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Filter Protocols</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map(tag => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Cost Range */}
            <div className="space-y-2">
              <Label>Cost Range: ${filters.minCost} - ${filters.maxCost}</Label>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={[filters.minCost, filters.maxCost]}
                onValueChange={([min, max]) => updateFilters({ ...filters, minCost: min, maxCost: max })}
              />
            </div>

            {/* Duration Range */}
            <div className="space-y-2">
              <Label>Duration: {filters.minDuration} - {filters.maxDuration} minutes</Label>
              <Slider
                min={0}
                max={480}
                step={30}
                value={[filters.minDuration, filters.maxDuration]}
                onValueChange={([min, max]) => updateFilters({ ...filters, minDuration: min, maxDuration: max })}
              />
            </div>

            {/* Success Rate */}
            <div className="space-y-2">
              <Label>Minimum Success Rate: {filters.minSuccessRate}%</Label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={[filters.minSuccessRate]}
                onValueChange={([value]) => updateFilters({ ...filters, minSuccessRate: value })}
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label>Minimum Rating: {filters.minRating} stars</Label>
              <Slider
                min={0}
                max={5}
                step={0.5}
                value={[filters.minRating]}
                onValueChange={([value]) => updateFilters({ ...filters, minRating: value })}
              />
            </div>

            {/* Verified Only */}
            <div className="flex items-center justify-between">
              <Label htmlFor="verified">Verified Protocols Only</Label>
              <Switch
                id="verified"
                checked={filters.verified === true}
                onCheckedChange={(checked) => updateFilters({ ...filters, verified: checked || undefined })}
              />
            </div>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  );
};
