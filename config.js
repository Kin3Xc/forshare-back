// parametros de conficugración

module.exports = {
	TOKEN_SECRET: process.env.TOKEN_SECRET || "tokenultrasecreto", // para encriptar el pwd del usuario
	// FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '849b73803f11b0522565c4477917c8a1' // test face
	FACEBOOK_SECRET: process.env.FACEBOOK_SECRET || '498dd966eeea78d8211a2e9e923cc024', // production face

	JWT_SECRET: process.env.JWT_SECRET || 'tokenultrasecreto1' // para crear el token secreto
};