-- MySQL dump 10.13  Distrib 8.0.25, for macos11 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `groupomania`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `groupomania` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `groupomania`;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idUser` int DEFAULT NULL,
  `idPosts` int DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser` (`idUser`),
  KEY `idPosts` (`idPosts`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`idUser`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`idPosts`) REFERENCES `Posts` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (21,20,25,'Bravo vous l\'avez bien mérité!','2021-09-09 21:47:33','2021-09-09 21:47:33'),(25,38,31,'Pouvons-nous venir à 14h?','2021-09-10 12:28:31','2021-09-10 12:28:31'),(26,38,25,'Félicitations','2021-09-10 12:32:25','2021-09-10 12:32:25');
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `media` varchar(255) DEFAULT NULL,
  `usersLikes` varchar(255) DEFAULT NULL,
  `likes` int DEFAULT '0',
  `idUsers` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idUsers` (`idUsers`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`idUsers`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (22,'Bienvenue à tous sur le nouveau forum de groupomania !','Sur ce forum vous pouvez tout partager avec vos collègues de travail, vos points de blocages, vos questions vos idées, les améliorations que vous souhaitez voir, vos vacances...\nLe forum  est à vous !\n','http://localhost:3000/images/icon-left-font-monochrome-black.png1631204849553.png',', 35, 38',2,20,'2021-09-09 16:27:29','2021-09-10 12:27:53'),(25,'contrat client AMORA','Je vous félicite pour ce nouveau contrat qui va permettre d\'augmenter nos ventes dans la catégorie sauce !',NULL,'35, 20, 31, 38',4,35,'2021-09-09 21:45:03','2021-09-10 12:27:55'),(31,'Conférence du 18 novembre au 21 novembre à Paris','Bonjour, pour tous ceux souhaitant participer à la conférence, passez à mon bureau 3B afin que je vous fournisse les documents à remplir ainsi que le PASS d\'entrée.','http://localhost:3000/images/Capture_d’écran_2021-09-10_à_08.46.37.png1631256427487.png','37, 38',2,31,'2021-09-10 06:47:07','2021-09-10 12:28:52'),(32,'Règles du forum !',' Respect et politesse dans vos échanges\n/ Pas de discours haineux, racistes ou xénophobe',NULL,'38',1,37,'2021-09-10 07:19:42','2021-09-10 12:27:47'),(33,'Création Artisanale','Bonjour le projet \"mettre en avant nos producteurs locaux\" à été un franc succès, je partage avec vous la maquette que j\'ai élaboré','http://localhost:3000/images/Capture_d’écran_2021-09-10_à_14.30.00.png1631277092012.png',NULL,0,38,'2021-09-10 12:31:32','2021-09-10 12:31:32');
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SequelizeMeta`
--

DROP TABLE IF EXISTS `SequelizeMeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `SequelizeMeta_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SequelizeMeta`
--

LOCK TABLES `SequelizeMeta` WRITE;
/*!40000 ALTER TABLE `SequelizeMeta` DISABLE KEYS */;
INSERT INTO `SequelizeMeta` VALUES ('20210810215952-create-user.js'),('20210810222016-create-posts.js'),('20210810223626-create-comments.js');
/*!40000 ALTER TABLE `SequelizeMeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `prenom` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (20,'sam','sammm','$2b$10$Z5BOl47qNv/2UY4z6WxU.ebBpNIOnCwIHQRCk8sKIUjVOXaD.v4N6','samicha2@gmail.com',1,'2021-09-05 19:53:21','2021-09-05 19:53:21'),(31,'marc','dupont','$2b$10$QnKalxRIP1POxuRG4TP2fOEdDtwgh4LELFVi9YAN7QrQVDBvHXBq.','Marcdupont@gmail.com',NULL,'2021-09-08 13:37:06','2021-09-08 13:37:06'),(35,'amelie','lin','$2b$10$ernD/uEcocrgOakk2ZkS7eQ80Fpvl0sMOnYr7A/K4EtWj2trHbC92','amelielin@gmail.com',NULL,'2021-09-09 10:08:23','2021-09-09 10:08:23'),(37,'admin','groupomania','$2b$10$bUTqpjJ5aYNoVtDRaLLxnusOD1RqHWgqpebYvv/9jZ.uWvXNzkkVy','admin@gmail.com',1,'2021-09-10 07:05:49','2021-09-10 07:05:49'),(38,'axel','dupuy','$2b$10$p.ujRFTSESpBoSt/njUYFegIfBj4rHA1OyxaegKBrIWMkfHTCCmjG','Axel@gmail.com',NULL,'2021-09-10 12:27:24','2021-09-10 12:27:24');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-10 14:45:49
