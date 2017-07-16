/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
    sing: (req,res) => {
        res.view();
    },
    create: (req,res) => {
        let user = {
            username : req.param('username'),
            password : req.param('password'),
            email : req.param('email')
        };
        User.create(user,(err,user) => {
            if(err){
                req.session.flash = {
                    err : err
                };
                return res.redirect('user/sing');
            }
            return res.redirect('user/show/'+user.id)
        });
    },
    show: (req,res,next) => {
        User.findOne(req.param('id'),(err,user) => {
            if(err)
                return next(err);
            res.view({
                user: user
            });
        });
    },
    edit: (req,res,next) => {
        User.findOne(req.param('id'),(err,user) => {
            if(err)
                return next(err);
            res.view({
                user: user
            });
        });
    },
    update: (req,res,next) => {
        let userObj = {
            username : req.param('username'),
            password : req.param('password'),
            email : req.param('email')
        };
        User.update(req.param('id'), userObj, (err,user) => {
            if(err){
                return res.redirect('user/edit/'+req.param('id'));
            }
            return res.redirect('user/show/'+req.param('id'))
        });
    },
    index: (req,res,next) => {
        User.find((err,users) => {
            if(err){
                return next(err);
            }
            res.view({
                users: users
            });
        });
    },
    destroy: (req,res,next) => {
        User.destroy(req.param('id'),(err) => {
            if(err){
                return next(err);
            }
            res.redirect('/user/index');
        });
    }
};

