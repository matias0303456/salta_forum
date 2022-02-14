import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handler(req, res) {

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
        where: { id: parseInt(req.query.id) },
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
        where: { id: parseInt(req.query.id) },
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
        where: { id: parseInt(req.query.id) }
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
