const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const { authUser } = require('../app/controller/api/v1/auth');
const prisma = new PrismaClient();

passport.serializeUser((user,done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    done(null, await prisma.user.findUnique({ where: { id }}));
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, authUser));

module.exports = passport;