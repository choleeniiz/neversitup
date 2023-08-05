const TOKEN_KEY = 'token'
export const getToken = (tokenKey = TOKEN_KEY): string | null => {
      return (sessionStorage && sessionStorage.getItem(tokenKey)) || null
  }
  