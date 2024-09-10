import type { CSSProperties } from "vue";

export type Sort = "asc" | "desc";

export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface IHeaderTable {
  name: keyof Post;
  sortable?: boolean;
  style?: CSSProperties;
}
