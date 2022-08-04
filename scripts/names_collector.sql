-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 02, 2022 at 01:24 PM
-- Server version: 8.0.30-0ubuntu0.22.04.1
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `names_collector`
--

-- --------------------------------------------------------

--
-- Table structure for table `baby_names`
--

CREATE TABLE `baby_names` (
  `id` int NOT NULL COMMENT 'Primary Key',
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `content` varchar(255) DEFAULT NULL COMMENT 'content'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='babyNames';

--
-- Dumping data for table `baby_names`
--

INSERT INTO `baby_names` (`id`, `timestamp`, `content`) VALUES
(1, '2022-08-02 13:02:50', 'Test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `baby_names`
--
ALTER TABLE `baby_names`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `baby_names`
--
ALTER TABLE `baby_names`
  MODIFY `id` int NOT NULL AUTO_INCREMENT COMMENT 'Primary Key', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
