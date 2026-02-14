import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trophy, Award } from 'lucide-react';
import type { ReleasedProduct } from '../../backend';
import {
  DEVICE_CATEGORIES,
  dayToYear,
  filterProductsByYearAndCategory,
  findBestProduct,
  getAvailableYears,
  calculateProductScore,
} from './bestProductScoring';
import LogoRenderer from '@/features/branding/LogoRenderer';
import { getProductLogo } from './releasedProductModel';

interface BestProductsOfYearPanelProps {
  releasedProducts: ReleasedProduct[];
  currentDay: number;
}

export default function BestProductsOfYearPanel({ releasedProducts, currentDay }: BestProductsOfYearPanelProps) {
  const currentYear = dayToYear(currentDay);
  const availableYears = getAvailableYears(releasedProducts);
  const [selectedYear, setSelectedYear] = useState<number>(
    availableYears.length > 0 ? availableYears[0] : currentYear
  );

  if (releasedProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Best Products of the Year
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-8">
            No products released yet. Release products to see awards!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Best Products of the Year
          </CardTitle>
          <Select value={selectedYear.toString()} onValueChange={(v) => setSelectedYear(parseInt(v))}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  Year {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {DEVICE_CATEGORIES.map((category) => {
            const categoryProducts = filterProductsByYearAndCategory(releasedProducts, selectedYear, category);
            const winner = findBestProduct(categoryProducts);

            return (
              <div
                key={category}
                className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium capitalize">{category.replace('-', ' ')}</p>
                    {winner ? (
                      <div className="flex items-center gap-2 mt-1">
                        <LogoRenderer logo={getProductLogo(winner)} name={winner.name} size="sm" />
                        <p className="text-sm text-muted-foreground">{winner.name}</p>
                        <Badge variant="secondary" className="text-xs">
                          Score: {calculateProductScore(winner).toFixed(0)}
                        </Badge>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No releases this year</p>
                    )}
                  </div>
                </div>
                {winner && (
                  <div className="text-right">
                    <p className="text-sm font-medium">${Number(winner.price).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{Number(winner.sales).toLocaleString()} units</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
