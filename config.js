// parametros de conficugración

module.exports = {
	JWT_SECRET: process.env.JWT_SECRET || "A1B2C3D4E5D6F7G8H9I10", // para crear el token secreto

	TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto", // para encriptar el pwd del usuario
	// FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '849b73803f11b0522565c4477917c8a1' // test face
	FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '498dd966eeea78d8211a2e9e923cc024', // production face

	twitter: {
		key: '',
		secret: ''
	},

	facebook: {
		key: '156391914708742',
		secret: '456efa562abf265fe3ed0702e965a658'
	}

};
