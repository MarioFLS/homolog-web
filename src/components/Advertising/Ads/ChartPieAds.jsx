/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AlertComponent from '../../Alert/AlertComponent';
import { getGraphicsById } from '../../../helpers/getGraphics';
import AppContext from '../../../Context/AppContext';
import CircleGraphicsEmpty from '../../../assets/CircleGraphicsEmpty.svg';

function ChartPieAds({ styles }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [graphic, setGraphic] = useState([]);
  const [alert, setAlert] = useState(false);
  const { userHeader } = useContext(AppContext);

  const findGraphic = async () => {
    setGraphic([]);
    if (id) {
      setGraphic([]);
      return getGraphicsById(`/ads/by_id/views_by_gender?ad_id=${id}`, "/ads/associate/by_id/views_by_gender", userHeader, setGraphic, id, t);
    }
  };
  useEffect(() => {
    try {
      findGraphic();
    } catch (error) {
      setAlert(true);
      alert("Teve algum erro na hora de trazer seus grafícos. Recarregue a página e tente novamente!");
    }
  }, [userHeader]);
  return (
    <>
      <div>
        <div className={styles.chartText}>
          <h3>{t('chart-gender')}</h3>
        </div>
        {graphic.some((e) => e > 0) ? (
          <div>
            <Pie
              data={{
                labels: [
                  t('chart-gender-masculine'),
                  t('chart-gender-female'),
                  t('chart-gender-other'),
                ],
                datasets: [
                  {
                    label: 'Visualizações',
                    data: graphic,
                    backgroundColor: [
                      '#FFB850',
                      '#BA02C9',
                      '#F76799',

                    ],
                    borderColor: [
                      '#FFB850',
                      '#BA02C9',
                      '#F76799',
                    ],
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                plugins: {

                  legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                    title: {
                      text: 'Titulo sendo Textado',
                    },
                    labels: {
                      padding: 15,
                      useBorderRadius: true,
                      usePointStyle: 'circle',
                    },
                  },
                },
              }}
            />
          </div>
        ) : (
          <div>
            {/* <div className={styles.graphicsEmpty} style={}/> */}
            <img src={CircleGraphicsEmpty} alt="" />
            <p>Ainda não há informações</p>
          </div>
        ) }

      </div>
      <AlertComponent
        text="Teve algum erro na hora de trazer seus grafícos. Recarregue a página e tente novamente!"
        open={alert}
        type="info"
      />
    </>
  );
}

ChartPieAds.propTypes = {
  styles: PropTypes.shape({
    chartText: PropTypes.any,
  }).isRequired,
};

export default ChartPieAds;
