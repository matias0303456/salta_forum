import prisma from '../lib/prisma'
import getSession from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    if (session === null) {
        return res.status(401).json()
    }

    if (req.method === 'POST') {
        const { userId, commentId, content } = req.body
        const result = await prisma.response.create({
            data: {
                userId: parseInt(userId),
                commentId: parseInt(commentId),
                content
            }
        })
        return res.status(201).json(result)
    }

}