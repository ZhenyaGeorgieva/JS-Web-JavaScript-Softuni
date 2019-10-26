const models = require('../models');
const { validationResult } = require('express-validator');



module.exports = {

}


// function index(req, res, next) {
//     const user = req.user;
//     if (!user) {
//         models.courseModel.find({ isPublic: true }).populate('users')
//             .then(courses => {
//                 courses = courses.sort((a, b) => b.users.length - a.users.length).slice(0, 3);
//                 res.render('index.hbs', { courses })
//             }).catch(next);
//     } else {
//         models.courseModel.find({ isPublic: true })
//             .then(courses => {
//                 courses = courses.sort((a, b) => b.createdAt - a.createdAt);
//                 res.render('index.hbs', { user, courses })
//             }).catch(next);
//     }
// }

// function getCreate(req, res) {
//     let user = req.user;
//     res.render('create.hbs', { user })
// }

// function postCreate(req, res, next) {
//     const user = req.user;
//     const { title = null, description = null, imageUrl = null } = req.body;
//     let isPublic;

//     if (req.body.isPublic == "on") {
//         isPublic = true;
//     } else {
//         isPublic = false;
//     }
//     let creatorId = user.id;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.render('create.hbs', {
//             message: errors.array()[0].msg,
//             oldInput: req.body,
//             user
//         })
//     }
//     models.courseModel.create({ title, description, imageUrl, creatorId, isPublic }).then(course => {
//         res.redirect('/')
//     }).catch(err => {
//         if (err.name === 'MongoError' && err.code === 11000) {
//             res.render('create.hbs', {
//                 errors: {
//                     titleTaken: 'There is already a course with the same title!'
//                 },
//                 user
//             });
//             return;
//         }
//         next(err);
//     });
// }

// async function getDetails(req, res, next) {
//     const user = req.user;
//     const courseId = req.params.id;

//     try {
//         let course = await models.courseModel.findById(courseId).populate('creatorId')
//         if (course.creatorId.id == user.id) {
//             const creator = true;
//             res.render('details.hbs', { user, creator, course });
//             return;
//         }
//         let courseEnrolled = await models.courseModel.findOne({ _id: courseId, users: { $in: user.id } });
//         if (courseEnrolled) {
//             course = courseEnrolled
//             let enrolled = true;
//             res.render('details.hbs', { user, course, enrolled });
//             return;
//         }

//         let courseNotEnrolled = await models.courseModel.findOne({ _id: courseId, users: { $nin: user.id } });
//         if (courseNotEnrolled) {
//             course = courseNotEnrolled
//             res.render('details.hbs', { user, course });
//             return;
//         }
//     } catch (e) {
//         next(e)
//     }
// }

// function enroll(req, res, next) {
//     const user = req.user;
//     const courseId = req.params.id;
//     Promise.all([
//         models.userModel.findOneAndUpdate({ _id: user.id }, { $addToSet: { courses: courseId } }),
//         models.courseModel.findOneAndUpdate({ _id: courseId }, { $addToSet: { users: user.id } })
//     ]).then(([user, course]) => {
//         res.redirect(`/details/${course.id}`)
//     }).catch(next)
// }

// function deleteCourse(req, res, next) {
//     const user = req.user;
//     const courseId = req.params.id;

//     Promise.all([
//         models.userModel.updateMany({ courses: { $in: courseId } }, { $pull: { courses: courseId } }),
//         models.courseModel.findOneAndDelete({ _id: courseId })
//     ]).then(() => {
//         res.redirect('/')
//     }).catch(next)
// }

// function getEdit(req, res, next) {
//     const user = req.user;
//     const courseId = req.params.id;

//     models.courseModel.findOne({ _id: courseId })
//         .then(course => {
//             res.render('edit.hbs', { user, course })
//         }).catch(next)
// }

// async function postEdit(req, res, next) {
//     const user = req.user;
//     const { title = null, description = null, imageUrl = null } = req.body;
//     let creatorId = user.id;
//     let courseId = req.params.id;

//     const errors = validationResult(req);
//     try {
//         if (!errors.isEmpty()) {
//             let course = await models.courseModel.findOne({ _id: courseId });
//             res.render('edit.hbs', {
//                 message: errors.array()[0].msg,
//                 course,
//                 user
//             })
//             return;
//         } else {
//             let isPublic = false;
//             if (req.body.isPublic == 'on') {
//                 isPublic = true;
//             }
//             let course = await models.courseModel.findOneAndUpdate({ _id: courseId }, { title, description, imageUrl, isPublic });
//             res.redirect('/');
//             return;
//         }
//     } catch (err) {
//         if (err.name === 'MongoError' && err.code === 11000) {
//             let course = await models.courseModel.findOne({ _id: courseId });
//             res.render('edit.hbs', {
//                 errors: {
//                     titleTaken: 'There is already a course with the same title!'
//                 },
//                 user,
//                 course
//             });
//             return;
//         }
//         next(err);
//     }
// }

//ARTICLES 
// function index(req, res, next) {
//     const user = req.user;
//     if (!user) {
//         models.articleModel.find()
//             .then(articles => {
//                 articles = articles.sort((a, b) => b.creationDate - a.creationDate).slice(0, 3);
//                 for (const article of articles) {
//                     let currentContent = article.description;
//                     article.description = currentContent.substr(0, 500);
//                 }
//                 res.render('index.hbs', { articles })
//             }).catch(next);
//     } else {
//         models.articleModel.find()
//             .then(articles => {
//                 articles = articles.sort((a, b) => b.creationDate - a.creationDate).slice(0, 3);
//                 for (const article of articles) {
//                     let currentContent = article.description;
//                     article.description = currentContent.substr(0, 500);
//                 }
//                 res.render('index.hbs', { articles, user })
//             }).catch(next);
//     }
// }

// function getCreate(req, res) {
//     let user = req.user;
//     res.render('create.hbs', { user })
// }

// async function postCreate(req, res, next) {
//     const user = req.user;
//     const { title = null, description = null } = req.body;
//     const articleAuthor = user;

//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.render('create.hbs', {
//                 message: errors.array()[0].msg,
//                 oldInput: req.body,
//                 user
//             })
//         }
//         let article =await models.articleModel.create({ title, description, articleAuthor });
//         let userUpdated = await models.userModel.findOneAndUpdate({ _id: user.id }, { $push: { articles: article.id } });
//         res.redirect('/');
//     } catch (e) {
//         next(e)
//     }


// }

// function viewAll(req, res, next) {
//     const user = req.user;
//     if (!user) {
//         models.articleModel.find()
//             .then(articles => {
//                 res.render('viewAll.hbs', { articles })
//             }).catch(next);
//     } else {
//         models.articleModel.find()
//             .then(articles => {
//                 res.render('viewAll.hbs', { articles, user })
//             }).catch(next);
//     }
// }

// function showDetails(req, res, next) {
//     const user = req.user;
//     const articleId = req.params.id;
//     if (!user) {
//         models.articleModel.findOne({ _id: articleId })
//             .then(article => {
//                 res.render('article.hbs', { article })
//             }).catch(next);
//     } else {
//         models.articleModel.findOne({ _id: articleId }).populate('articleAuthor')
//             .then(article => {
//                 if (article.articleAuthor.id == user.id) {
//                     let creator = true;
//                     res.render('article.hbs', { article, user, creator });
//                     return;
//                 } else {
//                     res.render('article.hbs', { article, user });
//                     return;
//                 }
//             }).catch(next);
//     }
// }

// function getEdit(req, res, next) {
//     const user = req.user;
//     const articleId = req.params.id;

//     models.articleModel.findOne({ _id: articleId })
//         .then(article => {
//             res.render('edit.hbs', { user, article })
//         }).catch(next)
// }

// async function postEdit(req, res, next) {
//     const user = req.user;
//     const { title = null, description = null } = req.body;
//     let creatorId = user.id;
//     let articleId = req.params.id;

//     const errors = validationResult(req);
//     try {
//         if (!errors.isEmpty()) {
//             let article = await models.articleModel.findOne({ _id: articleId });
//             res.render('edit.hbs', {
//                 message: errors.array()[0].msg,
//                 article,
//                 user
//             })
//             return;
//         } else {
//             let article = await models.articleModel.findOneAndUpdate({ _id: articleId }, { title, description });
//             res.redirect('/');
//             return;
//         }
//     } catch (e) {
//         next(e)
//     }
// }

// function deleteArticle(req, res, next) {
//     const user = req.user;
//     const articleId = req.params.id;

//     Promise.all([
//         models.userModel.updateMany({ articles: { $in: articleId } }, { $pull: { articles: articleId } }),
//         models.articleModel.findOneAndDelete({ _id: articleId })
//     ]).then(() => {
//         res.redirect('/')
//     }).catch(next)
// }


//CUBES
// function index(req, res, next) {
//     const user = req.user;
//     if (!user) {
//         models.cubeModel.find()
//             .then(cubes => {
//                 res.render('index.hbs', { cubes })
//             }).catch(next);
//     } else {
//         models.cubeModel.find()
//             .then(cubes => {
//                 res.render('index.hbs', { user, cubes })
//             }).catch(next);
//     }
// }

// function about(req, res, next) {
//     const user = req.user;
//     if (!user) {
//         res.render('about.hbs');
//     } else {
//         res.render('about.hbs', { user });
//     }
// }

// function getCreate(req, res) {
//     let user = req.user;
//     res.render('create.hbs', { user })
// }

// function postCreate(req, res,next) {
//     const user = req.user;
//     const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;
//     let creatorId = user.id;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.render('create.hbs', {
//             message: errors.array()[0].msg,
//             oldInput: req.body,
//             user
//         })
//     }
//     models.cubeModel.create({ name, description, imageUrl, difficultyLevel, creatorId }).then(cube => {
//         res.redirect('/')
//     }).catch(next)
// }

// function getDetails(req, res, next) {
//     const user = req.user;
//     const cubeId = req.params.id;
//     if (!user) {
//         models.cubeModel.findById(cubeId).populate('accessories').populate('creatorId')
//             .then(cube => {
//                 res.render('details.hbs', { user, cube });
//             }).catch(next);
//     } else {
//         models.cubeModel.findById(cubeId).populate('accessories').populate('creatorId')
//             .then(cube => {
//                 if (cube.creatorId.id == user.id) {
//                     const creator = true;
//                     res.render('details.hbs', { user, creator, cube });
//                 } else {
//                     res.render('details.hbs', { user, cube });
//                 }
//             }).catch(next);
//     }
// }

// function getEdit(req, res, next) {
//     const user = req.user;
//     const cubeId = req.params.id;

//     models.cubeModel.findOne({ _id: cubeId })
//         .then(cube => {
//             const options = [
//                 { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
//                 { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
//                 { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
//                 { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
//                 { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
//                 { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 }
//             ];
//             res.render('editCube.hbs', { user, cube, options })
//         }).catch(next)
// }

// function postEdit(req, res,next) {
//     const user = req.user;
//     const cubeId = req.params.id;
//     const { name = null, description = null, imageUrl = null, difficultyLevel = null } = req.body;

//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         models.cubeModel.findOne({ _id: cubeId })
//             .then(cube => {
//                 const options = [
//                     { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
//                     { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
//                     { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
//                     { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
//                     { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
//                     { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 }
//                 ];
//                 res.render('editCube.hbs', {
//                     message: errors.array()[0].msg,
//                     cube,
//                     user,
//                     options
//                 })
//             }).catch(next)
//         return;
//     }
//     models.cubeModel.findOneAndUpdate({ _id: cubeId }, { name, description, imageUrl, difficultyLevel })
//         .then(cube => {
//             res.redirect('/')
//         }).catch(next)
// }

// function getDelete(req, res, next) {
//     let user = req.user;
//     let cubeId = req.params.id;
//     models.cubeModel.findOne({ _id: cubeId })
//         .then(cube => {
//             const options = [
//                 { title: '1 - Very Easy', selected: 1 === cube.difficultyLevel, value: 1 },
//                 { title: '2 - Easy', selected: 2 === cube.difficultyLevel, value: 2 },
//                 { title: '3 - Medium (Standard 3x3)', selected: 3 === cube.difficultyLevel, value: 3 },
//                 { title: '4 - Intermediate', selected: 4 === cube.difficultyLevel, value: 4 },
//                 { title: '5 - Expert', selected: 5 === cube.difficultyLevel, value: 5 },
//                 { title: '6 - Hardcore', selected: 6 === cube.difficultyLevel, value: 6 }
//             ];
//             res.render('deleteCube.hbs', { user, cube, options })
//         }).catch(next)
// }

// function postDelete(req, res, next) {
//     const user = req.user;
//     const cubeId = req.params.id;

//     Promise.all([
//         models.accessoryModel.updateMany({ cubes: { $in: cubeId } }, { $pull: { cubes: cubeId } }),
//         models.cubeModel.findOneAndDelete({ _id: cubeId })
//     ]).then(() => {
//         res.redirect('/')
//     }).catch(next)
// }