import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    switch (req.method) {

        case 'GET':
            return await getPosts(req, res)

        case 'POST':
            if(session === null){
                return res.status(401).json()
            }
            return await createPost(req, res)

    }

}

const getPosts = async (req, res) => {
    const result = await prisma.post.findMany({
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

const createPost = async (req, res) => {
    const { userId, title, content } = req.body
    const result = await prisma.post.create({
        data: {
            userId: parseInt(userId),
            title,
            content
        }
    })
    return res.status(201).json(result)
}