import 'dotenv/config';
import { Request, Response } from "express";
import getOneService from "../services/user/get-one.service";

export const profile = async (req: Request, res: Response) => {
  try {
    if (!req.userId) throw new Error("Application error.");
    const { error, user } = await getOneService({ where: { uuid: req.userId } })
    console.log(user)
    if (error) return res.status(404).json({ error: { message: "User doesn't exist!" } })
    res.json({ user })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error: { message: 'Application error.' } })

  }

}