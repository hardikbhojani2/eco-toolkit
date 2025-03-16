
export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  bgColor: string;
  route: string;
}

export interface PlagiarismResult {
  originalText: string;
  similarityScore: number;
  matchedSources: {
    url: string;
    similarity: number;
    matchedText: string;
  }[];
}

export interface GrammarResult {
  text: string;
  errors: {
    type: 'grammar' | 'spelling' | 'punctuation';
    message: string;
    offset: number;
    length: number;
    suggestions: string[];
  }[];
}

export interface ParaphraseResult {
  originalText: string;
  paraphrasedText: string;
}

export interface AIDetectionResult {
  text: string;
  score: number; // 0-1 where 1 means "definitely AI"
  confidence: number;
  explanation: string;
}

export interface ReverseImageResult {
  imageUrl: string;
  matches: {
    url: string;
    similarity: number;
    source: string;
  }[];
}
