SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `asador_artesano` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `asador_artesano`;

CREATE TABLE `admin_usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `rol` enum('admin','cocina','sala') DEFAULT 'sala',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `alergenos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `alergenos` (`id`, `nombre`) VALUES
(1, 'Gluten'),
(2, 'Crustáceos'),
(3, 'Huevos'),
(4, 'Pescado'),
(5, 'Cacahuetes'),
(6, 'Soja'),
(7, 'Lácteos'),
(8, 'Frutos de cáscara'),
(9, 'Apio'),
(10, 'Mostaza'),
(11, 'Sésamo'),
(12, 'Dióxido de azufre'),
(13, 'Altramuces'),
(14, 'Moluscos');

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `orden` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categorias` (`id`, `nombre`, `orden`) VALUES
(1, 'Pollos y Asados', 1),
(2, 'Churrería', 2),
(3, 'Croquetas', 3),
(4, 'Bebidas', 4);

CREATE TABLE `configuracion` (
  `clave` varchar(100) NOT NULL,
  `valor` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `configuracion` (`clave`, `valor`) VALUES
('cupo_por_hora', '10'),
('direccion', 'Calle Ejemplo, 1 - Albacete'),
('horario_apertura', '12:00'),
('horario_cierre', '22:00'),
('minutos_antelacion', '30'),
('nombre_restaurante', 'El Asador Artesano'),
('telefono_contacto', '967000000');

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `favoritos` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `plato_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `favoritos` (`id`, `user_id`, `plato_id`, `created_at`, `updated_at`) VALUES
(3, 3, 2, '2026-04-29 16:40:32', NULL),
(6, 3, 4, '2026-04-29 16:41:28', NULL),
(7, 3, 6, '2026-04-29 16:45:22', NULL),
(8, 3, 7, '2026-05-08 05:56:02', NULL),
(9, 3, 9, '2026-05-13 14:49:53', NULL),
(10, 1, 2, '2026-05-13 17:30:04', NULL);

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(5, '2026_03_25_112442_create_personal_access_tokens_table', 2),
(6, '2026_04_28_200658_create_favoritos_table', 3);

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `hora_recogida` datetime NOT NULL,
  `estado` enum('pendiente','recibido') DEFAULT 'recibido',
  `medio_pago` enum('tarjeta','tpv_virtual','pago_en_local') DEFAULT 'pago_en_local',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pedidos` (`id`, `usuario_id`, `total`, `hora_recogida`, `estado`, `medio_pago`, `created_at`) VALUES
(12, 3, 3.50, '2026-05-06 21:45:00', 'recibido', 'pago_en_local', '2026-05-05 17:45:39'),
(13, 3, 6.50, '2026-05-07 21:50:00', 'recibido', 'pago_en_local', '2026-05-05 17:50:05'),
(14, 3, 3.50, '2026-05-14 09:57:00', 'pendiente', 'pago_en_local', '2026-05-08 05:57:12'),
(15, 1, 18.50, '2026-05-14 23:00:00', 'recibido', 'tarjeta', '2026-05-11 19:00:48'),
(16, 3, 29.00, '2026-05-14 21:54:00', 'pendiente', 'pago_en_local', '2026-05-13 14:51:16'),
(17, 1, 12.00, '2026-05-14 21:30:00', 'pendiente', 'pago_en_local', '2026-05-13 17:30:51'),
(18, 3, 14.50, '2026-05-15 15:14:00', 'pendiente', 'pago_en_local', '2026-05-14 11:14:27');

CREATE TABLE `pedido_items` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL,
  `plato_id` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `precio_unitario` decimal(8,2) NOT NULL,
  `observaciones` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `pedido_items` (`id`, `pedido_id`, `plato_id`, `cantidad`, `precio_unitario`, `observaciones`) VALUES
(15, 12, 3, 1, 3.50, NULL),
(16, 13, 2, 1, 6.50, NULL),
(17, 14, 4, 1, 3.50, NULL),
(18, 15, 2, 1, 6.50, NULL),
(19, 15, 7, 1, 12.00, NULL),
(20, 16, 7, 1, 12.00, NULL),
(21, 16, 9, 1, 1.50, NULL),
(22, 16, 4, 1, 3.50, NULL),
(23, 16, 7, 1, 12.00, NULL),
(24, 17, 7, 1, 12.00, NULL),
(25, 18, 2, 1, 6.50, NULL),
(26, 18, 4, 1, 3.50, NULL),
(27, 18, 3, 1, 3.50, NULL),
(28, 18, 10, 1, 1.00, NULL);

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 5, 'auth_token', '1d437f79a8e09fe82724dc4ed8efd70c98d87971c439a39bd3346f1b5ae4dba1', '[\"*\"]', '2026-04-29 17:24:10', NULL, '2026-04-29 17:24:07', '2026-04-29 17:24:10'),
(4, 'App\\Models\\User', 6, 'auth_token', '100403217ca460d93c5ce5d79c5517e50e25ebdeedc3a3b0494c13117bf6ce1c', '[\"*\"]', '2026-04-29 18:06:43', NULL, '2026-04-29 17:56:50', '2026-04-29 18:06:43'),
(13, 'App\\Models\\User', 7, 'auth_token', '1938c6457b49ab13ebf42799d60c40752ad04784a43417f9b0b3faff622cd3ec', '[\"*\"]', '2026-05-05 17:57:16', NULL, '2026-05-05 17:57:14', '2026-05-05 17:57:16'),
(30, 'App\\Models\\User', 9, 'auth_token', '7452233ce86cb77f89a267520c0b25f340418f508890faec0b0dc2ac6012246a', '[\"*\"]', '2026-05-13 16:39:35', NULL, '2026-05-13 14:59:09', '2026-05-13 16:39:35'),
(37, 'App\\Models\\User', 1, 'auth_token', '179d75d37bc34c873df8d12ca643542b432f711fb65087acea3e31b5bcaa9d16', '[\"*\"]', '2026-05-13 18:42:58', NULL, '2026-05-13 18:41:44', '2026-05-13 18:42:58'),
(43, 'App\\Models\\User', 3, 'auth_token', '880bb399951f6e552bdcef24b51d6974c279fda7df48548274a616c59e780df6', '[\"*\"]', '2026-05-14 11:14:36', NULL, '2026-05-14 11:13:57', '2026-05-14 11:14:36'),
(44, 'App\\Models\\User', 8, 'auth_token', 'bbbd37e0411fe0ce1145b2f408ea38ec702262f0b8a0fcaba31ff22fd9aa47b0', '[\"*\"]', '2026-05-14 19:59:48', NULL, '2026-05-14 19:59:35', '2026-05-14 19:59:48');

CREATE TABLE `platos` (
  `id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `nombre` varchar(150) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(8,2) NOT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `platos` (`id`, `categoria_id`, `nombre`, `descripcion`, `precio`, `imagen_url`, `disponible`, `created_at`) VALUES
(2, 1, 'Medio pollo asado', 'Media ración de nuestro pollo asado', 6.50, 'platos/medio-pollo.webp', 1, '2026-03-25 08:41:37'),
(3, 2, 'Churros (ración)', 'Churros recién hechos, crujientes por fuera y tiernos por dentro', 3.50, 'platos/churros.webp', 1, '2026-03-25 08:41:37'),
(4, 2, 'Porras (ración)', 'Porras artesanales, perfectas para mojar', 3.50, 'platos/porra.webp', 1, '2026-03-25 08:41:37'),
(5, 3, 'Croquetas caseras (6)', 'Croquetas de jamón ibérico, receta de la abuela', 6.00, 'platos/croquetas.webp', 1, '2026-03-25 08:41:37'),
(6, 4, 'Refresco', 'Coca-Cola, Fanta o Agua', 1.50, 'platos/bebidas.webp', 1, '2026-03-25 08:41:37'),
(7, 1, 'Pollo Asado', '...', 12.00, 'platos/pollo.webp', 1, '2026-05-05 20:33:55'),
(9, 1, 'Patatas Fritas', 'Deliciosas patatas fritas, hechas con el mejor aceite de mayor calidad... escoge la ración que más se ajuste a tu apetito', 1.50, 'platos/patatas-fritas.webp', 1, '2026-05-12 18:16:31'),
(10, 2, 'Churros de chocolate', 'Los churros de siempre, pero ahora con un giro, bañados con chocolate hecho de manera casera al baño maría', 1.00, 'platos/churros-chocolate.webp', 1, '2026-05-12 18:17:17'),
(11, 4, 'Chocolate Caliente', 'Vaso o Litro de chocolate caliente hecho y servido en el momento de manera artesanal', 2.00, 'platos/chocolate-caliente.webp', 1, '2026-05-12 18:18:04');

CREATE TABLE `plato_alergenos` (
  `plato_id` int(11) NOT NULL,
  `alergeno_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `plato_alergenos` (`plato_id`, `alergeno_id`) VALUES
(3, 1),
(4, 1),
(5, 1),
(5, 7);

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('C8JKqL8SydkuZXQOVCRzNrOannSlKUwaSRd3yp4w', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidE9jNnEyNG1iYTlxT296UTFsaXJPcWl2M0pvSVpZNVBKM05BMlZmRyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9taXMtcGVkaWRvcyI7czo1OiJyb3V0ZSI7czoxMjoib3JkZXJzLmluZGV4Ijt9czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1774437851),
('Dth5z6mmaLMxYhPJs7jy92b5BXvCOSmnhRbLwuGz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFNTVlRzaFB3M09sQktQSEhXWlhhWGJuZ0RsMWt3N1Z1bnI4ckJURiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1777405484),
('GOQ7lcZHvrlPM1gZx9g9BouY5FIuDHC4dwHMGjef', NULL, '127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoid29WUTZGb25JOGk3czZObzFtN3BXZFNXYzFPczJBRlhVMHR6YktxMiI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fX0=', 1778444669),
('Gwazw9E5lWwxgd8Fog41qlbp2byWE1u618KkLvS4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTEw1RUdWcWZBZVZqT1h3UE5yOUdCbjVDQmdRU2lXakprUE5IaW1PVyI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMzoiaHR0cDovL2xvY2FsaG9zdDo4MDAwL21pcy1wZWRpZG9zIjt9czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1774515588),
('JQEyJg4mCdLYgbZD0OEdruNX5wZifHnEOA6whRkK', NULL, '127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidHk2SGJ6Y05RVGR4MEdUMXhKbUdPSkZqZnNWcFJ1VWh2NUhNd2FBTiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1778444880),
('tKWgtx6cKOm59pra7uqUEAoDT02ooWbtDTOFpEnH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiczVjQnA4VWpsVDl3QWtEbUY5NlVyYmVvOE1vR3hnSExLbE82YnN5MSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1778444016),
('xsZ6KGIcGii7CqRtyciTBmnhFBNzPQAHNlQJ8BD9', NULL, '127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMFE5c0hOYXpWT3RDaTFKUnZvZXhoSUN2U1hSdHZzV291Rmk2UmlyRyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1774439681);

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `rol` enum('admin','user') NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(30) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuarios` (`id`, `rol`, `nombre`, `email`, `telefono`, `password_hash`, `created_at`) VALUES
(1, 'user', 'paquita', 'paquita@gmail.com', '722528908', '$2y$12$aZKzSZJ4SbaYzyM8e6sbOeapoNY6eyid21LBODKJNSfQR3HEQh6XW', '2026-03-25 07:51:43'),
(2, 'user', 'Pepa', 'pepita@miweb.com', '722528901', '$2y$12$wVIzyEW1rty7nEhk7.UomeAKAuAWr7N0SfSEEJLmSDRz383WvkxZW', '2026-03-26 10:26:27'),
(3, 'user', 'eugenia', 'eugenia@gmail.com', '722528908', '$2y$12$p5SjostBrR5zn5i8KeeXpuYdN.a/oX5HNIT4VSW2lktQihpShvP06', '2026-04-28 18:58:10'),
(6, 'user', 'prueba', 'prueba@empresa.com', '123456789', '$2y$12$1vTkSnpQRGJKQy5RKdusZeBqKS5/1yCbpSRL0WtcrA8aDaMw0TrKK', '2026-04-29 17:56:50'),
(8, 'admin', 'administrador', 'admin@web.com', '722528908', '$2y$12$e3Cx70CeKh/AQm7/zMlqcOjkn68Zd1PdWO9s7K3TAdwlJPHLR41pS', '2026-05-05 19:58:02'),
(9, 'user', 'j', 'j@j.es', 'j', '$2y$12$4TOiRbr0OWJ7ZQPNv6rc1efN3wrvT952f7DctSAy1JaioDkBfYSIG', '2026-05-13 14:59:09');


ALTER TABLE `admin_usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

ALTER TABLE `alergenos`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`clave`);

ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `favoritos_user_id_plato_id_unique` (`user_id`,`plato_id`),
  ADD KEY `favoritos_plato_id_foreign` (`plato_id`);

ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `idx_hora_recogida` (`hora_recogida`),
  ADD KEY `idx_estado` (`estado`);

ALTER TABLE `pedido_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `plato_id` (`plato_id`);

ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

ALTER TABLE `platos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`);

ALTER TABLE `plato_alergenos`
  ADD PRIMARY KEY (`plato_id`,`alergeno_id`),
  ADD KEY `alergeno_id` (`alergeno_id`);

ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);


ALTER TABLE `admin_usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

ALTER TABLE `alergenos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `favoritos`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

ALTER TABLE `pedido_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

ALTER TABLE `platos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;


ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_plato_id_foreign` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favoritos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE SET NULL;

ALTER TABLE `pedido_items`
  ADD CONSTRAINT `pedido_items_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pedido_items_ibfk_2` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`);

ALTER TABLE `platos`
  ADD CONSTRAINT `platos_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`) ON DELETE SET NULL;

ALTER TABLE `plato_alergenos`
  ADD CONSTRAINT `plato_alergenos_ibfk_1` FOREIGN KEY (`plato_id`) REFERENCES `platos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `plato_alergenos_ibfk_2` FOREIGN KEY (`alergeno_id`) REFERENCES `alergenos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
