import prisma from '../lib/prisma'

export default async function (req, res) {

    switch (req.method) {

        case 'PUT':
            return await updateResponse(req, res)

        case 'DELETE':
            return await deleteResponse(req, res)

    }

}

const updateResponse = async (req, res) => {
    const result = await prisma.response.update({
        where: { id: parseInt(req.query.id) },
        data: req.body
    })
    return res.status(200).json(result)
}

const deleteResponse = async (req, res) => {
    const result = await prisma.response.delete({
        where: { id: parseInt(req.query.id) }
    })
    return res.status(204).json(result)
}