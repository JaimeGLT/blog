const { z } = require('zod');

const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre de usuario es obligatorio'
    }).min(4, {
        message: 'Nombre de usuario deberia tener un mínimo de 4 carácteres'
    }).max(15, {
        message: 'El username no puede tener mas de 15 caracteres'
    }),
    email: z.string({
        required_error: 'Correo electrónico es obligatorio'
    }).email({
        message: 'El correo electronico deberia seguir este ejemplo: exameplo123@example.com'
    }),
    password: z.string({
        required_error: 'Contraseña es obligatoria'
    }).min(4, {
        message: 'La contraseña deberia tener un minimo de 4 caracteres'
    })
});

const loginSchema = z.object({
    email: z.string({
        required_error: 'Correo electrónico es obligatorio'
    }).email({
        message: 'El correo electronico deberia seguir este ejemplo: exameplo123@example.com'
    }),
    password: z.string({
        required_error: 'Contraseña es obligatoria'
    }).min(4, {
        message: 'La contraseña deberia tener un minimo de 4 caracteres'
    })
});

const sendEmailSchema = z.object({
    email: z.string({
        required_error: 'Correo electrónico es obligatorio'
    }).email({
        message: 'El correo electronico deberia seguir este ejemplo: exameplo123@example.com'
    })
});

const validatePassword = z.object({
    newPassword: z.string({
        required_error: 'La contraseña es obligatoria'
    }).min(4, {
        message: 'La contraseña deberia tener un mínimo de 4 caracteres'
    }),
    confirmNewPassword: z.string({
        required_error: 'La confirmacion de contraseña es obligatorio'
    }).min(4, {
        message: 'La confirmacion de contraseña deberia ser igual a la nueva contraseña'
    })
})

const putPasswordSchema = z.object({
    newPassword: z.string({
        required_error: 'La nueva contraseña es obligatoria'
    }).min(4, {
        message: 'Nueva contraseña no puede ser menor a 4 caracteres'
    }),
    confirmNewPassword: z.string({
        required_error: 'Confirmacion de contraseña es obligatoria'
    }).min(4, {
        message: 'Confirmacion de contraseña debe ser igual a la nueva'
    })
});

const putUsernameSchema = z.object({
    username: z.string({
        required_error: 'El nombre de usuario es obligatorio'
    }).min(4, {
        message: 'Nombre de usuario no puede ser menor a 4 caracteres'
    })
})

module.exports = {
    registerSchema,
    loginSchema,
    sendEmailSchema,
    validatePassword,
    putPasswordSchema,
    putUsernameSchema
}