const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');
const formidable = require('formidable');
const breeds = require('../data/breeds');
const cats = require('../data/cats');

const globalPath = path.normalize(path.join(__dirname, '../'));

module.exports = (req, res) => {
    const pathname = url.parse(req.url).pathname;

    if (pathname === '/cats/add-cat' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addCat.html')
        );

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            let catBreedPlaceholder = breeds.map((breed) => `<option value="${breed}">${breed}</option>`);
            let modifiedData = data.toString().replace('{{catBreeds}}', catBreedPlaceholder);
            res.write(modifiedData);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        })
    } else if (pathname === '/cats/add-cat' && req.method === 'POST') {
        let form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                throw err;
            }
            let oldPath = files.upload.path;
            let newPath = path.normalize(path.join(globalPath, '/content/images/' + files.upload.name));

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    throw err;
                }
                console.log('File was uploaded sucessfully!');
            });

            fs.readFile('./data/cats.json', (err, data) => {
                if (err) {
                    throw err;
                }
                let allCats = JSON.parse(data);
                allCats.push({ id: cats.length + 1, ...fields, image: files.upload.name });
                let json = JSON.stringify(allCats);
                fs.writeFile('./data/cats.json', json, () => {
                    res.writeHead(302, { Location: '/' });
                    res.end();
                });      
            });
        });
    } else if (pathname === '/cats/add-breed' && req.method === 'GET') {
        let filePath = path.normalize(
            path.join(__dirname, '../views/addBreed.html')
        );

        const index = fs.createReadStream(filePath);

        index.on('data', (data) => {
            res.write(data);
        });

        index.on('end', () => {
            res.end();
        });

        index.on('error', (err) => {
            console.log(err);
        })
    } else if (pathname === '/cats/add-breed' && req.method === 'POST') {
        let formData = '';

        req.on('data', (data) => {
            formData += data;
        });

        req.on('end', () => {
            let body = qs.parse(formData);

            fs.readFile('./data/breeds.json', (err, data) => {
                if (err) {
                    throw err;
                }

                let breeds = JSON.parse(data);
                breeds.push(body.breed);
                let json = JSON.stringify(breeds);

                fs.writeFile('./data/breeds.json', json, 'utf-8', () => {
                    console.log('The breed was added sucessfully!')
                });
            });

            res.writeHead(302, { Location: '/' });
            res.end();
        });
    } else if(pathname.includes('/cats-edit')&&req.method==='GET'){
        let filePath = path.normalize(
            path.join(__dirname, '../views/editCat.html')
        );
        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });

                res.write('404 Not found');
                res.end();
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            
            let catId= url.parse(req.url)
            .pathname
            .split('/')
            .pop();

            let currentCat=cats.filter((cat)=>cat.id==catId)[0];
            console.log(currentCat);
            console.log(data.toString());
            let modifiedData=data.toString().replace('{{id}}',catId);
            modifiedData=modifiedData.replace('{{name}}', currentCat.name);
            modifiedData=modifiedData.replace('{{description}}', currentCat.description);

            const breedAsOptions=breeds.map((b)=>`<option value="${b}">${b}</option>`);
            modifiedData=modifiedData.replace('{{catBreeds}}',breedAsOptions.join('/'));

            modifiedData=modifiedData.replace('{{breed}}', currentCat.breed);
            
            res.write(modifiedData);
            res.end();
        });
    }else if(pathname.includes('/cats-find-new-home')&&req.method==='GET'){

    } else if(pathname.includes('/cats-edit')&&req.method==='POST'){

    }else if(pathname.includes('/cats-find-new-home')&&req.method==='POST'){

    }else {
        return true;
    }
};
