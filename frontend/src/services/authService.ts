interface UserData {
  role: 'admin' | 'user' | 'security';
  token: string;
}

export const authService = {
  async login(emailOrPhone: string, password: string): Promise<UserData> {
    // Mock implementation
    // Accept both test credentials
    const validCredentials = [
      { email: 'user@example.com', password: 'password' },
      { email: 'user@gmail.com', password: 'asdasd' }
    ];

    const isValid = validCredentials.some(
      cred => cred.email === emailOrPhone && cred.password === password
    );

    if (isValid) {
      const userData = {
        role: 'user' as const,
        token: 'mock_token_12345'
      };
      localStorage.setItem('user_token', userData.token);
      return userData;
    }
    throw new Error('Invalid credentials');
  },

  logout(): void {
    localStorage.removeItem('user_token');
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user_token');
  }
};