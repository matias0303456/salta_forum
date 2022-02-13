import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {

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