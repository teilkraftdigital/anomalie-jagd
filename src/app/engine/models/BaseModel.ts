export type Block = { type: string; content: Record<string, any> };

export type BaseModel<TBlock> = {
  title: string;
  blocks: TBlock[];
};
