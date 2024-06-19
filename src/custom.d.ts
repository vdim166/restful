interface User {
  username: string
  password: string
  email: string
  role: number
  id: string
}

declare namespace Express {
  export interface Request {
    user?: User
  }
}
