import seedPlanting from "../assets/seed-planting.png";
import seed from "../assets/seed.png";
import vegetables from "../assets/vegetables-salad.png";
import plant from "../assets/plant_v2.png";

const phases = [
  {
    title: "Sjeme i priprema tla",
    number: "01",
    icon: seed,
    iconBg: "#555",
    date: "March 2020 - April 2021",
    points: [
      "Obavezno koristiti eko-sjeme.",
      "Odabrati usjeve i sorte biljaka otporne na lokalne štetočine.",
      "Napraviti granice polja i zone unutar polja koje privlače korisne kukce.",
    ],
  },
  {
    title: "Sadnja",
    number: "02",
    icon: seedPlanting,
    iconBg: "#eaf7ee",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Stvoriti uvjete u tlu i nadzemne uvjete za zdrave biljke s poboljšanim obrambenim mehanizmima.",
      "Obrada tla prije sadnje agrotehničkim zahvatima.",
      "Dodati velike količine organskog materijala prije sadnje (životinjski gnoj, kompost, lišće drveća, pokrovni usjev itd.).",
    ],
  },
  {
    title: "Zaštita i njega",
    number: "03",
    icon: plant,
    iconBg: "#555",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Provjeravanje ima li problema sa štetočinama te ako ima pobrinuti se za taj problem.",
      "Briga o navodnjavanju tla, ako je količina kiše nedovoljna.",
      "Obrezivanje stabala kako bi se smanjila vlažnost.",
      "Kultiviranje za suzbijanje korova.",
    ],
  },
  {
    title: "Berba/sjetva",
    number: "04",
    icon: vegetables,
    iconBg: "#eaf7ee",
    date: "Jan 2023 - Present",
    points: [
      "Krajnji cilj je optimalan prinos i kvaliteta usjeva.",
      "Važno je ostvariti visoke pozitivne i niske negativne učinke na okoliš",
      "Plodovi uzgojeni ekološkim načinom su zdravi i imaju visoku kvalitetu.",
    ],
  },
];

export { phases };
