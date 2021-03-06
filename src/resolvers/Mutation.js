const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(parent, args, context) {
  const { prisma } = context
  const userId = getUserId(context)
  return prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  })
}

async function signup(parent, args, { prisma }, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await prisma.createUser({ ...args, password })

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return { user, token }
}

async function login(parent, args, { prisma }, info) {
  const user = await prisma.user({ email: args.email })

  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid Password')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return { user, token }
}

module.exports = {
  signup,
  post,
  login
}
