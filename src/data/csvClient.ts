import Papa from 'papaparse';

export async function fetchCsv(
  url: string,
  opts: { delimiter?: string; encoding?: 'windows-1252' | 'latin1' | 'utf-8' } = {}
): Promise<Record<string, string>[]> {
  const { delimiter = ';', encoding = 'windows-1252' } = opts;
  
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch CSV: ${res.status} ${res.statusText}`);
    }
    
    const buf = await res.arrayBuffer();
    const text = new TextDecoder(encoding).decode(buf);
    
    const parsed = Papa.parse<Record<string, string>>(text, {
      header: true,
      delimiter,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(),
    });
    
    if (parsed.errors?.length) {
      console.warn('CSV parse errors:', parsed.errors.slice(0, 3));
    }
    
    return parsed.data;
  } catch (error) {
    console.error('Error fetching CSV:', error);
    throw error;
  }
}