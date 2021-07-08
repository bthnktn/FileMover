interface File {
  id: string;
  name: string;
}

interface Folder extends File {
  files: File[];
}

export type List = Folder[];

export default function move(list: List, source: string, destination: string): List {
  let sourceFile: File;

  if (!list.length || !list) {
    throw new Error('There is nothing to move in an empty list');
  }

  return list.map((folder: Folder) => {
    if (folder.id === source) {
      throw new Error('You cannot move a folder');
    }

    const fileAsDestination = folder.files.some((file: File) => file.id === destination);

    if (fileAsDestination) {
      throw new Error('You cannot specify a file as the destination');
    }

    const fileInFolder = folder.files.find((file: File) => file.id === source);
    const updatedFolder = folder;

    if (fileInFolder) {
      sourceFile = fileInFolder;
      updatedFolder.files = folder.files.filter((file: File) => file.id !== fileInFolder.id);
    } else if (sourceFile && folder.id === destination) {
      updatedFolder.files.push(sourceFile);
    }

    return updatedFolder;
  });
}
