const { Review, Bicicleta } = require('../models/associations')

exports.new = async (req, res, next) => {
    try {
        const { bicicletaId } = req.query
        res.render('reviews/new', { bicicletaId })
    } catch (error) {
        next(error)
    }
}

exports.create = async (req, res, next) => {
    try {
        const { comentario, calificacion, bicicletaId } = req.body
        if (!comentario || !calificacion || !bicicletaId) {
            return res.status(400).send('Faltan campos obligatorios')
        }

        const review = await Review.create({
            comentario,
            calificacion: parseInt(calificacion),
            bicicletaId: parseInt(bicicletaId)
        })

        console.log('Review creado exitosamente: ', review)
        const msg = encodeURIComponent('Review creado exitosamente')
        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.edit = async (req, res, next) => {
    try {
        const reviewInstance = await Review.findByPk(req.params.id)
        if (!reviewInstance) return res.status(400).send('Review no encontrada')

        const review = reviewInstance.get({ plain: true })

        res.render('reviews/edit', { review })
    } catch (error) {
        next(error)
    }
}

exports.update = async (req, res, next) => {
    try {
        const { id } = req.params
        const { comentario, calificacion, bicicletaId } = req.body

        const review = await Review.update({
            comentario,
            calificacion: parseInt(calificacion),
            bicicletaId: parseInt(bicicletaId)
        }, { where: { id } })

        console.log('Review actualizado exitosamente: ', review)
        const msg = encodeURIComponent('Review actualizado exitosamente')
        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}

exports.delete = async (req, res, next) => {
    try {
        const review = await Review.findByPk(req.params.id)
        if (!review) return res.status(404).send('Reseña no encontrada')

        const bicicletaId = review.bicicletaId

        await review.destroy()

        console.log('Review eliminado exitosamente: ', review)
        const msg = encodeURIComponent('Review eliminado exitosamente')
        res.redirect(`/bicicletas/${bicicletaId}?success=${msg}`)
    } catch (error) {
        next(error)
    }
}