-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         5.7.26 - MySQL Community Server (GPL)
-- SO del servidor:              osx10.10
-- HeidiSQL Versión:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para db_tareas
CREATE DATABASE IF NOT EXISTS `db_tareas` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `db_tareas`;

-- Volcando estructura para tabla db_tareas.tareas
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tarea` varchar(255) NOT NULL,
  `status` varchar(15) NOT NULL DEFAULT '',
  `fecha_creacion` datetime DEFAULT NULL,
  `fecha_ultima_modificacion` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Volcando datos para la tabla db_tareas.tareas: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` (`id`, `tarea`, `status`, `fecha_creacion`, `fecha_ultima_modificacion`) VALUES
	(1, 'delectus aut autem', 'activo', '2021-04-30 17:23:16', NULL),
	(2, 'quis ut nam facilis et officia qui', 'completado', '2021-04-30 17:23:16', NULL),
	(3, 'fugiat veniam minus', 'activo', '2021-04-30 17:23:16', NULL),
	(4, 'et porro tempora', 'activo', '2021-04-30 17:23:16', NULL),
	(5, 'laboriosam mollitia et enim quasi adipisci quia provident illum', 'cancelado', '2021-04-30 17:23:16', NULL),
	(6, 'qui ullam ratione quibusdam voluptatem quia omnis', 'activo', '2021-04-30 17:23:16', NULL),
	(7, 'illo expedita consequatur quia in', 'cancelado', '2021-04-30 17:23:16', NULL),
	(8, 'quo adipisci enim quam ut ab', 'completado', '2021-04-30 17:23:16', NULL),
	(9, 'molestiae perspiciatis ipsa', 'activo', '2021-04-30 17:23:16', NULL),
	(10, 'illo est ratione doloremque quia maiores aut', 'completado', '2021-04-30 17:23:16', NULL);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
