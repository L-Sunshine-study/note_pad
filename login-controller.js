const dbConfig = require('./knexfile')['development']
const knex = require('knex')(dbConfig)

const verifyPassword = async(ctx) =>{
    ctx.set('Access-Control-Allow-Origin', '*')
    const id = ctx.request.body.id
    const password = ctx.request.body.password

    const realId = await knex('login')
    .select('password')
    .where('id',id)

    let tor = 0

    if(realId.length != 0){
        console.log(realId)
        if(password == realId[0].password){
            tor = 1
        }
    }

    ctx.body = {
        code:200,
        msg:tor
    }
}

module.exports = {
    verifyPassword
}