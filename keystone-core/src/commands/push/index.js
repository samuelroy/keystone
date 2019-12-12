const fs = require('fs')

const { getPath } = require('../../descriptor-path')

const { updateDescriptor, getLatestEnvDescriptor } = require('../../descriptor')
const {
  writeFileToDisk,
  getCacheFolder,
  getModifiedFilesFromCacheFolder,
} = require('../../file')

const push = async (
  userSession,
  { project, env, files, absoluteProjectPath }
) => {
  const { username } = userSession.loadUserData()

  // create keystone cache folder
  const cacheFolder = getCacheFolder(absoluteProjectPath)

  // const promises =
  await Promise.all(
    files.map(async file => {
      const { filename, fileContent } = file
      const filePath = getPath({
        project,
        env,
        filename,
        blockstackId: username,
        type: 'file',
      })

      const fileDescriptor = await updateDescriptor(userSession, {
        project,
        env,
        type: 'file',
        content: fileContent,
        descriptorPath: filePath,
        name: filename,
      })

      writeFileToDisk(fileDescriptor, cacheFolder)

      return fileDescriptor
    })
  )

  const envDescriptor = await getLatestEnvDescriptor(userSession, {
    project,
    env,
  })

  let envModified = false

  // If file is not present, add it.
  files.forEach(({ filename }) => {
    if (!envDescriptor.content.files.find(f => f.name === filename)) {
      envModified = true

      envDescriptor.content.files.push({
        name: filename,
      })
    }
  })

  if (envModified) {
    const envDescriptorPath = getPath({
      project,
      env,
      type: 'env',
    })

    updateDescriptor(userSession, {
      project,
      env,
      type: 'env',
      content: envDescriptor.content,
      descriptorPath: envDescriptorPath,
      name: env,
    })
  }
}

/**
 * Push only modified files present in cache folder.
 */
const pushModifiedFiles = (
  userSession,
  { project, env, absoluteProjectPath }
) => {
  // create keystone cache folder
  const cacheFolder = getCacheFolder(absoluteProjectPath)

  const changes = getModifiedFilesFromCacheFolder(
    cacheFolder,
    absoluteProjectPath
  )

  const modifiedFiles = changes.filter(c => c.status !== 'ok')

  if (modifiedFiles.length === 0) {
    console.log('No modified files. Nothing to push.')
    return
  }

  console.log("TCL: modifiedFiles", modifiedFiles)
  // return

  const formatModifiedFiles = modifiedFiles.map(({ path }) => ({
    filename: path.replace(absoluteProjectPath, ''),
    fileContent: fs.readFileSync(path).toString(),
  }))

  push(userSession, {
    project,
    env,
    files: formatModifiedFiles,
    absoluteProjectPath,
  })
}

module.exports = { push, pushModifiedFiles }