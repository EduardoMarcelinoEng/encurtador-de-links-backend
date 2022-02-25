const database = require('./../../database');
const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const generateCode = ()=>{
    const max = alphabet.length - 1;
    const min = 0;
    let code = '';

    for(let i = 0; i < 5; i++){
        let position = Math.random() * (max - min) + min;
        code += alphabet.charAt(position);
    }

    return code;
}

module.exports = {
    create: async (link)=>{
        let code;
        do {
            code = generateCode();
        } while(await new Promise((resolve, reject)=>{
            database.findOne({code}).exec((err, data)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }));
        database.insert({link, code, numberAccess: 0, expirationDate: Date.now() + 86400000});
        return code;
    },
    findAll: async ({where})=>{

        const result = await new Promise((resolve, reject)=>{
            database.findOne(where).exec((err, data)=>{
                if(err){
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
        return result;
    },
    incrementAcess: async (code)=>{
        await database.update({ code }, 
            {
                $inc: {
                    numberAccess: 1
                }
            }
        )
    },
    destroy: async ({where})=>{
        await database.remove(where);
    }
}