module.exports = app => {
    app.post('/signup', app.api.user.save)
}