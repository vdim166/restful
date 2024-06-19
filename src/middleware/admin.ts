import { Request, Response, NextFunction } from "express"

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.user?.role !== 1)
    return res.status(403).json({ error: "Access denied" })
  next()
}
