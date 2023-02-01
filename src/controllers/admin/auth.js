const User = require('../../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email }).exec(async (error, user) => {

        if (user) return res.status(400).json({
            message: "Admin already registered"
        });
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;

        const hash_password = await bcrypt.hash(password, 10);

        const _user = new User({
            firstName,
            lastName,
            email,
            hash_password,
            userName: shortid.generate(),
            role: 'admin'
        });


        console.log(_user)

        _user.save((error, data) => {
            // delete req.body._id;
            if (error) {
                return res.status(400).json({
                    message: "Something went wrong"
                });
            }
            if (data) {
                return res.status(201).json({
                    message: "Admin Created Successfully"
                });
            }
        });
    })
}

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((error, user) => {
            if (error) return res.status(400).json({ error });
            if (user) {
                if (user.authenticate(req.body.password) && user.role === 'admin') {
                    //*1
                    // const { _id, firstName, lastName, email, role, fullName } = user;
                    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    // res.send(200).json({
                    //     token,
                    //     user: { _id, firstName, lastName, email, role, fullName }
                    // });
                    // res.status(200).json({ message: 'Admin Signed In Sucessfully' })
                    const token = jwt.sign(
                        { _id: user._id, role: user.role },
                        process.env.JWT_SECRET,
                        { expiresIn: "1d" }
                    );
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.cookie("token", token, { expiresIn: "1d" });
                    res.status(200).json({
                        token,
                        user: { _id, firstName, lastName, email, role, fullName },
                    });
                }
                else {
                    return res.status(400).json({
                        message: 'Invalid Password'
                    });
                }
            }
            else {
                return res.status(400).json({ message: "Please first SignUp." });
            }
        })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'Signout successfully...!'
    })
}


















////////////////////////////////////////////////////////////////////////////////////////
// *1 : will create a token and assign to user , so whenever user send us a req, we can
// verify it from the backend.


// const createUser = async ({
//     firstName,
//     lastName,
//     email,
//     password,
//     userName
// }) => {
//     const user = await User.create({
//         firstName,
//         lastName,
//         email,
//         password,
//         userName
//     }).then(({
//         firstName,
//         lastName,
//         email,
//         password,
//         userName
//     }) => {
//         console.log(user)
//     }
//     )
//     user.save();
// }

//// var _user = new User({
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     userName: Math.random().toString()
        // })
        // var _user = User.create({
        //     firstName,
        //     lastName,
        //     email,
        //     password,
        //     userName: Math.random().toString()
        // }).then((user) => {
        //     console.log('User created Successfully.')
        // })

//// _user.save().then(item => {
        //     res.send("item saved to database");
        // })
        //     .catch(err => {
        //         res.status(400).send("unable to save to database");
        //     })        