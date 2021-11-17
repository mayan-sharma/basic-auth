exports.welcome = (req, res) => {
    return res.status(200).json({
        msg: 'Welcome!'
    });
}

exports.secured = async(req, res) => {
    const userId = req.user.id;
    const user = await User.findById(userId);

    return res.status(200).json({
        msg: 'Welcome to a secured route!',
        name: user.name,
        email: user.email
    });
}