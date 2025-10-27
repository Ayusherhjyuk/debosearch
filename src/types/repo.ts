// src/types/repo.ts

export interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description?: string;
    stargazers_count: number;
    forks_count: number;
    updated_at: string;
    language?: string;
    owner: {
      login: string;
      avatar_url: string;
      html_url: string;
    };
  }
  