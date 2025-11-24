const { Bicicleta, Compra, CompraBicicleta } = require('../models/associations')

exports.index = async (req, res, next) => {
    try {
        const compras = await Compra.findAll({
            order: [['createdAt', 'DESC']],
            raw: true
        })

        res.render('compras/index', { compras })
    } catch (error) {
        next(error)
    }
}

exports.new = async (req, res, next) => {
    try {
        const bicicletas = await Bicicleta.findAll({
            where: { disponible: true },
            order: [['marca', 'ASC']],
            raw: true
        })
        res.render('compras/new', { bicicletas })
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const seleccionados = req.body.bicicletasSeleccionadas
        if (!seleccionados){
            return res.status(400).send('Debes seleccionar al menos una bicicleta')
        }

        // Creo la compra con total 0, para que se cree mi compraId
        const compra = await Compra.create({ total: 0 })
        let total = 0

        const ids = Array.isArray(seleccionados) ? seleccionados : [seleccionados]

        for (const id of ids) {
            const bici = await Bicicleta.findByPk(id)
            if (!bici) continue
            const cantidad = parseInt(req.body[`cantidad_${id}`] || 1)
            const subtotal = bici.precio * cantidad

            await CompraBicicleta.create({
                compraId: compra.id,
                bicicletaId: bici.id,
                cantidad: cantidad,
                subtotal: subtotal
            })
            
            total += subtotal
        }

        compra.total = total.toFixed(2)

        await compra.save()

        res.redirect('/compras')
    } catch (error) {
        next(error)
    }
}

exports.show = async (req, res, next) => {
    try {
        const { id } = req.params

        const compra = await Compra.findByPk(id, {
            include: [
                {
                    model: Bicicleta,
                    through: { attributes: ['cantidad', 'subtotal'] }
                }
            ]
        })

        if (!compra) return res.status(404).send('Compra no encontrada')

        const datosCompra = compra.get({ plain: true })

        res.render('compras/show', { compra: datosCompra })
    } catch (error) {
        next(error)
    }
}
