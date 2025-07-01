import React from 'react';
import { Link } from 'react-router-dom';

const goyaCatalogs = [
  {
    name: "Mistral",
    link: "/collectionsgoya/mistral",
    image: "https://olta.eu/wp-content/uploads/2024/11/MISTRAL-35-N35_DIORIS-6149_2-scaled.jpg"
  },
  {
    name: "Amalfi",
    link: "/collectionsgoya/amalfi",
    image: "https://olta.eu/wp-content/uploads/2023/09/AMALFI-NW-RS_BERGEN-5217_1-1080x658.jpg"
  },
  {
    name: "Avant",
    link: "/collectionsgoya/avant",
    image: "https://olta.eu/wp-content/uploads/2020/06/AVANT-15-15-1535_BLAZE-6005_1-1080x608.jpg"
  },
  {
    name: "Ray",
    link: "/collectionsgoya/ray",
    image: "https://olta.eu/wp-content/uploads/2024/11/RAY-1o-STAUNCH-5048-910x700.jpg"
  },
  {
    name: "Maxwell",
    link: "/collectionsgoya/maxwell",
    image: "https://olta.eu/wp-content/uploads/2024/09/MAXWELL-15-15-N-15-15-P103x82__COLOURWASH5432_LCOLOURWASH5433_KELLY-1_BOHO-5299_1-1080x607.jpg"
  },
  {
    name: "Calypso",
    link: "/collectionsgoya/calypso",
    image: "https://olta.eu/wp-content/uploads/2023/10/CALYPSO-4-E80D-N125-4-LAD_STAUNCH-5046_LENOX-1o_BERGEN-5217_3-1080x608.jpg"
  },
  {
    name: "Coco",
    link: "/collectionsgoya/coco",
    image: "https://olta.eu/wp-content/uploads/2024/09/COCO-1M_PRAZZO-6010_1-595x700.jpg"
  },
  {
    name: "Diva",
    link: "/collectionsgoya/diva",
    image: "https://olta.eu/wp-content/uploads/2023/10/DIVA-55_COLOURWASH-5434_2-1080x608.jpg"
  },
  {
    name: "Duo",
    link: "/collectionsgoya/duo",
    image: "https://olta.eu/wp-content/uploads/2020/08/duo-nowa-bryla-3-1050x700.png"
  },
  {
    name: "Elixir",
    link: "/collectionsgoya/elixir",
    image: "https://olta.eu/wp-content/uploads/2023/10/ELIXIR-35N-35P100x98_WICKER-5065_1-1-1080x657.jpg"
  },
  {
    name: "Extreme",
    link: "/collectionsgoya/extreme",
    image: "https://olta.eu/wp-content/uploads/2023/10/EXTREME-I-15s-15s-ONs-Ls_MAYAN-3742_2-1080x608.jpg"
  },
  {
    name: "Grey",
    link: "/collectionsgoya/grey",
    image: "https://olta.eu/wp-content/uploads/2023/09/GREY-1_LEATHER-PADOVA-305_01-630x700.jpg"
  },
  {
    name: "Horizon",
    link: "/collectionsgoya/horizon",
    image: "https://olta.eu/wp-content/uploads/2023/10/HORIZON-L2Hz-35z-ONz-15zP102x102_ARMONIA-5090_3-1080x580.jpg"
  },
  {
    name: "Hudson",
    link: "/collectionsgoya/hudson",
    image: "https://olta.eu/wp-content/uploads/2023/10/HUDSON-LH-3-WN-6-1-1080x608.jpg"
  },
  {
    name: "Kelly",
    link: "/collectionsgoya/kelly",
    image: "https://olta.eu/wp-content/uploads/2024/09/KELLY-1_BOHO-5299_MAXWELL-15-15-N-15-15-P103x82__COLOURWASH5432_LCOLOURWASH5433_3-700x700.jpg"
  },
  {
    name: "Metro",
    link: "/collectionsgoya/metro",
    image: "https://olta.eu/wp-content/uploads/2023/10/EXTREME_-28-1-525x700.jpg"
  },
  {
    name: "Lenox",
    link: "/collectionsgoya/lenox",
    image: "https://olta.eu/wp-content/uploads/2023/10/LENOX-1H_MAYAN-3742_2-525x700.jpg"
  },
  {
    name: "Onyx",
    link: "/collectionsgoya/onyx",
    image: "https://olta.eu/wp-content/uploads/2023/10/ONYX-35-N35_COTTAGE-3715_3-1080x608.jpg"
  },
  {
    name: "Orio",
    link: "/collectionsgoya/orio",
    image: "https://olta.eu/wp-content/uploads/2023/10/ritz_3-993x700.jpg"
  },
  {
    name: "Oval",
    link: "/collectionsgoya/oval",
    image: "https://olta.eu/wp-content/uploads/2023/10/OVAL-1o1o_MADEIRA-2086MADEIRA-2084_-1050x700.jpg"
  },
  {
    name: "Oxygen",
    link: "/collectionsgoya/oxygen",
    image: "https://olta.eu/wp-content/uploads/2024/09/OXYGEN-35-L2Hz_STAUNCH-5046_1-1080x608.jpg"
  },
  {
    name: "Reverso",
    link: "/collectionsgoya/reverso",
    image: "https://olta.eu/wp-content/uploads/2023/10/REVERSO-T15-N-15-15-15-15-Ps82x102_STAUNCH-5046_1-1080x608.jpg"
  },
  {
    name: "Ritz",
    link: "/collectionsgoya/ritz",
    image: "https://olta.eu/wp-content/uploads/2023/10/ritz_3-993x700.jpg"
  },
  {
    name: "Samoa", 
    link: "/collectionsgoya/samoa",
    image: "https://olta.eu/wp-content/uploads/2023/10/SAMOA-15z-15z-15z-15z-P100x82_MADEIRA-2084_1-1050x700.jpg"
  },
  {
    name: "Six",
    link: "/collectionsgoya/six", 
    image: "https://olta.eu/wp-content/uploads/2023/10/WARSAW-HOME-2022-28-1-466x700.jpg"
  },
  {
    name: "Spectra",
    link: "/collectionsgoya/spectra",
    image: "https://olta.eu/wp-content/uploads/2023/10/SPECTRA-Lz-35z-L2Hz_GRANDE-4235_2-1050x700.jpg"
  },
  {
    name: "Stone",
    link: "/collectionsgoya/stone",
    image: "https://olta.eu/wp-content/uploads/2020/09/STONE-35-D40x101-WN150x140_PERFECT-HARMONY-5415_2-1080x663.jpg"
  },
  {
    name: "Taxi",
    link: "/collectionsgoya/taxi",
    image: "https://olta.eu/wp-content/uploads/2024/11/RAY-1M-REAL-5996-700x700.jpg"
  },
  {
    name: "Uno",
    link: "/collectionsgoya/uno",
    image: "https://olta.eu/wp-content/uploads/2024/09/UNO-P78x78_PRAZZO-6010_UNO-P63x63_LAZUR-4919_1-1050x700.jpg"
  },
  {
    name: "Willow",
    link: "/collectionsgoya/willow",
    image: "https://olta.eu/wp-content/uploads/2023/10/WILLOW-4z-ONz-4z_PERFECT-HARMONY-5415_1-1080x608.jpg"
  }
];

const Oltacatalogs = () => {
  return (
    <div className="px-6 py-38 w-full">
      <div className="w-full">
        <h1 className="text-left text-2xl font-bold mb-10 mt-16 text-gray-800">Collections</h1>
      </div>

      <div className="grid grid-cols-6 gap-6">
        {goyaCatalogs.map(({ name, image, link }, index) => (
          <Link
            key={index}
            to={link}
            className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition col-span-1"
          >
            <div className="relative aspect-square rounded overflow-hidden">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 filter brightness-70"
              />
              <div className="absolute bottom-8 left-0 right-0 text-white text-left py-4 px-3">
                <h2 className="text-white text-base font-extrabold tracking-tight uppercase">{name}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Oltacatalogs;
