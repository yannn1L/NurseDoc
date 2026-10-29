import { ContentBlock } from '../types';

export const PAGING_CONFIG = {
  PAGE_CAPACITY: 620,
  TITLE_WEIGHT: 200,
  SEC_HDR_WEIGHT: 55,
} as const;

export const BLOCK_BASE_WEIGHTS: Record<string, number> = {
  cover: 400,
  section: 40,
  heading: 30,
  subheading: 25,
  subsubsection: 25,
  analysis: 80,
  quote: 60,
  callout: 55,
  diagnosa: 90,
  soap: 130,
  tableBase: 40,
  tableRow: 40,
  listBase: 15,
  listItem: 22,
  stepsBase: 30,
  stepItem: 55,
  identityBase: 40,
  identityField: 25,
  pathwayBase: 60,
  pathwayStep: 45,
  bibliographyBase: 30,
  bibliographyItem: 40,
  default: 40,
};

export const THUMBNAIL_BLOCK_WIDTHS: Record<string, number> = {
  paragraph: 85,
  subheading: 50,
  list: 70,
  steps: 75,
  table: 95,
  quote: 80,
  callout: 90,
  diagnosa: 85,
  soap: 80,
  identity: 90,
  pathway: 85,
  bibliography: 80,
  analysis: 90,
  cover: 100,
  section: 60,
  heading: 55,
  subsubsection: 50,
  default: 80,
};

export function calculateBlockWeight(block: ContentBlock): number {
  switch (block.type) {
    case 'cover':
      return BLOCK_BASE_WEIGHTS.cover;
    case 'section':
      return BLOCK_BASE_WEIGHTS.section;
    case 'heading':
      return BLOCK_BASE_WEIGHTS.heading;
    case 'subheading':
      return BLOCK_BASE_WEIGHTS.subheading;
    case 'subsubsection':
      return BLOCK_BASE_WEIGHTS.subsubsection;
    case 'paragraph':
      return Math.max(20, Math.ceil((block.text?.length || 0) / 5));
    case 'list':
      return BLOCK_BASE_WEIGHTS.listBase + (block.items?.length || 0) * BLOCK_BASE_WEIGHTS.listItem;
    case 'steps':
      return BLOCK_BASE_WEIGHTS.stepsBase + (block.items?.length || 0) * BLOCK_BASE_WEIGHTS.stepItem;
    case 'table':
      return BLOCK_BASE_WEIGHTS.tableBase + (block.rows?.length || 0) * BLOCK_BASE_WEIGHTS.tableRow;
    case 'identity':
      return BLOCK_BASE_WEIGHTS.identityBase + (block.fields?.length || 0) * BLOCK_BASE_WEIGHTS.identityField;
    case 'pathway':
      return BLOCK_BASE_WEIGHTS.pathwayBase + (block.steps?.length || 0) * BLOCK_BASE_WEIGHTS.pathwayStep;
    case 'bibliography':
      return BLOCK_BASE_WEIGHTS.bibliographyBase + (block.items?.length || 0) * BLOCK_BASE_WEIGHTS.bibliographyItem;
    case 'analysis':
      return BLOCK_BASE_WEIGHTS.analysis;
    case 'quote':
      return BLOCK_BASE_WEIGHTS.quote;
    case 'callout':
      return BLOCK_BASE_WEIGHTS.callout;
    case 'diagnosa':
      return BLOCK_BASE_WEIGHTS.diagnosa;
    case 'soap':
      return BLOCK_BASE_WEIGHTS.soap;
    default:
      return BLOCK_BASE_WEIGHTS.default;
  }
}
