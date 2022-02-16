import { toast } from 'react-toastify'
import prisma from '../lib/prisma'

export default async function handler(req, res) {

    const { first_name, last_name, username, email, password } = req.body

    try {
        await prisma.user.create({
            data: {
                first_name,
                last_name,
                username,
                email,
                password
            }
        })
        return res.status(200).json()
    } catch (error) {
        toast.error(err.message)
    }

}