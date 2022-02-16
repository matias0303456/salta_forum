import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    if (session === null) {
        return res.status(401).json()
    }

    if (req.method === 'POST') {
        const { userId, postId, content } = req.body
        const result = await prisma.comment.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
                content,
            },
            include: {
                user: true
            }
        })
        return res.status(201).json(result)
    }

}