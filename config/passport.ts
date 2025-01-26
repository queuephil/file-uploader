import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GitHubStrategy } from 'passport-github2'
import bcrypt from 'bcryptjs'
import queriesAuth from '../prisma/queriesAuth'
import dotenv from 'dotenv'

dotenv.config()

// Serialize and Deserialize User
passport.serializeUser((user: any, done: Function) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: number, done: Function) => {
  try {
    const user = await queriesAuth.getUserById(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

// Local Strategy
passport.use(
  new LocalStrategy(
    async (username: string, password: string, done: Function) => {
      try {
        const user = await queriesAuth.getUserByUsername(username)
        if (!user) {
          return done(null, false, { message: 'Incorrect username' })
        }
        const match = await bcrypt.compare(password, user.password || '')
        if (!match) {
          return done(null, false, { message: 'Incorrect password' })
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.ORIGIN}/auth/google/callback`,
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        let user = await queriesAuth.getUserByGoogleId(profile.id)
        if (!user) {
          user = await queriesAuth.getUserByUsername(profile.emails[0].value)
          if (user) {
            user = await queriesAuth.updateUserWithGoogleId(user.id, profile.id)
          } else {
            user = await queriesAuth.createUserWithGoogle(profile)
          }
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: `${process.env.ORIGIN}/auth/facebook/callback`,
      profileFields: ['id', 'emails', 'name'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        let user = await queriesAuth.getUserByFacebookId(profile.id)
        if (!user) {
          user = await queriesAuth.getUserByUsername(profile.emails[0].value)
          if (user) {
            user = await queriesAuth.updateUserWithFacebookId(
              user.id,
              profile.id
            )
          } else {
            user = await queriesAuth.createUserWithFacebook(profile)
          }
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: `${process.env.ORIGIN}/auth/github/callback`,
      scope: ['user:email'],
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: Function
    ) => {
      try {
        let user = await queriesAuth.getUserByGitHubId(profile.id)
        if (!user) {
          user = await queriesAuth.getUserByUsername(profile.emails[0].value)
          if (user) {
            user = await queriesAuth.updateUserWithGitHubId(user.id, profile.id)
          } else {
            user = await queriesAuth.createUserWithGitHub(profile)
          }
        }
        return done(null, user)
      } catch (err) {
        return done(err)
      }
    }
  )
)

export default passport
