export type DocumentType = 'askep' | 'logbook' | 'lp' | 'sop';

export interface TypeMetaItem {
  label: string;
  color: string;
  icon: string;
  desc: string;
}

export type BlockType =
  | 'cover'
  | 'section'
  | 'heading'
  | 'subheading'
  | 'subsubsection'
  | 'paragraph'
  | 'list'
  | 'steps'
  | 'table'
  | 'identity'
  | 'pathway'
  | 'bibliography'
  | 'analysis'
  | 'quote'
  | 'callout'
  | 'diagnosa'
  | 'soap';

export interface BaseBlock {
  type: BlockType;
}

export interface CoverBlock extends BaseBlock {
  type: 'cover';
  header?: string;
  category?: string;
  judul: string;
  penyusun?: { label: string; value: string }[];
  footer?: string;
}

export interface SectionBlock extends BaseBlock {
  type: 'section';
  num?: string;
  heading: string;
}

export interface HeadingBlock extends BaseBlock {
  type: 'heading';
  num?: string;
  text: string;
}

export interface SubheadingBlock extends BaseBlock {
  type: 'subheading';
  num?: string;
  text: string;
}

export interface SubsubsectionBlock extends BaseBlock {
  type: 'subsubsection';
  num?: string;
  text: string;
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
  text: string;
}

export interface ListBlock extends BaseBlock {
  type: 'list';
  items: string[];
}

export interface StepItem {
  step: string;
  text: string;
}

export interface StepsBlock extends BaseBlock {
  type: 'steps';
  items: StepItem[];
}

export interface TableBlock extends BaseBlock {
  type: 'table';
  headers: string[];
  rows: string[][];
}

export interface IdentityField {
  label: string;
  value: string;
}

export interface IdentityBlock extends BaseBlock {
  type: 'identity';
  title?: string;
  fields: IdentityField[];
}

export interface PathwayStep {
  text: string;
  highlight?: boolean;
}

export interface PathwayBlock extends BaseBlock {
  type: 'pathway';
  title?: string;
  steps: PathwayStep[];
}

export interface BibliographyBlock extends BaseBlock {
  type: 'bibliography';
  items: string[];
}

export interface AnalysisItem {
  label: string;
  content: string;
  rationale?: string;
}

export interface AnalysisBlock extends BaseBlock {
  type: 'analysis';
  title?: string;
  items: AnalysisItem[];
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote';
  text: string;
}

export interface CalloutBlock extends BaseBlock {
  type: 'callout';
  icon?: string;
  variant?: 'info' | 'warning';
  text: string;
}

export interface DiagnosaBlock extends BaseBlock {
  type: 'diagnosa';
  priority?: string;
  title: string;
  detail?: string;
}

export interface SoapBlock extends BaseBlock {
  type: 'soap';
  s: string;
  o: string;
  a: string;
  p: string;
}

export type ContentBlock =
  | CoverBlock
  | SectionBlock
  | HeadingBlock
  | SubheadingBlock
  | SubsubsectionBlock
  | ParagraphBlock
  | ListBlock
  | StepsBlock
  | TableBlock
  | IdentityBlock
  | PathwayBlock
  | BibliographyBlock
  | AnalysisBlock
  | QuoteBlock
  | CalloutBlock
  | DiagnosaBlock
  | SoapBlock;

export interface Section {
  id: string;
  num?: string;
  heading: string;
  isCover?: boolean;
  keywords?: string[];
  blocks: ContentBlock[];
}

export interface DocumentStats {
  words: number;
  readTime: number;
}

export interface NurseDocument {
  id: string;
  type: DocumentType;
  title: string;
  subtitle?: string;
  ruangan?: string;
  author: string;
  clinicalTeacher?: string;
  clinicalInstructor?: string;
  date: string;
  tags?: string[];
  stats?: DocumentStats;
  summary?: string;
  sections: Section[];
}

export type PageBlockKind =
  | { kind: 'title' }
  | { kind: 'section-header'; num?: string; heading: string; id: string; isCover?: boolean }
  | { kind: 'block'; block: ContentBlock };

export interface PageSheet {
  blocks: PageBlockKind[];
  weight: number;
}

export interface SearchHit {
  docId: string;
  sectionId: string;
  docTitle: string;
  type: DocumentType;
  ruangan: string;
  heading: string;
  text: string;
  score: number;
  preview: string;
}
