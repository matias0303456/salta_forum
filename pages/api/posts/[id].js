import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    if(session === null){
        return res.status(401).json()
    }

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
            user: true,
            comments: {
                include: {
                    user: true,
                    responses: {
                        include: {
                            user: true
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