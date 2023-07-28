/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getGraphicsById } from '../../../helpers/getGraphics';
import AppContext from '../../../Context/AppContext';
import IconTableListSearch from '../../../assets/Icons/IconTableListSearch.svg';
// import styles from '../../styles/DashboardMain/SectionChart.module.css';

function LineChartViewsAds({ styles }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];
  const [graphic, setGraphic] = useState({
    totalViews: 0,
    viewsList: [],
    percentageOfAdsViews: 0,
  });
  const { userHeader } = useContext(AppContext);
  const findGraphic = async () => {
    setGraphic({
      totalViews: 0,
      viewsList: [],
      percentageOfAdsViews: 0,
    });
    if (id) {
      setGraphic({
        totalViews: 0,
        viewsList: [],
        percentageOfAdsViews: 0,
      });
      return getGraphicsById(`/ads/by_id/impressions?ad_id=${id}`, "/ads/associate/by_id/impressions", userHeader, setGraphic, id, t);
    }
  };
  useEffect(() => {
    findGraphic();
  }, [userHeader]);

  const datasets = [
    {
      label: 'Dataset 1',
      data: graphic.viewsList,
      borderColor: '#1FD371',
      backgroundColor: 'null',
      tension: 0.4,
      pointRadius: 0,
    },
  ];

  const percentagemGraphics = () => {
    const views = graphic?.percentageOfAdsViews;
    if (views) {
      if (views > 0) {
        return `+${graphic.percentageOfAdsViews}%`;
      }
      if (views < 0) {
        return `${graphic.percentageOfAdsViews}%`;
      }
      return `${0}%`;
    }
    return `${0}%`;
  };

  return (
    <div className={styles.chartLineContainerMain}>
      <div className={styles.chartLineContainer}>
        {
          graphic?.totalViews
            ? (
              <>
                <div className={styles.chartLineText}>
                  <h3>{t('chart-impressions')}</h3>
                  <p style={{ color: '#1FD371' }}>{graphic.totalViews}</p>
                </div>
                <div className={styles.chartLine}>
                  <div>
                    <p style={{ color: '#1FD371' }} className={styles.chartLineText}>{percentagemGraphics()}</p>
                  </div>
                  <Line
                    data={{
                      labels,
                      datasets,
                    }}
                    options={{
                      scales: {
                        x: {
                          display: false,
                        },
                        y: {
                          display: false,
                        },

                      },
                      plugins: {
                        legend: {
                          display: false,
                        },
                        tooltip: {
                          enabled: false,
                        },
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.chartLineText}>
                  <h3>{t('chart-impressions')}</h3>
                  <p className={styles.textEmpyLine}>Ainda não há informações</p>
                </div>
                <div className={styles.emptychartLine}>
                  <img src={IconTableListSearch} alt="" />
                </div>
              </>
            )
        }

      </div>
    </div>
  );
}

LineChartViewsAds.propTypes = {
  styles: PropTypes.shape({
    chartLine: PropTypes.any,
    chartLineContainer: PropTypes.any,
    chartLineContainerMain: PropTypes.any,
    chartLineText: PropTypes.any,
  }).isRequired,
};

export default LineChartViewsAds;
