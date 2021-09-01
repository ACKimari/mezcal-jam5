const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", async (req, res) => {
    try { res.render("homepage"); }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/directory', async (req, res) => {
    if (req.isAuthenticated()) {
        try {
            const teacherData = await db.Teacher.findAll()
            const teacherSend = teacherData.map((teacher) => teacher.get({ plain: true }));
            console.log(teacherSend)
            res.render('directory', { teacherSend });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
        res.redirect('/login')
    }
});

router.get("/teacher-profile/:id", async (req, res) => {
    try {
        const teacherData = await db.Teacher.findByPk(req.params.id)
        const teacherSend = teacherData.dataValues
        res.render('teacher-profile', teacherSend);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/account", async (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user
        db.User.findByPk(req.user.id, { include: [db.Teacher] })
            .then(userData => {
                let teacherData = userData.Teachers
                res.render('user-account', { user, teacherData })
            }).catch(err => {
                console.log(err);
            })
    }else {
        res.redirect('/login')
    }
});

router.get("/login", (req, res) => {
    res.render("user-login");
})

router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/")
})

router.get("/newteacher", (req, res) => {
    res.render("new-teacher");
})


module.exports = router;