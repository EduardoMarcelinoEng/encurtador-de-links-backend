const express = require('express');
const router = express.Router();
const path = require('path');
const { httpPort, httpsPort } = require(path.resolve('src', 'config'));
const { Links } = require('./../../models');

const formatLink = (result)=>{
    return result.link.indexOf('http') == -1 && result.link.indexOf('http') == -1 ?
    `http://${result.link}`
    : result.link;
}

router.post('/', async (req, res)=>{
    try {

        let link = await Links.findAll({
            where: {
                link: req.body.link
            }
        });

        let shortenedLink;

        if(link){
            shortenedLink = `${req.hostname}
            ${req.protocol == 'http' 
            ? ([80, 3000].includes(httpPort) ? '' : `:${httpPort}`)
            : ''}
            /${req.baseUrl}${link.code}`;
            shortenedLink = shortenedLink.replace(/\s{1,}/g, '');
            link.short = shortenedLink;
            
            return res.status(200).json(link);
        }

        const result = await Links.create(req.body.link);
        
        shortenedLink = `${req.hostname}
            ${req.protocol == 'http' 
            ? (httpPort == 80 ? '' : `:${httpPort}`)
            : ''}
            /${req.baseUrl}${result}`;
            shortenedLink = shortenedLink.replace(/\s{1,}/g, '');

        return res.status(200).json(shortenedLink);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

router.get('/:id', async (req, res)=>{
    try {
        const result = await Links.findAll({
            where: {
                code: req.params.id
            }
        });
        if(!result) return res.status(404).json('Url não encontrada');

        Links.incrementAcess(req.params.id);

        const link = formatLink(result);
        return res.status(301).redirect(link);
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;