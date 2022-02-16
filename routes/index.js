"use strict"
const express = require("express");
const { body, validationResult } = require("express-validator");
const res = require("express/lib/response");
const async = require("hbs/lib/async");
const router = express.Router();
const nodemailer = require("nodemailer");

/* GET */
router.get("/", (req, res) => {
    res.render("index")
});
/* POST */


router.post("/", [
    body("nombre", "debe ingresar su  nombre").exists().isLength({ min: 2 }),
    body("apellido", "debe ingresar su  apellido").exists().isLength({ min: 2 }),
    body("email", "debe ingresar un email valido").exists().isEmail(),
    body("message", "su mensaje debe contener entre 10 y 300 caracteres").exists().isLength({ min: 10, max: 300 }),
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const formData = req.body;
        const arrWarnings = errors.array();
        /*  resp.status(400).json({ errors: errors.array() }); */
        res.render("index", { arrWarnings, formData });


    }

    const emailMsg = {
        to: "atencioncliente@empresa.com",
        from: req.body.email,
        subject: "Mensaje dede formulario de contact",
        html: `${req.body.apellido}  ${req.body.nombre} envio el siguiente mensaje ${req.body.message}`


    }

    const transport = nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });

    transport.sendMail(emailMsg)
        /*  res.render("index", { message: "mesnaje enviado" }); */
})


module.exports = router;