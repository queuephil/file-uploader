import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const queriesFiles = {
  async createFile(
    name: string,
    url: string,
    folderId: number,
    userId: number
  ) {
    return await prisma.file.create({
      data: {
        name,
        url,
        folderId,
        userId,
      },
    })
  },

  async createFolder(name: string, parentId: number, userId: number) {
    return await prisma.folder.create({
      data: {
        name,
        parentId,
        userId,
      },
    })
  },
  async deleteFile(id: number) {
    return await prisma.file.delete({ where: { id: id } })
  },
  async deleteFolder(id: number) {
    return await prisma.folder.delete({ where: { id: id } })
  },
  async readAll(userId: number) {
    return await prisma.folder.findMany({
      where: {
        userId: userId, // Replace with the authenticated user's ID
        parentId: null, // Fetch only root-level folders
      },
      include: {
        subfolders: {
          include: {
            subfolders: true, // Recursively fetch subfolders
            files: true, // Include files in subfolders
          },
        },
        files: true, // Include files in root folder
      },
    })
  },
}

export default queriesFiles
