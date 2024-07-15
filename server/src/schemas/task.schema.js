const { z } = require('zod');

const createTaskSchema = z.object({
    title: z.string({
        required_error: 'Titulo es obligatorio'
    }),
    description: z.string({
        required_error: 'Descripcion es obligatoria'
    }),
    genres: z.string({
        required_error: 'Genero es obligatorio'
    })
});


module.exports = {
    createTaskSchema
}