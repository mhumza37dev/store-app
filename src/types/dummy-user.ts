export interface DummyUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string; // DummyJSON returns 'accessToken' or 'token' depending on endpoint version, usually 'accessToken' for newer, 'token' for older. Docs say 'accessToken'.
  refreshToken: string;
}
