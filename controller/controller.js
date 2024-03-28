import userModel from "../model/userModel.js";
import bcrypt, { hash } from "bcrypt";

class Controller {
    static login_get = (req, res) => {
        console.log(req.session);
        const msg = req.session.msg;
        delete req.session.msg; 
        res.render('login.ejs', {msg});
    }

    static login_post = async (req, res) => {
        try {
            const form = req.body;
            console.log(form);

            let user = await userModel.findOne({
                email: form.email,
            })
            if (!user) {
                req.session.msg = `Dear ${form.email} it's not an existing user.`
                res.redirect("/signup");
                return;
            } 
            
            const matched = await bcrypt.compare(form.pwd, user.pwd);
            if (matched) {
                req.session.isValid = true;
                req.session.msg = `Welcome Dear ${user.name} login successfully.`
                res.redirect("/dashboard");
            } else {
                req.session.msg = `Please enter correct password Dear ${user.name}.`;
                res.redirect("/login");
            }
            
        } catch (error) {
            res.send(error);
            console.log(error);
        } 
    }

    static home_get = (req, res) => {
        res.render('home.ejs');
    }
    
    static dashboard_get = (req, res) => {
        const msg = req.session.msg;
        delete req.session.msg;
        res.render('dashboard.ejs', {msg});
    }
    
    static logout_post = (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                throw err;
            } else {
                res.redirect("/home");
            }
        })
    }

    static signup_post = async (req, res) => {
        try {
            const form = req.body;
            console.log(form);

            let user = await userModel.findOne({
                email: form.email,
            })
            const hashedPwd = await bcrypt.hash(form.pwd, 10);
        
            if (!user) {
                user = new userModel({
                    name: form.name, 
                    email: form.email, 
                    pwd: hashedPwd
                });
                const userSaved = await user.save();
                console.log(userSaved);
                req.session.msg = `signup is successfull please login dear ${user.name}`;
                res.redirect("/login");
            } else {
                req.session.msg = `${user.name} is an existing user please login in`;
                res.redirect("/login");
            }
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }

    static signup_get = (req, res) => {
        const msg = req.session.msg;
        delete req.session.msg;
        res.render('signup.ejs', {msg});
    }
}

export default Controller;