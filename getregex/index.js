var express = require("express");
const { fromBase64 } = require("pdf2pic");
const cors = require('cors')
const getRegex = require('./test.js');
const fs = require('fs');

const app = express();
app.use(cors({ origin: true }));

app.use(express.json({ limit: '500Mb' }));

const pdf2png = async (req, res, next) => {
    try{
        const params = req.body.file.split(',')[1];
        
        const options = {
            density: 200,
            saveFilename: "output",
            savePath: "./images",
            format: "png",
            width: 687,
            height: 1000,
        };
        const base64Img = await fromBase64(params, options).bulk(-1, false);
        req.imageList = base64Img.map(item => item.path);
        next(); 
    } catch (err) {
        console.log(err);
    }
};

app.post('/api/getDoc', pdf2png, (req, res) => {
    try{
        const imageList = req.imageList;
        let result = [];
        imageList.forEach((item) => {
            const tmp = getRegex(item);
            if(tmp) {
                result = result.concat(tmp);
            }
            console.log(result);
        })
        result = result.map((item) => item.replace('\n', ' '))
        if(result) {
            console.log(result);
            result = result.filter((element) =>  /[a-zA-Z]/.test(element));
        };
        result = new Set(result);
        res.send({
            "result": [...result]
        });
        imageList.forEach((item) => {
            fs.unlink(item, (err) => {
                if (err) throw err;
                console.log(`File ${item} deleted!`);
            });})
        console.log("Done");
    } catch (err) {
        res.send(err);
    }
})



app.listen(8888, function () { 
    console.log('App listening on port 8888!'); 
});