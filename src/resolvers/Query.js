function feed(parent, args, { prisma }, info) {
  return prisma.links()
}

module.exports = {
  feed
}
