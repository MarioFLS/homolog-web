/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Checkbox, Pagination, Stack } from '@mui/material';
import axios from "../../interceptors/axiosConfig";
import IconTrash from '../../assets/Icons/IconTrash.svg';
import IconEdit from '../../assets/Icons/IconEdit.svg';
import styles from '../../styles/Adm/TableAds/TableAds.module.css';

import ModalAd from './ModalAd';
import getSecureLocalStorage from '../../helpers/getSecureLocalStorage';

const baseUrl = import.meta.env.VITE_APP_BASE_URL_API;

function TableAds({ typeAds }) {
  const [adsData, setAdsData] = useState([]);
  const [adFind, setAd] = useState({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pagesNumber, setPagesNumber] = useState(0);
  const handleOpen = (id) => {
    setAd(adsData.find((a) => a.id === id));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [selectedAds, setSelectedAds] = useState([]);

  const selectAds = ({ checked }, id) => {
    if (checked) {
      const ad = adsData.find((a) => a.id === id);
      return setSelectedAds((preves) => [...preves, ad]);
    }
    return setSelectedAds((preves) => preves.filter((ad) => ad.id !== id));
  };

  const selectAllAds = ({ checked }) => {
    if (checked) {
      const adsSet = new Set([...adsData, ...selectedAds]);
      return setSelectedAds(Array.from(adsSet));
    }

    return setSelectedAds([]);
  };

  /* const getAllAds = async () => {
    const infoUser = await getSecureLocalStorage();
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    const { data: { ads, pages_number } } = await axios.post(`${baseUrl}/adm/ads/all`, { page }, { headers });
    setPagesNumber(pages_number);
    setAdsData(ads);
  }; */

  function makeUnique(arr, prop) {
    const uniqueSet = new Set();
    return arr.filter((obj) => !uniqueSet.has(obj[prop]) && uniqueSet.add(obj[prop]));
  }


  const showTypeAds = async () => {
    const infoUser = await getSecureLocalStorage();
    const headers = {
      Authorization: `Bearer ${infoUser.accessToken}`,
      'Content-Type': 'application/json',
    };
    if (typeAds === 1) {
      const { data: { ads, pages_number } } = await axios.post(`${baseUrl}/adm/ads/all`, { page }, { headers });
      setPagesNumber(pages_number);
      return setAdsData(makeUnique(ads, "id"));
    }
    if (typeAds === 2) {
      const { data: { ads, pages_number } } = await axios.post(`${baseUrl}/adm/get/approver`, { page, is_approved: false }, { headers });
      setPagesNumber(pages_number);
      return setAdsData(makeUnique(ads, "id"));
    }
    const { data: { ads, pages_number } } = await axios.post(`${baseUrl}/adm/get/approver`, { page, is_approved: true }, { headers });
    setPagesNumber(pages_number);
    return setAdsData(makeUnique(ads, "id"));
  };
  useEffect(() => {
    showTypeAds();
  }, [typeAds]);
  const converteDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
  };


  const handleChange = (event, value) => {
    setPage(value);
  };
  return (
    <div className={styles.containerMain}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <div>
                <Checkbox
                  onChange={({ target }) => selectAllAds(target)}
                  sx={{
                    zIndex: 1,
                    color: '#BA02C9',
                    '&.Mui-checked': {
                      color: '#BA02C9',
                    },
                  }}
                />
                <span>Anúncio</span>
              </div>
            </th>
            <th>Empresa</th>
            <th>Recebido em</th>
            <th>Outros</th>
          </tr>
        </thead>
        <tbody>
          {adsData.map(({
            id, title, createdAt, user,
          }) => (
            <tr key={id} onClick={() => handleOpen(id)}>
              <td>
                <div>
                  <Checkbox
                    checked={selectedAds.some((a) => a.id === id)}
                    onChange={({ target }) => selectAds(target, id)}
                    sx={{
                      color: '#BA02C9',
                      '&.Mui-checked': {
                        color: '#BA02C9',
                      },
                    }}
                  />
                  {title}
                </div>

              </td>
              <td>{user}</td>
              <td>{converteDate(createdAt)}</td>
              <td>
                <div className={styles.buttonOthers}>
                  <button type="button">
                    <img src={IconEdit} alt="Icone de edição. Tem o formato de um lápis" />
                  </button>
                  <button type="button">
                    <img src={IconTrash} alt="Icone de Excluir. Tem o formato de uma lixeira" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      <footer className={styles.footer}>
        <div>
          <Stack spacing={2}>
            <Pagination count={pagesNumber} onChange={handleChange} shape="rounded" color="primary" />
          </Stack>
        </div>
      </footer>
      <ModalAd typeAds={typeAds} open={open} handleClose={handleClose} funcAds={{ setAdsData, setPagesNumber, page }} ad={adFind} />
    </div>
  );
}

export default TableAds;
