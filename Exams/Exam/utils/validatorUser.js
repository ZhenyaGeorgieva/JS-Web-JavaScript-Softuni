const { body } = require('express-validator');

module.exports = [
    // body('username', 'Username should be at least 5 characters and consist only of English letters and digits')
    //     .isLength({ min: 5 })
    //     .isAlphanumeric()
    //     //.isEmail()
    // ,
    // body('password', 'Password should be at least 5 characters and consist only of English letters and digits')
    //     .isLength({ min: 5 })
    //     .isAlphanumeric()
];


// module.exports = [
//     body('username', 'Username should be at least 5 characters and consist only of English letters and digits')
//         .isLength({ min: 5 })
//         .isAlphanumeric()
//         //.isEmail()
//     ,
//     body('password', 'Password should be at least 5 characters and consist only of English letters and digits')
//         .isLength({ min: 5 })
//         .isAlphanumeric()
// ];
