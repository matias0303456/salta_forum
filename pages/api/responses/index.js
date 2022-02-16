import prisma from '../lib/prisma'

export default async function handler(req, res) {

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