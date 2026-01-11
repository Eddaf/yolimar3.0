import React, { useState, useMemo } from 'react';
import { CATALOG_PRODUCTS, Product } from '@/constants/products';
import { CONFIG_DATA } from '@/constants/config';
import ProductCard from './ProductCard';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const CatalogGrid: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const types = Object.values(CONFIG_DATA.types);

  const filteredProducts = useMemo(() => {
    return CATALOG_PRODUCTS.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.material.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !selectedType || product.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  const productCount = filteredProducts.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent to-primary/5 rounded-2xl p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-black text-foreground mb-2">
          Catálogo de Productos
        </h1>
        <p className="text-muted-foreground">
          Explora nuestra colección de ropa de alta calidad
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Button
            variant={selectedType === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType(null)}
          >
            Todos
          </Button>
          {types.map((type) => (
            <Button
              key={type.id}
              variant={selectedType === type.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedType(type.id)}
            >
              {type.name}
            </Button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="hidden md:flex items-center gap-1 bg-muted p-1 rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="font-medium">
          {productCount} producto{productCount !== 1 ? 's' : ''}
        </Badge>
        {searchTerm && (
          <span className="text-sm text-muted-foreground">
            para "{searchTerm}"
          </span>
        )}
      </div>

      {/* Products Grid */}
      {productCount > 0 ? (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No encontramos productos
          </h3>
          <p className="text-muted-foreground mb-4">
            Intenta con otros términos de búsqueda o filtros
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedType(null);
            }}
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default CatalogGrid;
