/**
 * BASE DE DATOS DE DISEÑOS/ESTAMPADOS
 */

export interface DesignMeta {
  material: string;
}

export interface DesignCategory {
  _meta: DesignMeta;
  [color: string]: string | DesignMeta;
}

export interface Design {
  id: number;
  name: string;
  img: string;
  referencia: string[];
}

export const IMAGES_DB: Record<string, DesignCategory> = {
  Algodon: {
    _meta: { material: 'Algodón Brasilero 100%' },
    blanco: '/imagenes/PolerasAlgodon/poleraBlancoALG1.png',
    negro: '/imagenes/PolerasAlgodon/poleraNegroALG1.png',
    rojo: '/imagenes/PolerasAlgodon/poleraRojoALG1.png',
    azul: '/imagenes/PolerasAlgodon/poleraAzulALG1.png',
    verde: '/imagenes/PolerasAlgodon/poleraVerdeALG1.png',
    gris: '/imagenes/PolerasAlgodon/poleraPlomoALG1.png'
  },
  Poliester: {
    _meta: { material: 'Poliéster 100%' },
    blanco: '/imagenes/PolerasPoliester/poleraBlancoPOL1.png',
    negro: '/imagenes/PolerasPoliester/poleraNegroPOL1.png',
    rojo: '/imagenes/PolerasPoliester/poleraRojoPOL1.png',
    azul: '/imagenes/PolerasPoliester/poleraAzulPOL1.png',
    verde: '/imagenes/PolerasPoliester/poleraVerdePOL1.png',
    gris: '/imagenes/PolerasPoliester/poleraPlomoPOL1.png'
  },
  V: {
    _meta: { material: 'Poliéster 100%' },
    blanco: '/imagenes/PolerasCuelloV/poleraBlancoCV1.png',
    negro: '/imagenes/PolerasCuelloV/poleraNegroCV1.png',
    rojo: '/imagenes/PolerasCuelloV/poleraRojoCV1.png',
    azul: '/imagenes/PolerasCuelloV/poleraAzulCV1.png',
    verde: '/imagenes/PolerasCuelloV/poleraVerdeCV1.png',
    gris: '/imagenes/PolerasCuelloV/poleraPlomoCV1.png'
  },
  TOP: {
    _meta: { material: 'Algodón 100%' },
    blanco: '/imagenes/PoleraTop/topBlanco1.png',
    negro: '/imagenes/PoleraTop/topNegro1.png',
    rojo: '/imagenes/PoleraTop/topRojo1.png',
    azul: '/imagenes/PoleraTop/topAzul1.png',
    verde: '/imagenes/PoleraTop/topVerde1.png',
    gris: '/imagenes/PoleraTop/topGris1.png'
  },
  Solera: {
    _meta: { material: 'Gasa' },
    blanco: '/imagenes/Solera/solBlanco1.png',
    negro: '/imagenes/Solera/solNegro1.png',
    rojo: '/imagenes/Solera/solRojo1.png',
    azul: '/imagenes/Solera/solAzul1.png',
    verde: '/imagenes/Solera/solVerde1.png',
    gris: '/imagenes/Solera/solGris1.png'
  }
};

export const getMaterial = (type: string): string => {
  const category = IMAGES_DB[type];
  if (category && category._meta) {
    return (category._meta as DesignMeta).material;
  }
  return 'Material no especificado';
};

export const DESIGNS_DB: Design[] = [
  { id: 1, name: 'EST_IMG1', img: '/placeholder.svg', referencia: ['Cuervo', 'Escudos', 'Animal'] },
  { id: 2, name: 'EST_IMG2', img: '/placeholder.svg', referencia: ['Luffy', 'One Piece', 'Anime'] },
  { id: 3, name: 'EST_IMG3', img: '/placeholder.svg', referencia: ['León', 'Escudo', 'Animal'] },
  { id: 4, name: 'EST_IMG4', img: '/placeholder.svg', referencia: ['Huntrix', 'K-Pop', 'Anime'] },
  { id: 5, name: 'EST_IMG5', img: '/placeholder.svg', referencia: ['Leona', 'Animal', ''] },
  { id: 6, name: 'EST_IMG6', img: '/placeholder.svg', referencia: ['Disney', 'Star Wars', 'Guerrero'] },
  { id: 7, name: 'EST_IMG7', img: '/placeholder.svg', referencia: ['Mono', 'Arte', 'Animal'] },
  { id: 8, name: 'EST_IMG8', img: '/placeholder.svg', referencia: ['Nami', 'Luffy', 'One Piece'] },
  { id: 9, name: 'EST_IMG9', img: '/placeholder.svg', referencia: ['Panda', 'Animal', 'Arte'] },
  { id: 10, name: 'EST_IMG10', img: '/placeholder.svg', referencia: ['Disney', 'Star Wars', 'R2-D2', 'Robot'] },
  { id: 11, name: 'EST_IMG11', img: '/placeholder.svg', referencia: ['Escudo', 'Space Marine', 'Warhammer', '40K'] },
  { id: 12, name: 'EST_IMG12', img: '/placeholder.svg', referencia: ['Disney', 'Stitch', 'Arte'] },
  { id: 13, name: 'EST_IMG13', img: '/placeholder.svg', referencia: ['DC', 'Superman', 'Caricatura'] }
];

export const POLERA_TYPES = [
  { id: 'Algodon', name: 'Algodón', description: 'Algodón Brasilero 100%' },
  { id: 'Poliester', name: 'Poliéster', description: 'Poliéster 100%' },
  { id: 'V', name: 'Cuello V', description: 'Poliéster con cuello en V' },
  { id: 'TOP', name: 'Top', description: 'Algodón 100%' },
];

export const AVAILABLE_COLORS = ['blanco', 'negro', 'rojo', 'azul', 'verde', 'gris'];
