import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Store } from 'lucide-react';
import { AVAILABLE_COUNTRIES, STORE_BUILD_COST } from './storeNetworkModel';

interface StoresBuildCardProps {
  onBuildStore: (country: string) => void;
  isBuilding?: boolean;
}

export default function StoresBuildCard({ onBuildStore, isBuilding }: StoresBuildCardProps) {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleBuild = () => {
    if (selectedCountry) {
      onBuildStore(selectedCountry);
      setSelectedCountry('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg">Build Store</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          Open a flagship store in a new country to boost productivity and product attraction
        </p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Cost:</span>
            <span className="font-medium">${STORE_BUILD_COST.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Productivity Bonus:</span>
            <span className="font-medium">+5%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Attraction Bonus:</span>
            <span className="font-medium">+3%</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Select Country</Label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Choose a country" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABLE_COUNTRIES.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleBuild} className="w-full" disabled={!selectedCountry || isBuilding}>
          {isBuilding ? 'Building...' : 'Build Store'}
        </Button>
      </CardContent>
    </Card>
  );
}
