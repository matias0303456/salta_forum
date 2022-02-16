import prisma from '../lib/prisma'

export default async function handler(req, res) {

    const { email, password } = req.body

    try {
        const result = await prisma.user.findFirst({
            where: {
                email,
                password
            }
        })
        return res.status(200).json(result)
    } catch {
        return null
    }

}