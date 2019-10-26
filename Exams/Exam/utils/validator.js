const { body } = require('express-validator');

module.exports = [
    // body('title','Title should be at least 4 characters!')
    //     .isLength({ min: 4 })
    //     //.isAlphanumeric()
        
    // ,

    // body('description', 'Description should be at least 20 characters!')
    //     .isLength({ min: 20 })
    // //.isAlphanumeric()
    // ,
    // body('imageUrl')
    //     .custom((value) => {
    //         if (!(value.startsWith('http')||value.startsWith('https'))) { throw new Error('ImageUrl should start with  or https!') }
    //         return true;
    //     })
    //     //.isURL()
];

// module.exports = [
//     body('title','Title should be at least 4 characters!')
//         .isLength({ min: 4 })
//         //.isAlphanumeric()
        
//     ,

//     body('description', 'Description should be at least 20 characters!')
//         .isLength({ min: 20 })
//     //.isAlphanumeric()
//     ,
//     body('imageUrl')
//         .custom((value) => {
//             if (!(value.startsWith('http')||value.startsWith('https'))) { throw new Error('ImageUrl should start with  or https!') }
//             return true;
//         })
//         //.isURL()
// ];
