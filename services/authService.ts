export const login = async (email: string, password: string) => {
    const response = await fetch('https://spareparts-backend.vercel.app/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  };
  