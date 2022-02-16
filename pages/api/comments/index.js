import prisma from '../lib/prisma'

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const { userId, postId, content } = req.body
        const result = await prisma.comment.create({
            data: {
                userId: parseInt(userId),
                postId: parseInt(postId),
                content
            }
        })
        return res.status(201).json(result)
    }

}