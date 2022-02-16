import { toast } from 'react-toastify'
import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    if(session === null){
        return res.status(401).json()
    }

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