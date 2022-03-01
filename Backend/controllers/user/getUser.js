const getDB = require('../../database/getDB');

const getUser = async (req, res, next) => {

    let connection;

    try {
        connection = await getDB();

        const { iduser } = req.params;
        const idReqUser = req.userAuth.id;
        let user;

        if (!isNaN([iduser])) {
            [user] = await connection.query(`
        SELECT id , name_user , lastname, lastname2, bio, address, email, password, avatar, birthdate, createDate, modifyDate FROM user WHERE id = ?
        `,
                [iduser]
            );

        }
        else {
            [user] = await connection.query(`
        SELECT id , name_user , lastname, lastname2, bio, address, email, password, avatar, birthdate, createDate, modifyDate FROM user WHERE email = ?
        `,
                [iduser]
            );



        }


        // objeto información genérica usuario(para que lo vea otro usuario)

        const userInfo = {
            username: user[0].name_user,
            avatar: user[0].avatar,
        };

        // Si el usuario es el dueño de los datos.
        if (user[0].id === idReqUser) {

            userInfo.name_user = user[0].name_user;
            userInfo.lastname = user[0].lastname;
            userInfo.bio = user[0].bio;
            userInfo.address = user[0].address;
            userInfo.email = user[0].email;
            userInfo.password = user[0].password;
            userInfo.avatar = user[0].avatar;
            userInfo.birthdate = user[0].birthdate;
            userInfo.createDate = user[0].createDate;
            userInfo.modifyDate = user[0].modifyDate;

        }

        res.send({
            status: 'ok',
            data: {
                userInfo,
            },

        });

    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser; 