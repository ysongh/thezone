const Job = require("../models/job");
const Education = require("../models/education");
const Apartment = require("../models/apartment");
const Comment = require("../models/comment");

let middlewareObj = {};

middlewareObj.checkJobOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Job.findById(req.params.id, function(err, foundJob){
            if(err || !foundJob){
                req.flash("error", "Job not found");
                res.redirect("back");
            }
            else{
                if(foundJob.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Permission Required");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
};

middlewareObj.checkEducationOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Education.findById(req.params.id, function(err, foundEducation){
            if(err || !foundEducation){
                req.flash("error", "Education not found");
                res.redirect("back");
            }
            else{
                if(foundEducation.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Permission Required");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
};

middlewareObj.checkApartmentOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Apartment.findById(req.params.id, function(err, foundApartment){
            if(err || !foundApartment){
                req.flash("error", "Apartment not found");
                res.redirect("back");
            }
            else{
                if(foundApartment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Permission Required");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Permission Required");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "Please Login First");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/login");
};

middlewareObj.alreadyLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        req.flash("error", "You are already Logged In");
        return res.redirect("/");
    }
    return next();
};

middlewareObj.checkJobRatingExists = function(req, res, next){
    Job.findById(req.params.id).populate("ratings").exec(function(err, job){
        if(err){
          console.log(err);
        }
        for(let i = 0; i < job.ratings.length; i++ ) {
            if(job.ratings[i].author.id.equals(req.user._id)) {
                req.flash("error", "You already liked this!");
                return res.redirect('/jobs/' + job._id);
            }
        }
        next();
    });
};

middlewareObj.checkEducationRatingExists = function(req, res, next){
    Education.findById(req.params.id).populate("ratings").exec(function(err, education){
        if(err){
          console.log(err);
        }
        for(let i = 0; i < education.ratings.length; i++ ) {
            if(education.ratings[i].author.id.equals(req.user._id)) {
                req.flash("error", "You already liked this!");
                return res.redirect('/education/' + education._id);
            }
        }
        next();
    });
};

module.exports = middlewareObj;