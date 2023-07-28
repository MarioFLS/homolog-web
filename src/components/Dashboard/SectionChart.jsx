import ChartPie from './ChartPie';

import styles from '../../styles/DashboardMain/SectionChart.module.css';
import LineChartViews from './LineChartViews';
import LineChartClicks from './LineChartClicks';

function SectionChart() {
  return (
    <section className={styles.sectionChart}>
      <div className={styles.sectionChartLine}>
        <LineChartViews styles={styles} />
        <LineChartClicks styles={styles} />
      </div>
      <div className={styles.sectionChartPie}>
        <ChartPie styles={styles} />
      </div>
    </section>
  );
}

export default SectionChart;
