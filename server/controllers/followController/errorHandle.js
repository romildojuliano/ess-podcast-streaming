exports.errorHandle = (user1, user2, follow) => {

    let response = {}
    let status = 200

    if (user1 && !user1.username) {
        status = 401;
        response = {
            data: {},
            message: follow ? 'voce deve estar logado para seguir um usuario' : 'voce deve estar logado para deixar de seguir um usuario'
        }
    } else if (user2 && !user2.username) {
        status = 404;
        response = {
            data: {},
            message: 'usuario não encontrado'
        }
    } else if (user1?.username === user2?.username) {
        status = 406;
        response = {
            data: {},
            message: 'voce não pode seguir sua propria conta'
        }
    } else if (user1?.following.includes(user2?.username) && (follow===true)) {
        status = 400;
        response = {
            data: user1?.following,
            message: 'você já segue esse usuario'
        }
    } else if (!user1?.following.includes(user2?.username) && (follow===false)) {
        status = 400;
        response = {
            data: user1?.following,
            message: 'você não segue esse usuario'
        }
    }

    return {status, response}
}
