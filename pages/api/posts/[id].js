import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {

    switch (req.method) {

        case 'GET':
            return await getPost(req, res)

        case 'PUT':
            return await updatePost(req, res)

        case 'DELETE':
            return await deletePost(req, res)

    }

}

const getPost = async (req, res) => {
    const result = await prisma.post.findUnique({
        where: { id: parseInt(req.query.id) },
        include: {
            comments: {
                include: {
                    author: true,
                    responses: {
                        include: {
                            author: true
                        }
                    }
                }
            }
        }
    })
    return res.status(200).json(result)
}

const updatePost = async (req, res) => {
    const result = await prisma.post.update({
        where: { id: parseInt(req.query.id) },
        data: req.body
    })
    return res.status(200).json(result)
}

const deletePost = async (req, res) => {
    const result = await prisma.post.delete({
        where: { id: parseInt(req.query.id) }
    })
    return res.status(204).json(result)
}