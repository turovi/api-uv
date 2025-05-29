export type UvEntry = {
    lat: number;
    long: number;
    uv: number;
    libcarte: string;
    date: string;
  };
  
  export type UvApiResponse = {
    entries: UvEntry[];
    page_number?: number;
    page_size?: number;
    total_entries?: number;
    total_pages?: number;
  };