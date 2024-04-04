-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 20, 2024 at 09:57 AM
-- Server version: 8.1.0
-- PHP Version: 8.2.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api-e-shop`
--

-- --------------------------------------------------------

--
-- Table structure for table `achatfournisseur`
--

CREATE TABLE `achatfournisseur` (
  `idAchat` int UNSIGNED NOT NULL,
  `lienFac` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateInsertion` datetime NOT NULL,
  `montantFac` decimal(8,2) NOT NULL,
  `montantCargo` decimal(8,2) NOT NULL,
  `totalKg` decimal(8,2) NOT NULL,
  `montantGlobal` decimal(8,2) NOT NULL,
  `idFour` int UNSIGNED NOT NULL,
  `idCargo` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categorie`
--

CREATE TABLE `categorie` (
  `idCat` int UNSIGNED NOT NULL,
  `nomCat` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categorie`
--

INSERT INTO `categorie` (`idCat`, `nomCat`) VALUES
(1, 'voluptas'),
(4, 'sequi'),
(9, 'omnis'),
(11, 'dolor'),
(25, 'illum'),
(150, 'est'),
(591, 'in'),
(1213, 'et'),
(1701, 'quisquam'),
(2107, 'voluptate'),
(2907, 'non'),
(3918, 'natus'),
(4462, 'ipsam'),
(4915, 'similique'),
(5254, 'delectus'),
(5470, 'voluptatem'),
(5509, 'voluptas'),
(8734, 'doloremque'),
(9783, 'veniam'),
(16618, 'asperiores'),
(20623, 'dolorem'),
(22966, 'accusamus'),
(52786, 'pariatur'),
(99184, 'sint'),
(322017, 'sint'),
(347992, 'ipsum'),
(511116, 'nisi'),
(779065, 'aliquam'),
(819926, 'non'),
(1636853, 'eum'),
(3225709, 'possimus'),
(4092298, 'a'),
(7602778, 'ut'),
(7665144, 'ullam'),
(7835499, 'blanditiis'),
(7877913, 'sunt'),
(8002017, 'ratione'),
(21170673, 'minima'),
(33908275, 'fugiat'),
(46142303, 'est'),
(54462282, 'iste'),
(75350278, 'molestiae'),
(88980052, 'sed'),
(151984492, 'ullam'),
(197549456, 'perferendis'),
(251539797, 'totam'),
(252008802, 'reprehenderit'),
(514784701, 'minima'),
(735835423, 'repellendus'),
(902623446, 'aut');

-- --------------------------------------------------------

--
-- Table structure for table `clientcarte`
--

CREATE TABLE `clientcarte` (
  `matr` int UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sexe` tinyint NOT NULL,
  `dateNaiss` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `idVille` int UNSIGNED NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `whatsapp` tinyint NOT NULL,
  `creation` datetime NOT NULL,
  `point` int UNSIGNED NOT NULL,
  `montantTontine` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `commande`
--

CREATE TABLE `commande` (
  `idCommande` int UNSIGNED NOT NULL,
  `dateCom` timestamp NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `nomClient` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `commentaire` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `livrer` tinyint NOT NULL,
  `avance` decimal(8,2) NOT NULL,
  `remise` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` tinyint NOT NULL,
  `idVille` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expedition`
--

CREATE TABLE `expedition` (
  `idExp` int UNSIGNED NOT NULL,
  `idVille` int NOT NULL,
  `transporteur` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile1` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `facture`
--

CREATE TABLE `facture` (
  `idFac` int UNSIGNED NOT NULL,
  `dateFac` datetime NOT NULL,
  `remise` decimal(8,2) NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `tel` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeFac` smallint NOT NULL,
  `idCaissiere` bigint NOT NULL,
  `capital` decimal(8,2) NOT NULL,
  `tva` decimal(8,2) NOT NULL,
  `codePromo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `fournisseur`
--

CREATE TABLE `fournisseur` (
  `idFour` int UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pays` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateCreation` datetime NOT NULL,
  `type` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gestionnaire`
--

CREATE TABLE `gestionnaire` (
  `idGest` int UNSIGNED NOT NULL,
  `nomGest` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `typeGest` int NOT NULL,
  `login` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pwd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actif` tinyint NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gestionstock`
--

CREATE TABLE `gestionstock` (
  `idStock` int UNSIGNED NOT NULL,
  `qte` int UNSIGNED NOT NULL,
  `dateStock` datetime NOT NULL,
  `operation` tinyint NOT NULL,
  `idGest` int UNSIGNED NOT NULL,
  `codePro` int UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `influenceur`
--

CREATE TABLE `influenceur` (
  `idInf` int UNSIGNED NOT NULL,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codePromo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actif` tinyint NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `pwd` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lignecarte`
--

CREATE TABLE `lignecarte` (
  `id` bigint UNSIGNED NOT NULL,
  `idFac` int UNSIGNED NOT NULL,
  `idCarte` int UNSIGNED NOT NULL,
  `point` int NOT NULL,
  `dateOpera` datetime NOT NULL,
  `montantFac` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lignecommande`
--

CREATE TABLE `lignecommande` (
  `idLignCom` int UNSIGNED NOT NULL,
  `idCommande` int UNSIGNED NOT NULL,
  `codePro` int UNSIGNED NOT NULL,
  `quantite` int NOT NULL,
  `taille` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `couleur` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disponible` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lignefacture`
--

CREATE TABLE `lignefacture` (
  `idLFac` int UNSIGNED NOT NULL,
  `codePro` int UNSIGNED NOT NULL,
  `idFac` int UNSIGNED NOT NULL,
  `prix` decimal(8,2) NOT NULL,
  `qte` smallint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messagerie`
--

CREATE TABLE `messagerie` (
  `idmsg` int UNSIGNED NOT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wsms` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateEnvoie` datetime NOT NULL,
  `type` int NOT NULL,
  `service` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(105, '2014_10_12_000000_create_users_table', 1),
(106, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(107, '2019_08_19_000000_create_failed_jobs_table', 1),
(108, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(109, '2024_02_29_233330_create_categorie_table', 1),
(110, '2024_02_29_233340_create_produit_table', 1),
(111, '2024_03_01_050226_create_photo_table', 1),
(112, '2024_03_01_141908_create_villes_table', 1),
(113, '2024_03_01_175029_create_expedition_table', 1),
(114, '2024_03_01_192929_create_fournisseur_table', 1),
(115, '2024_03_01_194546_create_influenceur_table', 1),
(116, '2024_03_01_195311_create_paie_influenceur_table', 1),
(117, '2024_03_01_200124_create_achatfournisseur_table', 1),
(118, '2024_03_01_202624_create_facture_table', 1),
(119, '2024_03_01_203437_create_commande_table', 1),
(120, '2024_03_01_204659_create_lignecommande_table', 1),
(121, '2024_03_01_204946_create_lignefacture_table', 1),
(122, '2024_03_01_231104_create_clientcarte_table', 1),
(123, '2024_03_02_163129_create_gestionnaire_table', 1),
(124, '2024_03_02_172151_create_gestionstock_table', 1),
(125, '2024_03_02_173528_create_tontine_table', 1),
(126, '2024_03_02_174610_create_lignecarte_table', 1),
(127, '2024_03_02_184534_create_messagerie_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `paieinfluenceur`
--

CREATE TABLE `paieinfluenceur` (
  `idPaiement` int UNSIGNED NOT NULL,
  `datePaie` datetime NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `idInf` int UNSIGNED NOT NULL,
  `validite` tinyint NOT NULL,
  `commentaire` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `photo`
--

CREATE TABLE `photo` (
  `idPhoto` int UNSIGNED NOT NULL,
  `lienPhoto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `codePro` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `produit`
--

CREATE TABLE `produit` (
  `codePro` int UNSIGNED NOT NULL,
  `idCategorie` int UNSIGNED NOT NULL,
  `nomPro` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` decimal(8,0) NOT NULL,
  `qte` int UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `codeArrivage` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `actif` tinyint NOT NULL,
  `dateInsertion` date NOT NULL,
  `prixAchat` decimal(8,0) NOT NULL,
  `pourcentage` decimal(2,2) NOT NULL,
  `promo` tinyint NOT NULL,
  `size1` int NOT NULL,
  `size2` int NOT NULL,
  `typeSize` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `produit`
--

INSERT INTO `produit` (`codePro`, `idCategorie`, `nomPro`, `prix`, `qte`, `description`, `codeArrivage`, `actif`, `dateInsertion`, `prixAchat`, `pourcentage`, `promo`, `size1`, `size2`, `typeSize`) VALUES
(108964, 75350278, 'aut', '47', 0, 'Voluptas molestiae deserunt est soluta quam voluptatibus. Quas blanditiis excepturi voluptas occaecati deleniti vel quasi.', 'quos', 6, '2024-03-16', '20', '0.00', 8, 121235276, 6, 4250),
(121662, 1636853, 'veritatis', '20', 858, 'Consequatur vitae quia consequatur voluptas dolor nihil. Ratione ut est omnis perspiciatis. Et magni ducimus ex voluptate quo dolorem.', 'dolorem', 0, '2024-03-16', '27', '0.00', 2, 8735881, 233, 66407741),
(135227, 591, 'odio', '51', 6, 'Quia et rerum voluptatem sed quis. Qui nobis sed modi. Reiciendis odio voluptas aliquam ipsum perspiciatis modi recusandae et. Ducimus dolor doloribus aliquid assumenda maxime.', 'aliquid', 9, '2024-03-16', '89', '0.00', 6, 689, 51591529, 1155),
(170679, 819926, 'hic', '59', 726287, 'Repudiandae reprehenderit modi soluta recusandae. Doloremque nobis veritatis quos corrupti consequatur delectus facere. Corporis neque et ea.', 'minus', 2, '2024-03-16', '44', '0.00', 2, 0, 7, 4),
(180475, 21170673, 'qui', '81', 517, 'Non culpa repudiandae nobis. Quisquam unde dolorem totam laborum occaecati. A ea nisi rerum maiores.', 'quam', 1, '2024-03-16', '87', '0.00', 9, 5778, 3692, 71496),
(187790, 88980052, 'qui', '34', 12, 'Id a nostrum dolor architecto consectetur dolore. Dolore beatae rerum autem rerum voluptatem aut. Qui occaecati ut ut totam cum iste necessitatibus modi. Sapiente vitae quo explicabo voluptatem aut.', 'ut', 4, '2024-03-16', '51', '0.00', 3, 130, 781, 39389),
(213370, 7602778, 'illo', '31', 9904, 'Ut corporis eum veniam aspernatur sed nisi. Cumque est temporibus sunt. Ex dolorem quae rem unde et quas.', 'autem', 8, '2024-03-16', '61', '0.00', 7, 302786, 6237210, 22),
(223049, 11, 'sit', '58', 59, 'Voluptatem veniam pariatur vel maiores possimus eius numquam. Totam ut et excepturi non voluptates quaerat nam. Non qui ipsum et ipsam commodi.', 'eum', 3, '2024-03-16', '76', '0.00', 9, 286, 56799448, 3648),
(243573, 151984492, 'reiciendis', '78', 8448327, 'Fuga labore provident natus officia dolor est dolore. Accusamus quam voluptatibus error nobis facilis ipsum vel. Quod autem magnam quasi voluptas qui impedit. Fugiat facere id nihil reiciendis id.', 'et', 9, '2024-03-16', '82', '0.00', 6, 6576417, 83, 9811653),
(256300, 4, 'fugit', '30', 1823135, 'Itaque numquam quas adipisci distinctio laboriosam. Hic eius dolorum impedit a accusamus sed sapiente nesciunt. Illum veniam est explicabo fuga. Totam enim minima aliquid possimus.', 'ea', 2, '2024-03-16', '73', '0.00', 5, 470299, 2, 980),
(265424, 347992, 'minima', '18', 96791814, 'Veniam cum et distinctio ex. Harum mollitia quia quis voluptatibus illum quae. Odio et eaque eius perspiciatis rem consequatur sit.', 'quas', 4, '2024-03-16', '14', '0.00', 4, 40863033, 2233394, 93957918),
(278760, 22966, 'officiis', '24', 32, 'Neque animi similique quia ab repellendus consequatur. Praesentium repellat consequatur sit vero corrupti qui. Pariatur voluptates incidunt dolor quasi. Deserunt suscipit alias delectus.', 'eius', 3, '2024-03-16', '60', '0.00', 4, 327512, 150, 7260),
(289248, 7665144, 'et', '65', 7, 'Est aut explicabo quos dolore aut et. Iste expedita eius nihil molestiae mollitia ratione. Eligendi amet facere consequatur sit. Suscipit voluptatum molestiae ullam eligendi.', 'qui', 6, '2024-03-16', '6', '0.00', 7, 0, 666411, 9699481),
(331326, 8002017, 'ea', '97', 5, 'Rerum asperiores explicabo qui mollitia veritatis eos quia. Consequatur delectus molestiae tempore maiores sunt dignissimos sit. Culpa ut autem nihil ad blanditiis accusantium ut.', 'quaerat', 2, '2024-03-16', '56', '0.00', 7, 40699186, 3, 813788),
(353827, 8002017, 'a', '10', 5500300, 'Natus fugiat autem ut saepe sed. Nobis animi et magni quam. Ut harum qui expedita consequuntur. Sed cum quasi sunt corporis iusto ex.', 'rerum', 6, '2024-03-16', '69', '0.00', 9, 900, 537263, 7204),
(395660, 779065, 'dolorem', '50', 4, 'Corporis perspiciatis dolorum dolor. Et aliquam inventore eos rerum non quam quaerat.', 'facilis', 9, '2024-03-16', '2', '0.00', 5, 18298, 7025, 138988196),
(452297, 46142303, 'deleniti', '69', 873843031, 'Et dolorum beatae aut et mollitia. Debitis repellendus distinctio voluptatem sed nisi. Corporis nihil officiis eos aspernatur voluptatum eveniet. Qui molestias hic non eum at velit iusto.', 'molestias', 8, '2024-03-16', '95', '0.00', 2, 492257, 923981505, 2),
(455334, 251539797, 'deserunt', '47', 2, 'Qui quam qui perspiciatis. Molestiae qui asperiores eaque placeat quaerat totam. Eaque repellat quo itaque ad voluptas exercitationem. Itaque quae quis asperiores suscipit praesentium fuga et.', 'et', 3, '2024-03-16', '29', '0.00', 8, 7574126, 9, 500410),
(469405, 7665144, 'aut', '93', 92544, 'Itaque nesciunt et corrupti qui dolorum nemo. Est voluptatibus deleniti nisi et possimus. Cum eaque illo nisi iusto quia. Cupiditate modi repellendus est numquam ea.', 'odit', 5, '2024-03-16', '58', '0.00', 7, 89651723, 4, 817360819),
(485628, 1, 'ex', '98', 427, 'Quia aut nesciunt voluptas ullam similique aspernatur quidem dolores. Sunt ut consequatur cum dolores ea dolorem. Ea et in commodi assumenda iste.', 'esse', 2, '2024-03-16', '35', '0.00', 8, 8820774, 4072, 25172402),
(511038, 4915, 'sed', '23', 90216841, 'Necessitatibus ex nihil consequatur deleniti et facere officia. Perspiciatis ducimus quisquam et officia. Aut sit totam praesentium minima voluptas delectus sed qui.', 'expedita', 0, '2024-03-16', '53', '0.00', 4, 41742377, 5, 983772643),
(519953, 4462, 'ipsum', '47', 18403381, 'Sunt dolorem possimus nulla incidunt. Autem minus excepturi id non id aliquid. Ut voluptatem eos eum laudantium quos aut.', 'reprehenderit', 4, '2024-03-16', '51', '0.00', 6, 77726307, 248328, 73820),
(555680, 8002017, 'sed', '82', 48, 'Sint molestias labore quia assumenda. Quis debitis excepturi et atque corporis unde delectus. Autem ipsum incidunt quia sit. Ut sed architecto sit illo unde illum ducimus voluptatem.', 'et', 2, '2024-03-16', '100', '0.00', 6, 2, 8, 5),
(556894, 252008802, 'autem', '71', 9849, 'Vero quia magni dolor fugiat modi assumenda. Architecto voluptas dolor et fugiat. Fugit asperiores voluptate perspiciatis consequuntur ea consectetur assumenda.', 'beatae', 6, '2024-03-16', '47', '0.00', 7, 43901, 5946, 928858),
(598938, 735835423, 'et', '74', 6515, 'Ea magnam illum similique blanditiis. Consequatur vel dolorum fuga sint. Aut consectetur et molestiae veniam ullam dolor dolorem. Quia iure nobis voluptatibus totam nulla accusamus.', 'voluptatem', 9, '2024-03-16', '9', '0.00', 8, 399724223, 49, 8515507),
(601655, 591, 'autem', '56', 118461537, 'Mollitia ut nisi aliquam aut. Sed tenetur itaque voluptatibus ab facilis. Ad qui ut quo dolore quia quos sint. Dolorem alias eos voluptas doloremque voluptatum amet.', 'ex', 6, '2024-03-16', '80', '0.00', 7, 89984364, 7776761, 509),
(603146, 7877913, 'asperiores', '23', 580027815, 'Quo hic aut dolorem ut. Exercitationem rerum dolores consequatur. Quasi est reiciendis inventore excepturi quibusdam. Et qui enim corrupti corrupti ad quia.', 'est', 3, '2024-03-16', '51', '0.00', 7, 4681600, 64030, 5405),
(603377, 819926, 'velit', '6', 29883568, 'Repudiandae vero laborum vel. Delectus est rem dolorem.', 'dolores', 8, '2024-03-16', '21', '0.00', 5, 16407, 11893656, 7),
(606004, 197549456, 'est', '73', 411176597, 'Vel et aperiam dolor exercitationem. Architecto pariatur dignissimos quidem autem. Sed aliquam deleniti aut autem ea iure voluptates fuga. Quisquam sunt impedit laborum optio voluptates.', 'qui', 0, '2024-03-16', '100', '0.00', 1, 68217, 495, 5),
(610584, 5470, 'commodi', '73', 3448, 'Unde amet sapiente odio cum voluptatem. Temporibus qui in ea modi. Omnis iusto cumque voluptatem beatae culpa quo sint.', 'aspernatur', 6, '2024-03-16', '45', '0.00', 6, 201485710, 826, 74244),
(655401, 99184, 'in', '8', 0, 'Doloremque accusamus eius nesciunt illum. Reprehenderit odio nostrum dolores laboriosam consequuntur. Ut ea quaerat ut vel necessitatibus minus.', 'repellat', 0, '2024-03-16', '13', '0.00', 8, 43, 131038, 28445),
(689563, 322017, 'dolore', '29', 4, 'Repellendus sit quia inventore nisi assumenda ut rerum et. Corporis voluptate voluptatum id rerum vero omnis quia omnis. Debitis tenetur fugiat adipisci eligendi nulla harum sint.', 'enim', 3, '2024-03-16', '19', '0.00', 3, 33407, 32118494, 37),
(700283, 5254, 'et', '86', 37942628, 'Nemo nobis possimus voluptatem consectetur odit commodi cum. Sit ut et placeat porro. Accusantium enim facere molestias nam repellat ut.', 'provident', 1, '2024-03-16', '36', '0.00', 4, 731178, 3549, 6575816),
(705814, 11, 'tenetur', '18', 49446302, 'Adipisci totam animi magni voluptas nulla itaque voluptatum. Sapiente numquam accusamus dolore architecto autem.', 'magnam', 7, '2024-03-16', '49', '0.00', 6, 255, 977373, 575736),
(761367, 150, 'architecto', '31', 31406, 'Aliquid consequatur maxime qui nostrum tempora natus. Fuga beatae qui et facilis. Delectus dolores excepturi aperiam soluta ut sunt et et.', 'reprehenderit', 7, '2024-03-16', '37', '0.00', 6, 7323, 990, 5725),
(770936, 22966, 'vero', '13', 5472266, 'Est omnis in dolores enim error qui. Quia quia doloremque iure repellat. Dicta ut ut magni ad aut qui.', 'ipsum', 6, '2024-03-16', '4', '0.00', 5, 633314246, 372, 0),
(795719, 347992, 'alias', '82', 1153, 'Explicabo nulla sit eligendi est assumenda rerum officia. Dicta recusandae dolor facilis deleniti odio ut aliquid.', 'aut', 2, '2024-03-16', '61', '0.00', 8, 369493, 19505, 841960),
(816637, 7835499, 'blanditiis', '43', 696, 'Libero possimus amet rem debitis distinctio quia. Placeat voluptas vero harum est porro repellendus aut. Cumque animi alias nobis ex qui beatae aut.', 'incidunt', 5, '2024-03-16', '44', '0.00', 6, 5396343, 25, 126942),
(845861, 347992, 'voluptatum', '39', 399, 'Odit delectus nesciunt qui. Corporis optio sit quidem deleniti officia autem officiis et.', 'quas', 1, '2024-03-16', '20', '0.00', 1, 24473, 7, 7866),
(847211, 514784701, 'necessitatibus', '49', 985, 'Aut quia dignissimos est possimus placeat earum debitis. Hic architecto debitis quae culpa quasi. Ut pariatur illum commodi totam sit ipsam et.', 'ipsa', 0, '2024-03-16', '51', '0.00', 8, 98758, 55027, 372),
(852503, 4915, 'exercitationem', '80', 7712610, 'Molestiae nam aliquam possimus deserunt dolor voluptatem. Sequi consequatur consequatur et quo. Fugiat blanditiis perspiciatis ut ab. Tenetur dolorem sint velit iste illo.', 'rerum', 2, '2024-03-16', '0', '0.00', 5, 476123, 75, 61538434),
(860741, 88980052, 'et', '19', 54, 'Eligendi quia illo totam et accusamus soluta iste. Et est inventore voluptatem similique vero impedit.', 'accusamus', 8, '2024-03-16', '67', '0.00', 7, 2335, 805841321, 162),
(873146, 4, 'hic', '99', 41512853, 'Quis numquam sit sunt sit similique. Et tenetur eveniet ab optio dolores adipisci dolore aut. Perferendis ullam et culpa unde.', 'omnis', 6, '2024-03-16', '80', '0.00', 2, 355835, 144905681, 186048),
(884223, 2107, 'id', '87', 7091059, 'Quia repudiandae repellat porro. Eligendi quis ducimus ipsam architecto. Nobis dignissimos provident et aliquid delectus dolorem esse. Officia et nostrum natus quis magni.', 'optio', 8, '2024-03-16', '48', '0.00', 4, 586857835, 39, 952268),
(886211, 197549456, 'et', '31', 521825095, 'Dignissimos commodi unde similique dicta ipsa modi non sapiente. Veritatis doloribus tempora fugit itaque id.', 'et', 7, '2024-03-16', '54', '0.00', 7, 22661733, 45106, 46),
(906103, 22966, 'sit', '27', 40019781, 'Ut et tenetur excepturi est. Earum sint nam recusandae doloremque ut est. Neque nihil aut voluptas voluptatum. Numquam voluptas et incidunt commodi. Esse sit explicabo praesentium omnis id beatae.', 'commodi', 0, '2024-03-16', '29', '0.00', 9, 9, 430, 1),
(931894, 4462, 'eum', '47', 20959, 'Nesciunt dicta aspernatur aut voluptas qui quasi. Ut ab sunt excepturi. Possimus enim sit ipsam sed rem corrupti. Consequatur quo cum autem debitis sapiente tempora id.', 'delectus', 9, '2024-03-16', '77', '0.00', 1, 99, 452154629, 46219),
(936018, 7602778, 'qui', '29', 5574, 'Veniam officia adipisci aut sequi omnis at voluptates. Placeat blanditiis hic a et et.', 'corrupti', 1, '2024-03-16', '87', '0.00', 9, 773, 30937, 250148),
(971339, 5470, 'voluptates', '24', 119, 'Reiciendis ex amet rerum aut qui labore. Omnis deleniti voluptatibus voluptatibus quia beatae. Iure expedita ut ex assumenda qui fuga nobis modi.', 'illo', 1, '2024-03-16', '60', '0.00', 8, 3829707, 380855, 41146732),
(992378, 7835499, 'et', '12', 413, 'Perferendis et consequatur corporis fugit fuga. Sit sint assumenda suscipit placeat quia.', 'exercitationem', 2, '2024-03-16', '50', '0.00', 4, 5, 94271, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tontine`
--

CREATE TABLE `tontine` (
  `idTontine` int UNSIGNED NOT NULL,
  `dateCotisation` datetime NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `commentaire` text COLLATE utf8mb4_unicode_ci,
  `idGest` int UNSIGNED NOT NULL,
  `validite` tinyint NOT NULL,
  `idCarte` int UNSIGNED NOT NULL,
  `action` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Rosie Roberts', 'klein.ernestina@example.com', '2024-03-16 11:52:15', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'nvMxmk4cda', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(2, 'Prof. Loraine Bartoletti Jr.', 'jessy.okeefe@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'eMwtoDiiQS', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(3, 'Jordy Sipes', 'kathlyn37@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'WoUqQ3YmyP', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(4, 'Stevie Zemlak', 'bryon.schiller@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'OjrC5Zm746', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(5, 'Beverly Langosh I', 'rshields@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '25H15ZNxR7', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(6, 'Donavon Spencer PhD', 'dach.alize@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'jlY5LfZifU', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(7, 'Trystan Rempel', 'vallie.hermann@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'm27Ka60ZHu', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(8, 'Mrs. Araceli Kautzer', 'hstokes@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'W3yD0xnVGB', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(9, 'Wilfredo Waters', 'cloyd.okon@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'lsZ1Rmyx7m', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(10, 'Dr. Lizzie Gislason', 'znikolaus@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'xWJMtIM8xg', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(11, 'Meggie O\'Kon V', 'wyman27@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'yodYjJeIBG', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(12, 'Carlotta Larkin', 'carter.rasheed@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '0vWu9X7GEN', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(13, 'Mr. Keagan Glover', 'cathy55@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'jVZzNWpoZP', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(14, 'Annie Braun', 'murray.twila@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'zwCmoUzxSF', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(15, 'Antonietta O\'Conner', 'yost.russel@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'F7dpLfC47s', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(16, 'Kaley Wuckert', 'sheila04@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'GeW1WpVOe3', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(17, 'Cynthia Bode', 'volkman.darion@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'llqkDeCxW9', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(18, 'Prof. Sterling Wilkinson III', 'weber.theodora@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'njZ616qnqu', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(19, 'Abner Weber', 'vaughn61@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'jqeenH7FQz', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(20, 'Dr. Brennan Stanton', 'slockman@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'rL5lMIqTyY', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(21, 'Jovany Keeling', 'ehalvorson@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'KZBnkJvudX', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(22, 'Mr. Maximus Farrell', 'eda51@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'uw6pgDU40T', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(23, 'Magnus O\'Reilly Sr.', 'roberts.luna@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'LESEEnBrr9', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(24, 'Tamara Rodriguez', 'damaris14@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'ZENqjQ0P5I', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(25, 'Mrs. Pearl Smitham II', 'eziemann@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'XUFxw4Qe7R', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(26, 'Stan Casper', 'rene62@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'whQi34K3DQ', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(27, 'Florencio Streich', 'oswaldo.reichert@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '8wjcBFI2bJ', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(28, 'Kendra Lindgren II', 'zlemke@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'Q2PTR6ctPB', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(29, 'Chaya Will DDS', 'evalyn46@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '8BStaNYOgX', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(30, 'Miss Theresa Goyette V', 'felix.morissette@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'kbDGVTQBUD', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(31, 'Malcolm Nikolaus', 'bradtke.darren@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'bvMQtT161L', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(32, 'Aric Mayer', 'bahringer.sabina@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'NYllomA7rZ', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(33, 'Ryleigh Larson', 'jacky12@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'U0M7ggf4hj', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(34, 'Prof. Tanya Upton', 'tjacobson@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '4lCe6u1nV8', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(35, 'Grant Schaefer', 'orland.feest@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'h7CvRJ1JYl', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(36, 'Dr. Ethel Hettinger PhD', 'nigel32@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'jJZjiw1g4l', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(37, 'Ilene Hamill', 'abbie.kassulke@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'IsvR7JwYKV', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(38, 'Chyna Harris', 'ikreiger@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '5mDrHCxsZA', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(39, 'Dr. Valentina Botsford DDS', 'fidel37@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'kSuBHzZMdA', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(40, 'Caitlyn Herman Sr.', 'jenifer30@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'OonKzW2MgY', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(41, 'Tabitha Stroman', 'qwiza@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'fc4ckzKxl1', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(42, 'Vivienne Stark', 'cmante@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'POcldK2n1X', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(43, 'Brisa Harvey', 'norwood00@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'BrQ3nt8YWL', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(44, 'Arjun Kris', 'schulist.andreane@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'pqOyuulgNT', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(45, 'Miss Novella Ferry IV', 'ebony47@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'iNjeWoud0Y', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(46, 'Jodie Grant', 'oconnell.arno@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'AasrFPGde7', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(47, 'Emma Hackett', 'ufadel@example.net', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '06ZV5HtIdu', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(48, 'Marlee Thompson', 'ruthe41@example.org', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', '4HJGVa618G', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(49, 'Norwood Huel', 'morris87@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'SCs1U6P4t5', '2024-03-16 11:52:16', '2024-03-16 11:52:16'),
(50, 'Deanna Beier', 'emmy28@example.com', '2024-03-16 11:52:16', '$2y$12$B2gQZlJ.XTIY1DRcVOuKj.pAg3nR/o9Aci88bNJ/ggb9X5KmqVhru', 'inAH8pjGy5', '2024-03-16 11:52:16', '2024-03-16 11:52:16');

-- --------------------------------------------------------

--
-- Table structure for table `ville`
--

CREATE TABLE `ville` (
  `idVille` int NOT NULL,
  `libelle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achatfournisseur`
--
ALTER TABLE `achatfournisseur`
  ADD PRIMARY KEY (`idAchat`),
  ADD KEY `achatfournisseur_idfour_foreign` (`idFour`);

--
-- Indexes for table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`idCat`);

--
-- Indexes for table `clientcarte`
--
ALTER TABLE `clientcarte`
  ADD PRIMARY KEY (`matr`);

--
-- Indexes for table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`idCommande`),
  ADD KEY `commande_idville_foreign` (`idVille`);

--
-- Indexes for table `expedition`
--
ALTER TABLE `expedition`
  ADD PRIMARY KEY (`idExp`),
  ADD KEY `expedition_idville_foreign` (`idVille`);

--
-- Indexes for table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`idFac`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `fournisseur`
--
ALTER TABLE `fournisseur`
  ADD PRIMARY KEY (`idFour`);

--
-- Indexes for table `gestionnaire`
--
ALTER TABLE `gestionnaire`
  ADD PRIMARY KEY (`idGest`);

--
-- Indexes for table `gestionstock`
--
ALTER TABLE `gestionstock`
  ADD PRIMARY KEY (`idStock`),
  ADD KEY `gestionstock_idgest_foreign` (`idGest`),
  ADD KEY `gestionstock_codepro_foreign` (`codePro`);

--
-- Indexes for table `influenceur`
--
ALTER TABLE `influenceur`
  ADD PRIMARY KEY (`idInf`);

--
-- Indexes for table `lignecarte`
--
ALTER TABLE `lignecarte`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lignecarte_idcarte_foreign` (`idCarte`),
  ADD KEY `lignecarte_idfac_foreign` (`idFac`);

--
-- Indexes for table `lignecommande`
--
ALTER TABLE `lignecommande`
  ADD PRIMARY KEY (`idLignCom`),
  ADD KEY `lignecommande_idcommande_foreign` (`idCommande`),
  ADD KEY `lignecommande_codepro_foreign` (`codePro`);

--
-- Indexes for table `lignefacture`
--
ALTER TABLE `lignefacture`
  ADD PRIMARY KEY (`idLFac`),
  ADD KEY `lignefacture_idfac_foreign` (`idFac`),
  ADD KEY `lignefacture_codepro_foreign` (`codePro`);

--
-- Indexes for table `messagerie`
--
ALTER TABLE `messagerie`
  ADD PRIMARY KEY (`idmsg`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `paieinfluenceur`
--
ALTER TABLE `paieinfluenceur`
  ADD PRIMARY KEY (`idPaiement`),
  ADD KEY `paieinfluenceur_idinf_foreign` (`idInf`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`idPhoto`),
  ADD KEY `photo_codepro_foreign` (`codePro`);

--
-- Indexes for table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`codePro`),
  ADD KEY `produit_idcategorie_foreign` (`idCategorie`);

--
-- Indexes for table `tontine`
--
ALTER TABLE `tontine`
  ADD PRIMARY KEY (`idTontine`),
  ADD KEY `tontine_idgest_foreign` (`idGest`),
  ADD KEY `tontine_idcarte_foreign` (`idCarte`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `ville`
--
ALTER TABLE `ville`
  ADD PRIMARY KEY (`idVille`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lignecarte`
--
ALTER TABLE `lignecarte`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achatfournisseur`
--
ALTER TABLE `achatfournisseur`
  ADD CONSTRAINT `achatfournisseur_idfour_foreign` FOREIGN KEY (`idFour`) REFERENCES `fournisseur` (`idFour`);

--
-- Constraints for table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_idville_foreign` FOREIGN KEY (`idVille`) REFERENCES `ville` (`idVille`);

--
-- Constraints for table `expedition`
--
ALTER TABLE `expedition`
  ADD CONSTRAINT `expedition_idville_foreign` FOREIGN KEY (`idVille`) REFERENCES `ville` (`idVille`);

--
-- Constraints for table `gestionstock`
--
ALTER TABLE `gestionstock`
  ADD CONSTRAINT `gestionstock_codepro_foreign` FOREIGN KEY (`codePro`) REFERENCES `produit` (`codePro`),
  ADD CONSTRAINT `gestionstock_idgest_foreign` FOREIGN KEY (`idGest`) REFERENCES `gestionnaire` (`idGest`);

--
-- Constraints for table `lignecarte`
--
ALTER TABLE `lignecarte`
  ADD CONSTRAINT `lignecarte_idcarte_foreign` FOREIGN KEY (`idCarte`) REFERENCES `clientcarte` (`matr`),
  ADD CONSTRAINT `lignecarte_idfac_foreign` FOREIGN KEY (`idFac`) REFERENCES `facture` (`idFac`);

--
-- Constraints for table `lignecommande`
--
ALTER TABLE `lignecommande`
  ADD CONSTRAINT `lignecommande_codepro_foreign` FOREIGN KEY (`codePro`) REFERENCES `produit` (`codePro`),
  ADD CONSTRAINT `lignecommande_idcommande_foreign` FOREIGN KEY (`idCommande`) REFERENCES `commande` (`idCommande`);

--
-- Constraints for table `lignefacture`
--
ALTER TABLE `lignefacture`
  ADD CONSTRAINT `lignefacture_codepro_foreign` FOREIGN KEY (`codePro`) REFERENCES `produit` (`codePro`),
  ADD CONSTRAINT `lignefacture_idfac_foreign` FOREIGN KEY (`idFac`) REFERENCES `facture` (`idFac`);

--
-- Constraints for table `paieinfluenceur`
--
ALTER TABLE `paieinfluenceur`
  ADD CONSTRAINT `paieinfluenceur_idinf_foreign` FOREIGN KEY (`idInf`) REFERENCES `influenceur` (`idInf`);

--
-- Constraints for table `photo`
--
ALTER TABLE `photo`
  ADD CONSTRAINT `photo_codepro_foreign` FOREIGN KEY (`codePro`) REFERENCES `produit` (`codePro`);

--
-- Constraints for table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_idcategorie_foreign` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCat`);

--
-- Constraints for table `tontine`
--
ALTER TABLE `tontine`
  ADD CONSTRAINT `tontine_idcarte_foreign` FOREIGN KEY (`idCarte`) REFERENCES `clientcarte` (`matr`),
  ADD CONSTRAINT `tontine_idgest_foreign` FOREIGN KEY (`idGest`) REFERENCES `gestionnaire` (`idGest`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
