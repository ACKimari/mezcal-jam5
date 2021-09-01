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
            const quoteData = await db.Quote.findAll()
            const quoteSend = quoteData.map((quote) => quote.get({ plain: true }));
            console.log(quoteSend)
            res.render('directory', { quoteSend });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    } else {
        res.redirect('/login')
    }
});

router.get("/quote-profile/:id", async (req, res) => {
    try {
        const quoteData = await db.Quote.findByPk(req.params.id)
        const quoteSend = quoteData.dataValues
        res.render('teacher-profile', quoteSend);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/account", async (req, res) => {
    if (req.isAuthenticated()) {
        let user = req.user
        db.User.findByPk(req.user.id, { include: [db.Quote] })
            .then(userData => {
                let quoteData = userData.Quoutes
                res.render('user-account', { user, quoteData })
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

router.get("/newquote", (req, res) => {
    res.render("new-quote");
})


module.exports = router;