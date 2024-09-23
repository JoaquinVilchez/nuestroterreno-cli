// user session management.
interface UserType {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accessToken: string;
}

// received from the backend.
type UserResponseType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  accessToken: string;
};

export type { UserType, UserResponseType };
