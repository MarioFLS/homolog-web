/* eslint-disable import/no-unresolved */
import {
  Swiper, SwiperSlide,
} from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from "../../styles/LandingPage/MediaCarousel/MediaCarousel.module.css";

/* Imagens */
import LogoTheCointelegraph from '../../assets/media/LogoTheCointelegraph.png';
import LogoPortalDoBitcoin from '../../assets/media/LogoPortalDoBitcoin.png';
import LogoOGlobo from '../../assets/media/LogoOGlobo.png';
import LogoPopverso from '../../assets/media/LogoPopverso.png';
import LogoNegocios from '../../assets/media/LogoNegocios.png';
import LogoWe3News from '../../assets/media/LogoWe3News.png';
import LogoMundoConectado from '../../assets/media/LogoMundoConectado.png';
import LogoMoneyTimes from '../../assets/media/LogoMoneyTimes.png';

import IconArrowCarouselRight from '../../assets/Icons/IconArrowCarouselRight.svg';
import IconArrowCarouselLeft from '../../assets/Icons/IconArrowCarouselLeft.svg';

function MediaCarousel() {
  const { t } = useTranslation();
  const isLaptopBigScreen = useMediaQuery({ query: '(max-width: 1800px)' });
  const isLaptopScreen = useMediaQuery({ query: '(max-width: 1500px)' });
  const isMediumScreen = useMediaQuery({ query: '(max-width: 1200px)' });
  const isMediumTabletScreen = useMediaQuery({ query: '(max-width: 1030px)' });
  const isTabletScreen = useMediaQuery({ query: '(max-width: 780px)' });
  const isTabletLScreen = useMediaQuery({ query: '(max-width: 980px)' });
  const isPhoneScreen = useMediaQuery({ query: '(max-width: 500px)' });
  const isMinimunPhoneScreen = useMediaQuery({ query: '(max-width: 400px)' });
  const [mediaQuery, serMediaQuery] = useState(5);

  useEffect(() => {
    if (isMinimunPhoneScreen) return serMediaQuery(2);
    if (isPhoneScreen) return serMediaQuery(3);
    if (isTabletScreen) return serMediaQuery(4);
    if (isTabletLScreen) return serMediaQuery(3);
    if (isMediumScreen || isMediumTabletScreen) return serMediaQuery(3);
    if (isLaptopBigScreen || isLaptopScreen) return serMediaQuery(5);
    return serMediaQuery(6);
  }, [isTabletScreen, isMediumScreen, isLaptopScreen, isMediumTabletScreen, isLaptopBigScreen, isTabletLScreen, isPhoneScreen, isMinimunPhoneScreen]);
  const media = [
    {
      id: 1,
      img: LogoTheCointelegraph,
      link: "https://cointelegraph.com.br/news/developed-with-blockchain-technology-brazilian-social-network-hits-the-market",
      text: "The Coin Tekegraph",
    },
    {
      id: 2,
      img: LogoPortalDoBitcoin,
      link: "https://portaldobitcoin.uol.com.br/nova-rede-social-soulprime-se-une-a-mb-para-remunerar-inscritos-na-plataforma-com-criptoativos/",
      text: "Portal do Bitcoin",
    },
    {
      id: 3,
      img: LogoOGlobo,
      link: "https://oglobo.globo.com/rio/web-summit-rio/noticia/2023/05/rede-social-brasileira-baseada-em-blockchain-quer-remunerar-usuarios-e-criadores-de-conteudo.ghtml",
      text: "O Globo",
    },
    {
      id: 4,
      img: LogoPopverso,
      link: "https://www.youtube.com/watch?v=S9vrtQyDHfE",
      text: "PopVerso",
    },
    {
      id: 5,
      img: LogoNegocios,
      link: "https://epocanegocios.globo.com/google/amp/especiais/web-summit/noticia/2023/05/rede-social-brasileira-baseada-em-blockchain-quer-remunerar-usuarios-e-criadores-de-conteudo.ghtml",
      text: "Negócios",
    },
    {
      id: 6,
      img: LogoWe3News,
      link: "https://web3news.com.br/noticia/641/rede-social-brasileira-baseada-em-blockchain-vai-remunerar-usuarios-e-criadores-de-conteudo",
      text: "Web3 News",
    },
    {
      id: 7,
      img: LogoMundoConectado,
      link: "https://mundoconectado.com.br/noticias/v/33926/soulprime-a-rede-social-brasileira-que-remunera-usuarios-e-criadores-de-conteudo",
      text: "Mundo Conectado",
    },
    {
      id: 8,
      img: LogoMoneyTimes,
      link: "https://www.moneytimes.com.br/ganhar-criptomoeda-apenas-por-mexer-em-rede-social-empresa-chega-ao-brasil-distribuindo-dinheiro/",
      text: "Money Times",
    },
  ];
  const swiperRef = useRef();

  return (
    <section className={styles.sectionMedia}>
      <h3 className={styles.title}>
        {t("section-media")}
      </h3>
      <div className={styles.containerCarousel}>
        <button
          type="button"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <img src={IconArrowCarouselLeft} alt="Icone de seta apontando pra direita" />
        </button>
        <Swiper
          modules={[Autoplay, Navigation, EffectFade]}
          loop
          effect="cards"
          slidesPerView={mediaQuery}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >

          {media.map(({
            id, img, link, text,
          }) => (
            <SwiperSlide
              key={id}
            >
              <div className={styles.containerImage}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <img src={img} alt={`Logo do ${text}`} />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          type="button"
          onClick={() => swiperRef.current.slideNext()}
        >
          <img src={IconArrowCarouselRight} alt="Icone de seta apontando pra direita" />
        </button>

      </div>

    </section>
  );
}

export default MediaCarousel;
