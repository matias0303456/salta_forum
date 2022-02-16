import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    if (session === null) {
        return res.status(401).json()
    }

    switch (req.method) {

        case 'PUT':
            return await updateComment(req, res)

        case 'DELETE':
            return await deleteComment(req, res)

    }

}

const updateComment = async (req, res) => {
    const result = await prisma.comment.update({
        where: { id: parseInt(req.query.id) },
        data: req.body
    })
    return res.status(200).json(result)
}

const deleteComment = async (req, res) => {
    const result = await prisma.comment.delete({
        where: { id: parseInt(req.query.id) }
    })
    return res.status(204).json(result)
} 