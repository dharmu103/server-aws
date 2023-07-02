-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 28, 2022 at 03:18 AM
-- Server version: 5.7.24
-- PHP Version: 7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `service_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `address_id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `pincode` int(11) DEFAULT NULL,
  `handler_id` int(11) DEFAULT NULL,
  `created_role` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
CREATE TABLE IF NOT EXISTS `announcement` (
  `announcement_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(300) NOT NULL,
  `service_id` int(11) NOT NULL,
  `announcement_img` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`announcement_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`announcement_id`, `title`, `description`, `service_id`, `announcement_img`, `is_active`, `created_by`, `created_date`, `updated_date`) VALUES
(1, 'tank installation\n', 'this is testing', 1, 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg', 1, 1, '2022-03-18 18:49:42', NULL),
(2, 'water installation\n', 'this is testing 2', 1, 'https://media.istockphoto.com/photos/multicolored-leaves-picture-id1318863607?b=1&k=20&m=1318863607&s=612x612&w=0&h=DX9Zm51DHmrnPOMU-vRcMGjIHtu3hYYy4omFhy2S2fw=', 1, 1, '2022-03-18 22:03:52', NULL),
(3, 'water installation\n', 'this is testing 2', 1, 'https://pngbackground.com/public/img-category/sc-blur-dslr-editing-background-hd-ULBx1iyt9ebUEMmItvmbb742FNDgNhDU.webp', 1, 1, '2022-03-18 22:03:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE IF NOT EXISTS `document` (
  `document_id` int(11) NOT NULL AUTO_INCREMENT,
  `aadhar_no` int(11) DEFAULT NULL,
  `aadhar_img` varchar(255) DEFAULT NULL,
  `voter_no` int(11) DEFAULT NULL,
  `voter_img` varchar(255) DEFAULT NULL,
  `pan_no` int(11) DEFAULT NULL,
  `pan_img` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `handler_id` int(11) DEFAULT NULL,
  `created_role` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`document_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
CREATE TABLE IF NOT EXISTS `faq` (
  `faq_id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(200) NOT NULL,
  `answer` varchar(1000) NOT NULL,
  `role` varchar(50) NOT NULL COMMENT 'to check either belong to service/partner/organization',
  `map_to` int(11) NOT NULL COMMENT 'store service id/partner id/organization',
  `is_active` tinyint(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL COMMENT 'repair/replace/installation',
  PRIMARY KEY (`faq_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`faq_id`, `question`, `answer`, `role`, `map_to`, `is_active`, `created_by`, `created_date`, `updated_by`, `updated_date`, `type`) VALUES
(1, ' Do you know about the Urban Company Guarantee? ', 'We share our service partner’s commitment to delivering the best customer experience, on time, each time. To honour this commitment, we have launched The Urban Company Insurance Protection Programme. This programme protects Urban Company users against any damages caused during the delivery of a service booked on Urban Company. The insurance amount is of up to Rs. 10,000.', 'SERVICE', 1, 1, 2, '2022-03-27 23:01:05', NULL, NULL, 'REPAIR'),
(2, ' Do you know what we are offer? ', 'We share our service partner’s commitment to delivering the best customer experience, on time, each time. To honour this commitment, we have launched The Urban Company Insurance Protection Programme. This programme protects Urban Company users against any damages caused during the delivery of a service booked on Urban Company. The insurance amount is of up to Rs. 10,000.', 'SERVICE', 1, 1, 2, '2022-03-27 23:01:24', NULL, NULL, 'REPAIR');

-- --------------------------------------------------------

--
-- Table structure for table `invite`
--

DROP TABLE IF EXISTS `invite`;
CREATE TABLE IF NOT EXISTS `invite` (
  `invite_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `reffer_code` varchar(30) NOT NULL,
  `invite_img` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  PRIMARY KEY (`invite_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invite`
--

INSERT INTO `invite` (`invite_id`, `title`, `description`, `reffer_code`, `invite_img`, `is_active`, `created_by`) VALUES
(1, 'test 1', 'this is test', 's5165shfiu58sfd', 'uploads\\invite\\photofile-1647594370970-88310444card-main.png', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
CREATE TABLE IF NOT EXISTS `offers` (
  `offer_id` int(11) NOT NULL AUTO_INCREMENT,
  `offer_title` varchar(100) NOT NULL,
  `description` varchar(250) NOT NULL,
  `offer_code` varchar(50) NOT NULL,
  `offer_img` varchar(300) NOT NULL,
  `valid_from` datetime NOT NULL,
  `valid_to` datetime NOT NULL,
  `discount_value` float NOT NULL,
  `discount_unit` int(11) NOT NULL,
  `maxium_disscount_amount` float NOT NULL,
  `service_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`offer_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `offers`
--

INSERT INTO `offers` (`offer_id`, `offer_title`, `description`, `offer_code`, `offer_img`, `valid_from`, `valid_to`, `discount_value`, `discount_unit`, `maxium_disscount_amount`, `service_id`, `is_active`, `created_by`, `created_date`, `updated_by`, `updated_date`) VALUES
(1, 'First customer', 'this is first times offers', 'KSFSGFS001168SDFS', 'KSFSGFS001168SDFS', '2022-03-19 13:52:45', '2022-03-22 13:52:45', 120.86, 2, 140, 1, 1, 1, '2022-03-27 21:59:07', NULL, NULL),
(2, 'Get offers on referal', 'get your first referal', 'KSFSGFS001168SDFS', 'KSFSGFS001168SDFS', '2022-03-19 13:52:45', '2022-03-22 13:52:45', 120.86, 2, 140, 1, 1, 1, '2022-03-27 22:06:35', NULL, NULL),
(3, 'referal offer', 'get your first referal 2', 'KSFSGFS001168SDFS', 'KSFSGFS001168SDFS', '2022-03-19 13:52:45', '2022-03-22 13:52:45', 120.86, 2, 140, 1, 1, 1, '2022-03-27 22:07:00', NULL, NULL),
(4, 'referal coupen', 'get your first referal 2', 'KSFSGFS001168SDFS', 'KSFSGFS001168SDFS', '2022-03-19 13:52:45', '2022-03-22 13:52:45', 120.86, 2, 140, 1, 1, 1, '2022-03-27 22:07:09', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_by` int(11) DEFAULT NULL,
  `orber_to` int(11) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_role` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

DROP TABLE IF EXISTS `partner`;
CREATE TABLE IF NOT EXISTS `partner` (
  `partner_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `photo` text,
  `mobile` varchar(11) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `is_vaccinated` tinyint(1) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_role` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`partner_id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`partner_id`, `name`, `photo`, `mobile`, `email`, `password`, `dob`, `gender`, `is_vaccinated`, `designation`, `is_active`, `created_role`, `created_by`, `updated_by`, `created_date`, `updated_date`) VALUES
(1, 'ravi', 'uploads\\partner\\photofile-1647604305871-9868795252.png', '8860506382', 'ravi@gmail.com', '123456', '1997-07-08', 'male', 1, 'plumber', 1, NULL, 1, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
CREATE TABLE IF NOT EXISTS `review` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` varchar(250) NOT NULL,
  `rating` int(11) NOT NULL,
  `review_by` int(11) NOT NULL COMMENT 'store user id',
  `review_to` int(11) NOT NULL COMMENT 'store service id/partner id',
  `role` varchar(30) NOT NULL COMMENT 'service/partner',
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_by` int(11) DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`review_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`review_id`, `comment`, `rating`, `review_by`, `review_to`, `role`, `created_by`, `created_date`, `updated_by`, `updated_date`, `is_active`) VALUES
(1, 'for test', 3, 1, 2, 'SERVICE', 1, '2022-03-19 13:52:45', NULL, NULL, 1),
(2, 'for test', 4, 2, 2, 'SERVICE', 2, '2022-03-19 13:54:32', NULL, NULL, 1),
(3, 'for test', 2, 2, 1, 'SERVICE', 2, '2022-03-19 13:55:05', NULL, NULL, 1),
(4, 'for test', 2, 2, 1, 'PARTNER', 2, '2022-03-19 16:44:33', NULL, NULL, 1),
(5, 'for test', 1, 2, 1, 'PARTNER', 2, '2022-03-19 18:50:09', NULL, NULL, 1),
(6, 'for test', 2, 2, 1, 'SERVICE', 2, '2022-03-19 18:54:46', NULL, NULL, 1),
(9, 'for test', 1, 2, 2, 'SERVICE', 2, '2022-03-19 18:58:22', NULL, NULL, 1),
(10, 'for test', 1, 2, 2, 'SERVICE', 2, '2022-03-19 18:58:58', NULL, NULL, 1),
(11, 'for test 6', 3, 4, 3, 'SERVICE', 2, '2022-03-19 19:01:21', NULL, NULL, 1),
(12, 'for test', 2, 2, 3, 'SERVICE', 2, '2022-03-19 19:01:30', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
CREATE TABLE IF NOT EXISTS `service` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `service_img` varchar(255) DEFAULT NULL,
  `avg_rating` float NOT NULL,
  `total_rating` int(11) NOT NULL,
  `offeraa_id` int(11) DEFAULT NULL,
  `extra` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `service_name` varchar(255) DEFAULT NULL,
  `created_role` varchar(255) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `updated_date` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `title`, `description`, `price`, `service_img`, `avg_rating`, `total_rating`, `offeraa_id`, `extra`, `type`, `service_name`, `created_role`, `created_by`, `updated_by`, `created_date`, `updated_date`, `is_active`) VALUES
(1, ' hello', 'check in', 100, 'https://5.imimg.com/data5/CK/VH/AS/SELLER-69473062/plumber-services-500x500.png', 2, 5, NULL, 'cashback upto 100 rs', 'repair', 'PLUMBER', 'ravi', 1, NULL, NULL, NULL, 1),
(2, 'check', 'check in', 20, 'https://5.imimg.com/data5/VL/NY/GLADMIN-60573408/plumber-service-500x500.png', 2.25, 4, NULL, 'cashback upto 100 rs', 'repair', 'ELECTRICIAN', 'ravi', 1, NULL, NULL, NULL, 1),
(3, ' hel is', 'check in', 50, 'https://4.imimg.com/data4/AH/BE/MY-25910922/plumber-service-500x500.jpg\r\n\r\n', 2.5, 2, NULL, 'cashback upto 100 rs', 'repair', 'ELECTRICIAN', 'ravi', 1, NULL, NULL, NULL, 1),
(4, 'this is hell now', 'check in', 100, 'https://4.imimg.com/data4/AH/BE/MY-25910922/plumber-service-500x500.jpg', 0, 0, NULL, 'cashback upto 100 rs', 'repair', 'PLUMBER', 'ravi', 1, NULL, NULL, NULL, 1),
(5, ' hello', 'check in', 9, 'https://4.imimg.com/data4/AH/BE/MY-25910922/plumber-service-500x500.jpg', 0, 0, NULL, 'cashback upto 100 rs', 'repair', 'PLUMBER', 'ravi', 1, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `photo` text,
  `mobile` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_date` datetime DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `photo`, `mobile`, `email`, `password`, `dob`, `gender`, `is_active`, `created_by`, `updated_by`, `created_date`, `updated_date`) VALUES
(1, 'ravi', 'sd;lgfsdiuf', '98180000', 'ravi@gmail.com', NULL, NULL, 'male', 1, 1, NULL, '2022-03-13 19:38:56', NULL),
(2, 'pushkar', '', '98180000', 'ravi@gmail.com', NULL, NULL, 'male', 1, 1, NULL, '2022-03-13 19:40:21', NULL),
(3, 'pankaj', '', '98180000', 'ravi@gmail.com', NULL, NULL, 'male', 1, 1, NULL, '2022-03-18 16:35:49', NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
