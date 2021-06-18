export interface IFetchExpertsMaterialsOptions {
  expertId: number;
  filters: {
    page: number;
    type: number[];
    directions: number[];
  };
  page: number;
  appendPosts: boolean;
}
