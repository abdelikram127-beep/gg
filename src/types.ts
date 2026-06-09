export interface Task {
  id: string;
  title: string;
  time?: string;
  completed: boolean;
  category: 'general' | 'skin_massage' | 'sport' | 'home';
  notes?: string;
  createdAt: number;
}

export interface VideoItem {
  id: string;
  title: string;
  videoUrl: string;
  youtubeId: string;
  duration: string;
  category: 'skin_massage' | 'sport';
  benefits: string[];
  instructor?: string;
}

export interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  desc: string;
  completed: boolean;
  category: 'home' | 'sport' | 'skin_massage';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
