import { jwtDecode, JwtPayload } from 'jwt-decode';

function isAdmin(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.roles?.includes('ROLE_ADMIN') as boolean;
  } catch (error) {
    console.error('Invalid token or decoding error', error);
    return false;
  }
}

export default isAdmin;
