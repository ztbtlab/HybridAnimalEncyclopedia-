export type GalleryItem = {
  id: string;
  fileId: string;
  title?: string;
  tags: string[];
  takenAt?: string;
  author?: string;
  description?: string;
  src: string; // プロキシURL
};
