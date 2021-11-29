const dbConfig = require('./knexfile')['development']
const knex = require('knex')(dbConfig)

const getAllTodo = async (ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let id = ctx.request.query.usrid
    console.log(id)
    const res = await knex('todo_things')
    .select('*')
    .where('usrid',id)
    console.log(res)

    ctx.body = {
        code: 200,
        msg: res
    }
}

const insertTodo = async (ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*')

    const res = await knex('todo_things')
    .select('thid')
    .orderBy('thid','desc')
    .limit(1)
    console.log(res)

    const thid = res[0].thid+1
    const usrid = ctx.request.body.usrid
    const title = ctx.request.body.title
    const type = ctx.request.body.type
    const date = ctx.request.body.date
    const repeate = ctx.request.body.repeate
    await knex('todo_things').insert({
        "thid": thid,
        "usrid": usrid,
        "title": title,
        "type": type,
        "date": date,
        "repeate": repeate,
    })

    ctx.body = {
        code: 200,
        msg: true
    }
}

const delete_todo = async(ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    const id = ctx.request.body.thid

    const TOF = await knex('todo_things')
    .where('thid' , id)
    .select('*')

    await knex('todo_things')
    .where('thid', id)
    .delete()

    ctx.body = {
        code:200,
        msg:TOF.length != 0 ? true:false
    }
}

const update_todo = async(ctx) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    let thid = ctx.request.body.thid
    let usrid = ctx.request.body.usrid
    let title = ctx.request.body.title
    let type = ctx.request.body.type
    let date = ctx.request.body.date
    let repeate = ctx.request.body.repeate

    const TOF = await knex('todo_things')
    .where('thid' , thid)
    .select('*')

    await knex('todo_things')
    .where('thid',thid)
    .update({
        thid:thid,
        usrid:usrid,
        title:title,
        type:type,
        date:date,
        repeate:repeate
    })

    ctx.body = {
        code:200,
        msg: TOF.length != 0 ? true:false
    }

}

module.exports = {
    getAllTodo,
    insertTodo,
    delete_todo,
    update_todo
}

