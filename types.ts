
export interface AnalysisResult {
  title: string;
  summary: string;
  keyTakeaways: string[];
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentScore: number; // 0 to 100
  category: string;
  tags: string[];
  readingTime: string;
  entities: {
    people: string[];
    locations: string[];
    organizations: string[];
  };
  complexity: 'Simple' | 'Intermediate' | 'Advanced';
}

export interface SavedAnalysis {
  id: string;
  url: string;
  timestamp: number;
  data: AnalysisResult;
}
