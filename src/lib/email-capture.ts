const LEAD_API_URL = 'https://seoagent.com/api/cli/lead';

export async function submitEmailLead(email: string, domain: string): Promise<boolean> {
  try {
    const res = await fetch(LEAD_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, domain }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
