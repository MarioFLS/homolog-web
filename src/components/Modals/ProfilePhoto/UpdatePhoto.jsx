import { Avatar, Badge } from "@mui/material";
import { useContext } from "react";
import AppContext from "../../../Context/AppContext";
import styles from "../../../styles/Modals/ProfilePhoto/UpdatePhoto/UpdatePhoto.module.css";
import IconEditWhite from "../../../assets/Icons/IconEditWhite.svg";

function UpdatePhoto({ setFile }) {
  const { globalInfoUser } = useContext(AppContext);

  return (
    <div className={styles.containerMain}>
      <header>
        <h2>Atualize seu avatar</h2>
      </header>
      <div className={styles.containerPhoto}>
        <input
          accept="image/*"
          id="input-file-photo-profile"
          className={styles.inputUpload}
          type="file"
          onChange={({ target }) => {
            const file = target.files[0];
            setFile(file);
          }}
        />
        <label htmlFor="input-file-photo-profile">
          <Badge
            id="input-file-photo-profile"
            className={styles.containerBadge}
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={(
              <Avatar
                alt="Icone do Usuário"
                src={IconEditWhite}
                className={styles.iconEdit}
              />
          )}
          >
            <Avatar
              alt="Icone do Usuário"
              src={globalInfoUser.imagem}
              className={styles.photoProfile}
            />
          </Badge>
        </label>
        <h3>{globalInfoUser.username}</h3>
      </div>
      <div className={styles.containerInfo}>
        <p>A imagem do avatar estará vinculada com o seu perfil, identificando sua marca nos anúncios.</p>
      </div>
    </div>
  );
}

export default UpdatePhoto;
