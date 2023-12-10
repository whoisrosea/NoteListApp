export interface Notes {
  id: string;
  title: string;
  tags: string[];
  visibility?: boolean;
}

export interface TagsVisibility {
  [tag: string]: boolean;
}

export interface State {
  notes: Notes[];
  tagsVisibility: TagsVisibility;
}