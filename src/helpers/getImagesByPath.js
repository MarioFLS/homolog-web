/* import fs from 'fs';
import path from 'path';

const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

const getImagesByPath = () => {
  const folderPath = '../assets/Nfts';
  const imagePaths = [];
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach((file) => {
      const fileExtension = path.extname(file);
      if (imageExtensions.includes(fileExtension)) {
        const imagePath = path.join(folderPath, file);
        imagePaths.push(imagePath);
      }
    });
  });
  return imagePaths;
};
export default getImagesByPath;
 */
