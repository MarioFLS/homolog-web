import styles from '../../../styles/Advertising/Id/SectionChart/SectionChart.module.css';
import ChartPieAds from '../Ads/ChartPieAds';
import LineChartViewsAds from '../Ads/LineChartViewsAds';
import LineChartClicksAds from '../Ads/LineChartClicksAds';
import DisapprovedAd from './DisapprovedAd';

function SectionChart({ ad }) {
  return (
    <section className={styles.sectionChart}>
      <h2>Alcance</h2>
      <article className={styles.sectionChartLine}>
        <LineChartViewsAds styles={styles} />
        <LineChartClicksAds styles={styles} />
      </article>
      <article className={styles.sectionChartPie}>
        <ChartPieAds styles={styles} />
      </article>
      {ad?.approver?.deletedAt ? <DisapprovedAd /> : null}

    </section>
  );
}

export default SectionChart;
