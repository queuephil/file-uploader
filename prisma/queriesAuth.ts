import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface UserProfile {
  emails: { value: string }[]
  id: string
}

const queriesAuth = {
  async createUser(username: string, password: string) {
    return await prisma.user.create({
      data: { username, password },
    })
  },

  async getUserByUsername(username: string) {
    return await prisma.user.findUnique({
      where: { username },
    })
  },

  async getUserById(id: number) {
    return await prisma.user.findUnique({
      where: { id },
    })
  },

  // Google
  async createUserWithGoogle(profile: UserProfile) {
    return await prisma.user.create({
      data: {
        username: profile.emails[0].value,
        google_id: profile.id,
      },
    })
  },

  async getUserByGoogleId(googleId: string) {
    return await prisma.user.findUnique({
      where: { google_id: googleId },
    })
  },

  async updateUserWithGoogleId(id: number, googleId: string) {
    return await prisma.user.update({
      where: { id },
      data: { google_id: googleId },
    })
  },

  // Facebook
  async createUserWithFacebook(profile: UserProfile) {
    return await prisma.user.create({
      data: {
        username: profile.emails[0].value,
        facebook_id: profile.id,
      },
    })
  },

  async getUserByFacebookId(facebookId: string) {
    return await prisma.user.findUnique({
      where: { facebook_id: facebookId },
    })
  },

  async updateUserWithFacebookId(id: number, facebookId: string) {
    return await prisma.user.update({
      where: { id },
      data: { facebook_id: facebookId },
    })
  },

  // GitHub
  async createUserWithGitHub(profile: UserProfile) {
    return await prisma.user.create({
      data: {
        username: profile.emails[0].value,
        github_id: profile.id,
      },
    })
  },

  async getUserByGitHubId(githubId: string) {
    return await prisma.user.findUnique({
      where: { github_id: githubId },
    })
  },

  async updateUserWithGitHubId(id: number, githubId: string) {
    return await prisma.user.update({
      where: { id },
      data: { github_id: githubId },
    })
  },
}

export default queriesAuth
