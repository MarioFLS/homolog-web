/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable import/no-unresolved */
/* eslint-disable-next-line jsx-a11y/media-has-caption, jsx-a11y/media-has-caption, jsx-a11y/media-has-caption */
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import styles from '../../styles/DashboardMain/Carousel.module.css';
import EyeViews from '../../assets/EyeViews.svg';
import ChevronRigth from '../../assets/ChevronRigth.svg';
import AdsEmpty from '../../assets/AdsEmpty.png';

function CarouselAds({ data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const url = pathname?.split('/');
  const isLaptopBigScreen = useMediaQuery({ query: '(max-width: 1800px)' });
  const isLaptopScreen = useMediaQuery({ query: '(max-width: 1500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1200px)' });
  const isMediumTabletScreen = useMediaQuery({ query: '(max-width: 1030px)' });
  const isTabletScreen = useMediaQuery({ query: '(max-width: 780px)' });
  const isTabletLScreen = useMediaQuery({ query: '(max-width: 980px)' });
  const [mediaQuery, serMediaQuery] = useState(5);


  useEffect(() => {
    if (data.length === 1) {
      return serMediaQuery(1);
    }
    if (data.length === 2) {
      return serMediaQuery(2);
    }
    if (isTabletScreen || isTabletLScreen) return serMediaQuery(2);
    if (isMediumScreen || isMediumTabletScreen) return serMediaQuery(2);
    if (isLaptopBigScreen || isLaptopScreen) return serMediaQuery(3);
    return serMediaQuery(4);
  }, [isTabletScreen, isMediumScreen, isLaptopScreen, isMediumTabletScreen, isLaptopBigScreen, isTabletLScreen]);

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
    <section className={styles.adsContainer}>
      {url.includes('dashboard') ? (
        <div className={styles.adsContainerText}>
          <h2>{t('carouselAds-recent')}</h2>
          <button onClick={() => navigate('/advertising')} type="button">
            <span>{t('carouselAds-view-all')}</span>
            <img src={ChevronRigth} alt="Seta Indicando ir para outra página" />
          </button>
        </div>
      ) : null}
      {data.length ? (
        <article className={styles.articleContainer}>
          <Swiper
            modules={[Autoplay, Navigation, EffectFade]}
            speed={500}
            slidesPerView={mediaQuery}
            spaceBetween={1}
            className={styles.myswiper}
          >
            {data.map(({
              id, title, viewsCount, content, approver,
            }) => (
              <SwiperSlide
                className={styles.swiperSlide}
              // eslint-disable-next-line react/no-array-index-key
                key={id ?? 1}
                onClick={() => navigate(`/advertising/${id}`)}
              >
                {!data.length && <div className={styles.filter}>{null}</div>}
                <div className={styles.containerVideoSwiper}>
                  <video className={styles.videoSwiper} preload="metadata">
                    <source src={content} type="video/mp4" />
                    <source src={content} type="video/webm" />
                  </video>
                  <div className={styles.containerImageViews}>
                    <div className={styles.containerInfoAd}>
                      {infoAds(approver)}
                    </div>
                    <div>
                      <img className={styles.ImageViews} src={EyeViews} alt="Icone dos view" />
                      <p>{viewsCount}</p>
                    </div>
                  </div>
                </div>
                <div className={styles.titleAd}>
                  <h3>{title}</h3>
                </div>
              </SwiperSlide>

            ))}

          </Swiper>
        </article>
      )
        : (
          <article className={styles.articleAdsEmpty}>
            <div>
              <img src={AdsEmpty} alt="Imagem para simbolizar o Carrosel de Anuncios vazio." />
              <p>Você ainda não fez nenhum anúncio</p>
            </div>
          </article>
        )}
    </section>
  );
}

export default CarouselAds;
