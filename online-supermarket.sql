-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: online-supermarket
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart-items`
--

DROP TABLE IF EXISTS `cart-items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart-items` (
  `Item_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Product_ID` bigint unsigned NOT NULL,
  `Amount` int unsigned NOT NULL,
  `Total_Price` decimal(5,2) unsigned NOT NULL,
  `Cart_ID` bigint unsigned NOT NULL,
  PRIMARY KEY (`Item_ID`),
  UNIQUE KEY `Item_ID_UNIQUE` (`Item_ID`),
  KEY `FK_Product_ID_idx` (`Product_ID`),
  KEY `FK_Cart_ID_idx` (`Cart_ID`),
  CONSTRAINT `FK_Cart_ID` FOREIGN KEY (`Cart_ID`) REFERENCES `shopping-carts` (`Cart_ID`),
  CONSTRAINT `FK_Product_ID` FOREIGN KEY (`Product_ID`) REFERENCES `products` (`Product_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=157 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart-items`
--

LOCK TABLES `cart-items` WRITE;
/*!40000 ALTER TABLE `cart-items` DISABLE KEYS */;
INSERT INTO `cart-items` VALUES (146,1,2,5.98,23),(154,1,1,2.99,25);
/*!40000 ALTER TABLE `cart-items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `Order_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Order_Owner` bigint unsigned NOT NULL,
  `Cart` bigint unsigned NOT NULL,
  `Total_Price` int unsigned NOT NULL,
  `Delivery_City` varchar(15) NOT NULL,
  `Delivery_Street` varchar(35) NOT NULL,
  `Delivery_Date` date NOT NULL,
  `Order_Date` date NOT NULL,
  `Last_Four_Card_Digits` int unsigned NOT NULL,
  PRIMARY KEY (`Order_ID`),
  UNIQUE KEY `Order_ID_UNIQUE` (`Order_ID`),
  KEY `FK_User_ID_idx` (`Order_Owner`),
  KEY `FK_Cart_idx` (`Cart`),
  CONSTRAINT `FK_Cart` FOREIGN KEY (`Cart`) REFERENCES `shopping-carts` (`Cart_ID`),
  CONSTRAINT `FK_User_ID` FOREIGN KEY (`Order_Owner`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (16,123456789,22,456,'New York','agnon 36','2021-01-17','2021-01-17',4561),(17,208428578,25,3,'Los Angeles','benaaa','2021-01-21','2021-01-18',4567);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `Product_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Product_Name` varchar(45) NOT NULL,
  `Product_Description` varchar(100) NOT NULL,
  `Product_Category` bigint unsigned NOT NULL,
  `Product_Price` decimal(7,2) unsigned NOT NULL,
  `Product_Image_URL` varchar(999) NOT NULL,
  PRIMARY KEY (`Product_ID`),
  UNIQUE KEY `Product_ID_UNIQUE` (`Product_ID`),
  KEY `FK_Category_ID_idx` (`Product_Category`),
  CONSTRAINT `FK_Category_ID` FOREIGN KEY (`Product_Category`) REFERENCES `products-categories` (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SOY MILK','Fresh soy milk right from Nepal\'s royal gardens',3,2.99,'http://localhost:3001/1610934954000_soy_milk.png'),(2,' NATURAL 100G NUTS','100 Grams of  natural and  fresh nuts',3,3.15,'http://localhost:3001/1610968017000_nuts.jpg'),(3,'NATURAL 454G ALMONDS','Natural 454 Grams of fresh almonds',3,2.99,'http://localhost:3001/1610968037000_almonds.jpg'),(4,'180G DATES','Freshly picked dates, from the trees of Jericho',3,4.99,'http://localhost:3001/1610968044000_dates.jpg'),(5,'100G PORK MEAT','Straight from New York\'s best butchery',2,12.44,'http://localhost:3001/1610968050000_pork.jpg'),(6,'100G T-BONE FILLET','Straight from New York\'s best butchery',2,6.57,'http://localhost:3001/1610968078000_beef.jpg'),(7,'100G RAW BEEF FILLET','Straight from New York\'s best butchery',2,8.12,'http://localhost:3001/1610968084000_t-bone.jpg'),(8,'100 DISPOSABLE MEDICAL GLOVES','Blue, disposable, anti-germ gloves',5,2.30,'http://localhost:3001/1610968089000_gloves.jpg'),(9,'500 ML ALCOGEL','500 mL of Lilac flower alcogel',5,3.99,'http://localhost:3001/1610968094000_alcogel.jpg'),(10,'ORANGE JUICE','Freshly squeezed orange juice, straight from London\'s royal garden\'s trees',4,1.99,'http://localhost:3001/1610968102000_orange_juice.jpeg'),(11,'APPLE JUICE','Freshly squeezed apple juice, straight from Japan\'s special trees',4,1.49,'http://localhost:3001/1610968106000_apple_juice.jpg'),(12,'NESCAFE GOLD','Nescafe\'s Premium version of fresh coffee beans',4,4.99,'http://localhost:3001/1610968113000_nescafe.png'),(13,'ROMANO CHEESE','Romano\'s cow\'s milk cheese, milked only from happy cows',1,5.99,'http://localhost:3001/1610968116000_cheese.png'),(14,'LACTEL NATURAL YOGURT','Lactel natural yogurt, 250 mL',1,2.99,'http://localhost:3001/1610968120000_yogurt.png'),(15,'CRUNCHY GRANOLA','Crunchy, almonds & cranberries Kelloggs\'s granola',3,3.59,'http://localhost:3001/1610968125000_granola.jpg'),(16,'100G FRESH SALMON','Freshly caught salmon fillet, straight from the Atlantic',2,7.54,'http://localhost:3001/1610968129000_salmon.jpg'),(24,'STARBUCK\'S HOME BLEND COFFEE','Starbuck\'s home blend at your reach, now in the newest addition',4,2.49,'http://localhost:3001/1610968135000_640x640.jpg'),(62,'CHIA SEEDS','Fresh, healthy, nutritious chia seeds, straight from Indonesia\'s luxurious fields',3,1.99,'http://localhost:3001/1611011758000_chia.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products-categories`
--

DROP TABLE IF EXISTS `products-categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products-categories` (
  `Category_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Category_Name` varchar(25) NOT NULL,
  PRIMARY KEY (`Category_ID`),
  UNIQUE KEY `Product_ID_UNIQUE` (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products-categories`
--

LOCK TABLES `products-categories` WRITE;
/*!40000 ALTER TABLE `products-categories` DISABLE KEYS */;
INSERT INTO `products-categories` VALUES (1,'Dairy'),(2,'Meat & Fish'),(3,'Vegan'),(4,'Drinks'),(5,'Health');
/*!40000 ALTER TABLE `products-categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shopping-carts`
--

DROP TABLE IF EXISTS `shopping-carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shopping-carts` (
  `Cart_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `Cart_Owner` bigint unsigned NOT NULL,
  `Cart_Creation_Date` date NOT NULL,
  `Is_Open` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`Cart_ID`),
  UNIQUE KEY `Cart_ID_UNIQUE` (`Cart_ID`),
  KEY `FK_Cart_Owner_idx` (`Cart_Owner`),
  CONSTRAINT `FK_Cart_Owner` FOREIGN KEY (`Cart_Owner`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shopping-carts`
--

LOCK TABLES `shopping-carts` WRITE;
/*!40000 ALTER TABLE `shopping-carts` DISABLE KEYS */;
INSERT INTO `shopping-carts` VALUES (22,123456789,'2021-01-17',0),(23,123456789,'2021-01-17',1),(24,123456788,'2021-01-17',1),(25,208428578,'2021-01-18',0),(26,208428578,'2021-01-18',1);
/*!40000 ALTER TABLE `shopping-carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `User_ID` bigint unsigned NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(25) NOT NULL,
  `Last_Name` varchar(25) NOT NULL,
  `User_Name` varchar(35) NOT NULL,
  `Password` varchar(150) NOT NULL,
  `City` varchar(15) DEFAULT NULL,
  `Street` varchar(35) DEFAULT NULL,
  `User_Type` varchar(10) NOT NULL,
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `User_Name_UNIQUE` (`User_Name`),
  UNIQUE KEY `User_ID_UNIQUE` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=999999001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (123456788,'ben3','Ashkenazi','benos3@gmail.com','c585e660c84b7a6215f008014d61d841','New York','Shay Agnon 36','CUSTOMER'),(123456789,'benos2','ashkenazi','benos2@gmail.com','c585e660c84b7a6215f008014d61d841','London','Shay Agnon 36','CUSTOMER'),(208428578,'ben','ashkenazi','test@test.com','c585e660c84b7a6215f008014d61d841','Chicago','milano\'s gayzer','CUSTOMER'),(208428599,'ben','ashkenazi','benos@gmail.com','c585e660c84b7a6215f008014d61d841','bat yam','agnon 36','ADMIN');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-19  1:24:22
