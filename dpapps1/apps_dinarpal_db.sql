-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Nov 21, 2016 at 09:18 AM
-- Server version: 5.6.14
-- PHP Version: 5.5.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `apps_dinarpal_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `apdb_goldacc`
--

CREATE TABLE IF NOT EXISTS `apdb_goldacc` (
  `gacc_id` int(11) NOT NULL,
  `gacc_gold_name` varchar(255) DEFAULT NULL,
  `gacc_image` varchar(255) DEFAULT NULL,
  `gacc_weight` decimal(10,2) DEFAULT NULL,
  `gacc_purity` varchar(255) DEFAULT NULL,
  `gacc_cert_no` varchar(255) DEFAULT NULL,
  `gacc_username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apdb_goldacc`
--

INSERT INTO `apdb_goldacc` (`gacc_id`, `gacc_gold_name`, `gacc_image`, `gacc_weight`, `gacc_purity`, `gacc_cert_no`, `gacc_username`) VALUES
(1, 'DinarPal Gold Bar 0.1g', 'gb0.1.jpg', '0.10', '999.9', 'DPGB010001', 'alip'),
(2, 'DinarPal Gold Bar 0.1g', 'gb0.1.jpg', '0.10', '999.9', 'DPGB010002', 'alip'),
(3, 'DinarPal Gold Coin 0.5g', 'coin0.5.png', '0.50', '999.9', 'DPGC050001', 'alip'),
(4, 'DinarPal Gold Coin 0.5g', 'coin0.5.png', '0.50', '999.9', 'DPGC050002', 'alip'),
(5, 'DinarPal Gold Coin 0.5g', 'coin0.5.png', '0.50', '999.9', 'DPGC050003', 'ahmadhafizzudin');

-- --------------------------------------------------------

--
-- Table structure for table `apdb_members`
--

CREATE TABLE IF NOT EXISTS `apdb_members` (
  `members_id` int(11) NOT NULL,
  `members_username` varchar(200) DEFAULT NULL,
  `members_password` varchar(200) DEFAULT NULL,
  `members_email` varchar(200) DEFAULT NULL,
  `members_contact_no` varchar(50) DEFAULT NULL,
  `members_company_name` varchar(200) DEFAULT NULL,
  `members_company_reg_no` varchar(50) DEFAULT NULL,
  `members_pin_no` varchar(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apdb_members`
--

INSERT INTO `apdb_members` (`members_id`, `members_username`, `members_password`, `members_email`, `members_contact_no`, `members_company_name`, `members_company_reg_no`, `members_pin_no`) VALUES
(1, 'alip', 'alip', 'alip@gmail.com', '0129771645', NULL, NULL, '1234');

-- --------------------------------------------------------

--
-- Table structure for table `apdb_moneyacc`
--

CREATE TABLE IF NOT EXISTS `apdb_moneyacc` (
  `macc_id` int(11) NOT NULL,
  `macc_balance` decimal(10,2) DEFAULT NULL,
  `macc_username` varchar(255) DEFAULT ''
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apdb_moneyacc`
--

INSERT INTO `apdb_moneyacc` (`macc_id`, `macc_balance`, `macc_username`) VALUES
(1, '992.45', 'alip'),
(3, '200.00', 'pern'),
(4, '999.00', 'ahmadhafizzudin');

-- --------------------------------------------------------

--
-- Table structure for table `apdb_silveracc`
--

CREATE TABLE IF NOT EXISTS `apdb_silveracc` (
  `sacc_id` int(11) NOT NULL,
  `sacc_silver_name` varchar(255) DEFAULT NULL,
  `sacc_image` varchar(255) DEFAULT NULL,
  `sacc_weight` decimal(10,2) DEFAULT NULL,
  `sacc_purity` varchar(255) DEFAULT NULL,
  `sacc_cert_no` varchar(11) DEFAULT NULL,
  `sacc_username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `apdb_silveracc`
--

INSERT INTO `apdb_silveracc` (`sacc_id`, `sacc_silver_name`, `sacc_image`, `sacc_weight`, `sacc_purity`, `sacc_cert_no`, `sacc_username`) VALUES
(1, 'DinarPal Silver Coin 0.5g', '1dirham.png', '4.25', '999', 'DPSC050001', 'alip'),
(2, 'DinarPal Silver Coin 0.5g', '1dirham.png', '4.25', '999', 'DPSC050002', 'ahmadhafizzudin'),
(3, 'DinarPal Silver Coin 0.5g', '1dirham.png', '4.25', '999', 'DPSC050003', 'ahmadhafizzudin'),
(4, 'DinarPal Silver Coin 0.5g', '1dirham.png', '4.25', '999', 'DPSC050004', 'alip');

-- --------------------------------------------------------

--
-- Table structure for table `apdb_transaction`
--

CREATE TABLE IF NOT EXISTS `apdb_transaction` (
  `tran_id` int(11) NOT NULL,
  `tran_type` varchar(255) DEFAULT NULL,
  `tran_amount` double DEFAULT NULL,
  `tran_date` datetime DEFAULT NULL,
  `tran_via_social` varchar(255) DEFAULT NULL,
  `tran_receiver` varchar(255) DEFAULT NULL,
  `tran_message` varchar(255) DEFAULT NULL,
  `tran_attachment` varchar(255) DEFAULT NULL,
  `tran_att_type` varchar(255) DEFAULT NULL,
  `tran_username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `apdb_goldacc`
--
ALTER TABLE `apdb_goldacc`
  ADD PRIMARY KEY (`gacc_id`);

--
-- Indexes for table `apdb_members`
--
ALTER TABLE `apdb_members`
  ADD PRIMARY KEY (`members_id`);

--
-- Indexes for table `apdb_moneyacc`
--
ALTER TABLE `apdb_moneyacc`
  ADD PRIMARY KEY (`macc_id`);

--
-- Indexes for table `apdb_silveracc`
--
ALTER TABLE `apdb_silveracc`
  ADD PRIMARY KEY (`sacc_id`);

--
-- Indexes for table `apdb_transaction`
--
ALTER TABLE `apdb_transaction`
  ADD PRIMARY KEY (`tran_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `apdb_goldacc`
--
ALTER TABLE `apdb_goldacc`
  MODIFY `gacc_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `apdb_members`
--
ALTER TABLE `apdb_members`
  MODIFY `members_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `apdb_moneyacc`
--
ALTER TABLE `apdb_moneyacc`
  MODIFY `macc_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `apdb_silveracc`
--
ALTER TABLE `apdb_silveracc`
  MODIFY `sacc_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `apdb_transaction`
--
ALTER TABLE `apdb_transaction`
  MODIFY `tran_id` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
