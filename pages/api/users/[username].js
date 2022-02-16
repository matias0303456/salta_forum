import prisma from '../lib/prisma'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {

    const session = await getSession({ req })

    if (session === null) {
        return res.status(401).json()
    }

    switch (req.method) {

        case 'GET':
            return await getUser(req, res)

        case 'PUT':
            return await updateUser(req, res)

        case 'DELETE':
            return await deleteUser(req, res)

    }

}

const getUser = async (req, res) => {
    const result = await prisma.user.findUnique({
        where: { username: req.query.username },
        include: {
            posts: true,
            comments: true,
            responses: true
        },
    })
    exclude(result, 'password')
    return res.status(200).json(result)
}

const updateUser = async (req, res) => {
    const { first_name, last_name, username, email, bio } = req.body
    const result = await prisma.user.update({
        where: { username: req.query.username },
        data: {
            first_name,
            last_name,
            username,
            email,
            bio
        },
        include: {
            posts: true,
            comments: true,
            responses: true
        }
    })
    exclude(result, 'password')
    return res.status(200).json(result)
}

const deleteUser = async (req, res) => {
    const result = await prisma.user.delete({
        where: { username: req.query.username }
    })
    return res.status(204).json(result)
}

// Exclude keys from user
const exclude = (user, ...keys) => {
    for (let key of keys) {
        delete user[key]
    }
    return user
}
