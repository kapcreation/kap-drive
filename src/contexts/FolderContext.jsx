import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getFolder, getFolderChildren, addFolder, addFile, getRootFolder } from '../firebase'

export const FolderContext = createContext()

export const useFolder = () => useContext(FolderContext)

export const FolderProvider = ({ children }) => {
  const { currentUser } = useAuth()
  const [currentFolder, setCurrentFolder] = useState(null)
  const [folderChildren, setFolderChildren] = useState(null)
  const folders = folderChildren?.filter(item => item.type === 'folder')
  const files = folderChildren?.filter(item => item.type === 'file')
  const [progress, setProgress] = useState(0)

  async function createFolder(name) {
    const path = currentFolder.type === 'root' ?
      [] 
      :
      [ ...currentFolder.path, { name: currentFolder.name, id: currentFolder.id } ]

    await addFolder({ parentId: currentFolder.id, userId: currentUser.uid, type: 'folder', name, path })
  }

  async function createFile(file) {
    await addFile({ parentId: currentFolder.id, userId: currentUser.uid, type: 'file', contentType: file.type, name: file.name }, file, setProgress)
  }

  async function openFolder(folderId) {
    const data = folderId ? await getFolder(folderId) : await getRootFolder(currentUser.uid)
    setCurrentFolder(data)
  }
 
  useEffect(() => {
    const unsub = currentFolder ? getFolderChildren(currentFolder.id, setFolderChildren) : ()=>{}

    return unsub
  }, [currentFolder])

  const value = { openFolder, currentFolder, folderChildren, createFolder, createFile, folders, files, progress }
  return (
    <FolderContext.Provider value={value}>
      {children}
    </FolderContext.Provider>
  )
}