const models = require('../models');


function addLectureGet(req, res, next) {
    let admin = req.user;
    let id = req.params.id;

    models.courseModel.findOne({ _id: id }).populate('lectures')
        .then(course => {
            let length;
            if (!course.lectures) {
                length = 0;
            } else {
                length = course.lectures.length;
            }
            res.render('lecture-panel.hbs', { admin, course, length })
        }).catch(next)
}

async function addLecturePost(req, res, next) {
    let admin = req.user;
    let id = req.params.id;
    const { title = null, videoUrl = null } = req.body;
    try {
        const lecture = await models.lectureModel.create({ title, videoUrl, course: id });
        const courseUpdated = await models.courseModel.findByIdAndUpdate({ _id: id }, { $push: { lectures: lecture.id } })
        if (!courseUpdated) { res.redirect('/not-found'); return; }
        res.redirect(`/addLecture/${id}`);
    } catch (e) {
        next(e);
    }
}

async function deleteLecture(req, res, next) {
    let lectureId = req.params.id;
    try {
        const currentLecture=await models.lectureModel.findById(lectureId).populate('course');
        const courseUpdated = await models.courseModel.findByIdAndUpdate({ _id: currentLecture.course.id }, { $pull: { lectures: lectureId } })
        const lecture = await models.lectureModel.findByIdAndDelete(lectureId);
        res.redirect(`/addLecture/${currentLecture.course.id}`);
    } catch (e) {
        next(e);
    }
}

async function play(req,res,next){
    let lectureId = req.params.id;
    let user=req.user;
    try {
        const currentLecture=await models.lectureModel.findById(lectureId);
        const course = await models.courseModel.findOne({lectures:{$in:currentLecture }}).populate('lectures');
       res.render('playVideo.hbs',{currentLecture,course,user})
    } catch (e) {
        next(e);
    }
}

module.exports = {
    addLectureGet,
    addLecturePost,
    deleteLecture,
    play
};
