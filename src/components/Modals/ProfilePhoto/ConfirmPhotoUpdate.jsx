import { useContext } from "react";
import { Avatar } from "@mui/material";
import Swal from "sweetalert2";
import AppContext from "../../../Context/AppContext";
import styles from "../../../styles/Modals/ProfilePhoto/ConfirmPhotoUpdate/ConfirmPhotoUpdate.module.css";
import uploadImage from "../../../helpers/uploadImage";
import getSecureLocalStorage from "../../../helpers/getSecureLocalStorage";
import axios from "../../../interceptors/axiosConfig";


function ConfirmPhotoUpdate({ file, handleClose, setFile }) {
  const { setGlobalInfoUser, setUserHeader } = useContext(AppContext);
  const imgURL = URL.createObjectURL(file);

  const confirmUpdate = async () => {
    try {
      const avatar = await uploadImage(file);
      const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;
      const infoUser = await getSecureLocalStorage();
      await axios.put(`${baseUrl}/user/update`, { avatar }, {
        headers: { Authorization: `Bearer ${infoUser.accessToken}` },
      });
      setGlobalInfoUser((preves) => ({ ...preves, imagem: imgURL }));
      setUserHeader((preves) => ({ ...preves, imagem: imgURL }));
      handleClose();
      return Swal.fire({
        width: 250,
        height: 100,
        position: 'top-end',
        icon: 'success',
        title: 'Foto atualizada com sucesso!',
        showConfirmButton: false,
        timer: 1200,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Não foi possível atualizar a foto',
        text: error?.response?.data?.error,
        confirmButtonText: "Continuar",
      });
    }
  };


  return (
    <div className={styles.containerMain}>
      <header>
        <h2>Pré-visualização</h2>
      </header>
      <div className={styles.containerPreviewImg}>
        <div className={styles.containerImg}>
          <img className={styles.imgMain} src={imgURL} alt="Imagem do Usuário" />
          <Avatar
            alt="Icone do Usuário"
            src={imgURL}
            className={styles.containerAvatar}
          />
        </div>
      </div>
      <div className={styles.containerButton}>

        <label htmlFor="input-file-photo-profile">
          <button className={styles.galeryButton} type="button">
            Galeria
            <input
              accept="image/*"
              id="input-file-photo-profile"
              className={styles.inputUpload}
              type="file"
              onChange={({ target }) => setFile(target.files[0])}
            />
          </button>
        </label>
        <label htmlFor="">
          <button onClick={confirmUpdate} className={styles.confirmButton} type="button">Confirmar</button>
        </label>

      </div>
    </div>
  );
}

export default ConfirmPhotoUpdate;
