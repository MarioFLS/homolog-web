/* eslint-disable jsx-a11y/media-has-caption */
// import CardVideo from '../../../assets/CardVideo.png';
import IconTarget from '../../../assets/Icons/IconTarget.svg';
import IconDate from '../../../assets/Icons/IconDate.svg';
import styles from '../../../styles/Advertising/Id/SectionInfoAds/SectionInfoAds.module.css';
import formatDate from '../../../helpers/formatDate';

function SectionInfoAds({ ad }) {
  const infoAds = (approver) => {
    if (!approver) {
      return (
        <div className={styles.adUnderReview}>
          <span>Em análise</span>
        </div>
      );
    }
    if (!approver.deletedAt) {
      return (
        <div className={styles.adApproved}>
          <span>Aprovado</span>
        </div>
      );
    }
    return (
      <div className={styles.adDisapproved}>
        <span>Reprovado</span>
      </div>
    );
  };
  return (
    <section className={styles.sectionMain}>
      <div className={styles.containerInfoAd}>
        {infoAds(ad.approver)}
      </div>

      <div className={styles.contianerImage}>
        <video className={styles.imageSwiper} controls preload="metadata">
          <source src={ad.content} type="video/mp4" />
          <source src={ad.content} type="video/webm" />
        </video>
      </div>
      <div className={styles.containerMain}>
        <h2>Informações do Anúncio</h2>
        <div className={styles.containerDateText}>
          <div className={styles.dateText}>
            <div>
              <img src={IconDate} alt="Icone de Calandário" />
            </div>
            <h3>Criado em</h3>
          </div>
          <p>
            {formatDate(ad?.createdAt)}
          </p>
        </div>
        <div className={styles.containerGoalText}>
          <div className={styles.goalText}>
            <div>
              <img src={IconTarget} alt="Icone de Alvo" />
            </div>
            <h3>Objetivo</h3>
          </div>
          <div className={styles.trafficGoalText}>
            <h4>Tráfego</h4>
            <p>Trazer mais pessoas para um determinado lugar em seu site</p>
          </div>
        </div>
      </div>

    </section>
  );
}

export default SectionInfoAds;
