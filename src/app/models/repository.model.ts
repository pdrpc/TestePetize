export class Repository {
    constructor(
      public name: string,
      public description: string,
      public html_url: string,
      public stargazers_count: number,
      public updated_at: Date
    ) {}
  }
  