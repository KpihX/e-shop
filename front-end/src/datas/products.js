//image de vêtement pour Bébé
import bebe1 from "../assets/images/bebe/bebe_1.png"
import bebe2 from "../assets/images/bebe/bebe_2.png"
import bebe3 from "../assets/images/bebe/bebe_3.png"
import bebe4 from "../assets/images/bebe/bebe_4.png"
import bebe5 from "../assets/images/bebe/bebe_5.png"
import bebe6 from "../assets/images/bebe/bebe_6.png"
import bebe7 from "../assets/images/bebe/bebe_7.png"
import bebe8 from "../assets/images/bebe/bebe_8.png"
import bebe9 from "../assets/images/bebe/bebe_9.png"
import bebe10 from "../assets/images/bebe/bebe_10.png"
//image de vêtement pour enfant
import enfant1 from "../assets/images/enfant/enfant_1.png"
import enfant2 from "../assets/images/enfant/enfant_2.png"
import enfant3 from "../assets/images/enfant/enfant_3.png"
import enfant4 from "../assets/images/enfant/enfant_4.png"
import enfant5 from "../assets/images/enfant/enfant_5.png"
import enfant6 from "../assets/images/enfant/enfant_6.png"
import enfant7 from "../assets/images/enfant/enfant_7.png"
import enfant8 from "../assets/images/enfant/enfant_8.png"
import enfant9 from "../assets/images/enfant/enfant_9.png"
import enfant10 from "../assets/images/enfant/enfant_10.png"
//image de vêtement pour Homme
import homme1 from "../assets/images/homme/homme_1.png"
import homme2 from "../assets/images/homme/homme_2.png"
import homme3 from "../assets/images/homme/homme_3.png"
import homme4 from "../assets/images/homme/homme_4.png"
import homme5 from "../assets/images/homme/homme_5.png"
import homme6 from "../assets/images/homme/homme_6.png"
import homme7 from "../assets/images/homme/homme_7.png"
import homme8 from "../assets/images/homme/homme_8.png"
import homme9 from "../assets/images/homme/homme_9.png"
import homme10 from "../assets/images/homme/homme_10.png"
//image de vêtement pour Femme
import femme1 from "../assets/images/femme/femme_1.png"
import femme2 from "../assets/images/femme/femme_2.png"
import femme3 from "../assets/images/femme/femme_3.png"
import femme4 from "../assets/images/femme/femme_4.png"
import femme5 from "../assets/images/femme/femme_5.png"
import femme6 from "../assets/images/femme/femme_6.png"
import femme7 from "../assets/images/femme/femme_7.png"
import femme8 from "../assets/images/femme/femme_8.png"
import femme9 from "../assets/images/femme/femme_9.png"
import femme10 from "../assets/images/femme/femme_10.png"


const products = [
//vêtements bébé
{
  codePro: 1,
  idCategorie: 0,
  nomPro: "Combinaison pour bébé",
  price: 29.99,
  image: bebe1,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 2,
  idCategorie: 0,
  nomPro: "Papounet pour bébé",
  price: 19.99,
  image: bebe2,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 3,
  idCategorie: 0,
  nomPro: "Salopette pour bébé",
  price: 24.99,
  image: bebe3,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 4,
  idCategorie: 0,
  nomPro: "Salopette pour bébé",
  price: 24.99,
  image: bebe4,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 5,
  idCategorie: 0,
  nomPro: "Salopette pour bébé",
  price: 24.99,
  image: bebe5,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 6,
  idCategorie: 0,
  nomPro: "Pull-over pour bébé",
  price: 22.99,
  image: bebe6,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 7,
  idCategorie: 0,
  nomPro: "Combinaison pour bébé",
  price: 29.99,
  image: bebe7,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 8,
  idCategorie: 0,
  nomPro: "Couverture pour bébé",
  price: 17.99,
  image: bebe8,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 9,
  idCategorie: 0,
  nomPro: "Robe pour bébé",
  price: 26.99,
  image: bebe9,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 10,
  idCategorie: 0,
  nomPro: "Robe pour bébé",
  price: 26.99,
  image: bebe10,
  sizes: ["S", "M", "L", "XL"],
},

 //vêtements enfants
{
  codePro: 11,
  idCategorie: 1,
  nomPro: "Polo en jean pour enfant",
  price: 19.99,
  image: enfant1,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 12,
  idCategorie: 1,
  nomPro: "Chemise avec pantalon pour enfant",
  price: 29.99,
  image: enfant2,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 13,
  idCategorie: 1,
  nomPro: "Veste avec pantalon pour enfant",
  price: 34.99,
  image: enfant3,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 14,
  idCategorie: 1,
  nomPro: "Robe en jean pour enfant",
  price: 26.99,
  image: enfant4,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 15,
  idCategorie: 1,
  nomPro: "Pull en jean pour enfant",
  price: 22.99,
  image: enfant5,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 16,
  idCategorie: 1,
  nomPro: "Pantalon en jean pour enfant",
  price: 24.99,
  image: enfant6,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 17,
  idCategorie: 1,
  nomPro: "Costume pour enfant",
  price: 39.99,
  image: enfant7,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 18,
  idCategorie: 1,
  nomPro: "Costume pour enfant",
  price: 39.99,
  image: enfant8,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 19,
  idCategorie: 1,
  nomPro: "Robe pour enfant",
  price: 29.99,
  image: enfant9,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 20,
  idCategorie: 1,
  nomPro: "Salopette pour enfant",
  price: 24.99,
  image: enfant10,
  sizes: ["S", "M", "L", "XL"],
},

//vêtements hommes
{
  codePro: 21,
  idCategorie: 2,
  nomPro: "Costume pour homme",
  price: 199.99,
  image: homme1,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 22,
  idCategorie: 2,
  nomPro: "Chemise pour homme",
  price: 49.99,
  image: homme2,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 23,
  idCategorie: 2,
  nomPro: "Tenue traditionnelle pour homme",
  price: 129.99,
  image: homme3,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 24,
  idCategorie: 2,
  nomPro: "T-shirt pour homme",
  price: 19.99,
  image: homme4,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 25,
  idCategorie: 2,
  nomPro: "Veste pour homme",
  price: 79.99,
  image: homme5,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 26,
  idCategorie: 2,
  nomPro: "Veste pour homme",
  price: 79.99,
  image: homme6,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 27,
  idCategorie: 2,
  nomPro: "Pantalon pour homme",
  price: 59.99,
  image: homme7,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 28,
  idCategorie: 2,
  nomPro: "Pantalon pour homme",
  price: 59.99,
  image: homme8,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 29,
  idCategorie: 2,
  nomPro: "Pantalon en jean pour homme",
  price: 69.99,
  image: homme9,
  sizes: ["S", "M", "L", "XL", "XXL"],
},
{
  codePro: 30,
  idCategorie: 2,
  nomPro: "Polo pour homme",
  price: 29.99,
  image: homme10,
  sizes: ["S", "M", "L", "XL", "XXL"],
},

//vêtements femmes
{
  codePro: 31,
  idCategorie: 3,
  nomPro: "Robe de soirée",
  price: 149.99,
  image: femme1,
  sizes: ["XS", "S", "M", "L", "XL"],
},
{
  codePro: 32,
  idCategorie: 3,
  nomPro: "Sari",
  price: 199.99,
  image: femme2,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 33,
  idCategorie: 3,
  nomPro: "Mini-robe",
  price: 79.99,
  image: femme3,
  sizes: ["S", "M", "L"],
},
{
  codePro: 34,
  idCategorie: 3,
  nomPro: "Robe",
  price: 99.99,
  image: femme4,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 35,
  idCategorie: 3,
  nomPro: "Robe de soirée",
  price: 149.99,
  image: femme5,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 36,
  idCategorie: 3,
  nomPro: "Veston",
  price: 89.99,
  image: femme6,
  sizes: ["S", "M", "L"],
},
{
  codePro: 37,
  idCategorie: 3,
  nomPro: "Veston rose",
  price: 89.99,
  image: femme7,
  sizes: ["S", "M", "L"],
},
{
  codePro: 38,
  idCategorie: 3,
  nomPro: "Costume pour femme",
  price: 169.99,
  image: femme8,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 39,
  idCategorie: 3,
  nomPro: "Pantalon pour femme",
  price: 69.99,
  image: femme9,
  sizes: ["S", "M", "L", "XL"],
},
{
  codePro: 40,
  idCategorie: 3,
  nomPro: "Pantalon en jean pour femme",
  price: 79.99,
  image: femme10,
  sizes: ["S", "M", "L", "XL"],
}
]

export default products