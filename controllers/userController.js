const User = require('./../models/userModel');
const bcrypt = require('bcryptjs');

exports.add = async (req, res) => {
    try {
        const userNew = await User.create(req.body);
        res.status(200).json({ 
            status: 'success', 
            user: userNew
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'fail', 
            message: error.message
        });
    }
}

exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({  
            status: 'success', 
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'fail', 
            message: error.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({  
            status: 'success', 
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'fail', 
            message: error.message
        });
    }
}

exports.getAll = async (req, res) => {
    try {
        const page = req.query.page * 1 || 1;
        const limit = 5;
        const skip = (page - 1) * limit;
        let query = User.find().skip(skip).limit(limit);
        const countDocuments = await User.countDocuments();
        const countPage = Math.ceil(countDocuments / limit);

        console.log(countPage, page);
        const users = await query;
        res.render('index', {
            users,
            currentPage: page,
            countPage,
            skip
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'fail', 
            message: error.message
        });
    }
} 

exports.signup = (req, res) => {
    res.render('signup', { title: 'Signup' })
}

exports.login = (req, res) => {
    res.render('login', { title: 'Login' })
}

exports.checkAccount = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email});
        const hasPassword = user.password;
        const checkDecoding = await bcrypt.compare(password, hasPassword)
        if(!checkDecoding) throw new Error(`error check decoding password`);
        res.status(200).json({ 
            status: 'success', 
            user
        });
    } catch (error) {
        res.status(400).json({ 
            status: 'fail', 
            message: error.message
        });
    }
}