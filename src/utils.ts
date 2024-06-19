import { Response } from "express"
import nodemailer from "nodemailer"
import config from "config"

export const handleError = (error: unknown, res: Response) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message })
  } else {
    res.status(400).json({ error: "An unknown error occurred" })
  }
}

export const sendVerificationEmail = async (
  user: { email: string },
  token: string
) => {
  const mailUser: string = config.get("emailUser")

  const transpoter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: mailUser,
      pass: config.get("emailPass"),
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  const mailOptions = {
    from: `"The Idea project" <${mailUser}>`,
    to: user.email,
    subject: "Email Verification",
    text: `Please verify your email by clicking on the following link:
      ${config.get("BaseUrl")}/verify-email?token=${token}`,
  }

  transpoter.sendMail(mailOptions, (err, info) => {
    console.log(err, info)
  })

  await transpoter.sendMail(mailOptions)
}
