const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    async get(req, res) {
        const user = req.user.id;
        const { search, page = 1, limit = 10} = req.query;
        let todo = await prisma.toDo.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: {
                id: 'asc'
            },
            where: {
                user_id: user
            }
        });

        if (!todo.length) {
            return res.status(200).json({
                status: 'success', 
                code: 200, 
                message: 'Data empty',
                data: todo
            })
        }
        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'To-do list',
            data: todo
        })
    },

    async getById(req, res) {
        const user = req.user.id;
        let todo = await prisma.toDo.findUnique({
            where: {
                id: Number(req.params.id),
                user_id: user
            }
        });

        if (!todo) {
            return res.status(404).json({
                status: 'OK', 
                code: 404, 
                message: 'Data tidak ditemukan'
            })
        }

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Activity:',
            data: todo
        })
    },

    async insert(req, res) {
        const user = req.user.id;
        const todo = await prisma.toDo.create({
            data: {
                user_id: user,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }
        });

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Berhasil tambah data',
            data: todo
        })
    },

    async update(req, res) {
        const user = req.user.id;
        const ifExist = await prisma.toDo.findFirst({
            where: {
                id: Number(req.params.id),
                user_id: user
            }
        })
        if (!ifExist){
            return res.status(404).json({
                status: 'OK', 
                code: 404, 
                message: 'Data tidak ditemukan'
            })
        }

        let todo = await prisma.toDo.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status
            }
        })

        res.status(200).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data diubah!',
            data: todo
        })
    },

    async drop(req, res) {
        const ifExist = await prisma.toDo.findFirst({
            where: {
                id: Number(req.params.id)
            }
        })
        if (!ifExist){
            return res.status(404).json({
                status: 'OK', 
                code: 404, 
                message: 'Data tidak ditemukan'
            })
        }

        let todo = await prisma.toDo.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.status(201).json({ 
            status: 'success', 
            code: 200, 
            message: 'Data dihapus!'
        })
    }

}