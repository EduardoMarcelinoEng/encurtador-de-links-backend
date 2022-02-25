const { Links } = require('./../models');

const deleteLinksExpired = ()=>{
    Links.destroy({
        where: {
            expirationDate: { $lte : Date.now() }
        }
    });
}

deleteLinksExpired();

setInterval(()=>{
    deleteLinksExpired();
}, 86400000);