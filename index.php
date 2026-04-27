<?php
session_start();
$counter_file = 'visits.txt';
$visits = file_exists($counter_file) ? (int)file_get_contents($counter_file) : 0;
if (!isset($_SESSION['visited'])) {
    $visits++;
    file_put_contents($counter_file, $visits);
    $_SESSION['visited'] = true;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>Портфолио Razor_Z_Pi</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;400;600;700;800&family=Orbitron:wght@400;500;600;700&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="./style/style.css">
    <link rel="stylesheet" href="./style/normalize.css">
</head>
<body>

<div class="anime-bg">
    <!-- красивая аниме девушка на фоне (изображение высокого качества) -->
    <img src="https://i.pinimg.com/originals/8b/6e/7f/8b6e7f2e5a3d4c1b9a7e5f8d2c3b4a1e.jpg" alt="anime girl background"
         onerror="this.src='https://images6.alphacoders.com/133/1336935.jpg';">
</div>
<div class="overlay-glow"></div>
<canvas id="particles-canvas"></canvas>

<div class="container">
    <div class="badge">Посетителей: <?= $visits ?></div>
    <div class="hero">
        <div class="hero-text">
            <div class="badge">Волшебство разработки</div>
            <h1>Razor<span style="color:#ff99ff">_Z_Pi</span></h1>
            <div class="typing" id="typingEffect"></div>
            <p class="desc">
                Full-Stack разработчик. Создаю эстетичные веб-вселенные, наполненные магией кода, анимациями и интерактивом.<br>
                | Разработка сайтов и сервисов | <br>
                | Desktop-программ | <br>
                | Различных ПО и приклодных программ | <br>
                | Разработка и поддержка баз данных  | <br>
            </p>
            <div class="btn-group">
                <a href="#projects" class="btn btn-primary"><i class="fas fa-meteor"></i> Проекты</a>
                <a href="#contact" class="btn btn-outline"><i class="fas fa-paper-plane"></i> Связаться</a>
            </div>
        </div>
        <div class="hero-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/2922/2922565.png" alt="anime avatar" 
                 onerror="this.src='https://cdn-icons-png.flaticon.com/512/1995/1995572.png';">
        </div>
    </div>

    <div class="section" id="skills">
        <h2 class="section-title">Скилы</h2>
        <div class="skills-grid" id="skillsContainer"></div>
    </div>

    <div class="section" id="projects">
        <h2 class="section-title">Работы</h2>
        <div class="projects-grid" id="projectsContainer"></div>
    </div>

    <div class="section" id="contact">
        <h2 class="section-title">Контакт</h2>
        <div class="contact-form-area">
            <?php
            $contact_success = false;
            $contact_error = '';
            if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['contact_form'])) {
                $name = htmlspecialchars(trim($_POST['name'] ?? ''));
                $email = htmlspecialchars(trim($_POST['email'] ?? ''));
                $message = htmlspecialchars(trim($_POST['message'] ?? ''));
                
                if ($name && $email && $message) {
                    // Сохраняем в файл (можно заменить на отправку email)
                    $data = [
                        'date' => date('Y-m-d H:i:s'),
                        'name' => $name,
                        'email' => $email,
                        'message' => $message
                    ];
                    $log_file = 'contact_messages.json';
                    $existing = file_exists($log_file) ? json_decode(file_get_contents($log_file), true) : [];
                    $existing[] = $data;
                    file_put_contents($log_file, json_encode($existing, JSON_PRETTY_PRINT));
                    $contact_success = true;
                } else {
                    $contact_error = 'Пожалуйста, заполните все поля!';
                }
            }
            ?>
            <?php if ($contact_success): ?>
                <div class="form-message" style="color: #aaffaa; background: rgba(0,0,0,0.3); border-radius: 30px; padding: 10px;">
                    <i class="fas fa-check-circle"></i> Сообщение отправлено! Сенпай ответит в ближайшее время
                </div>
            <?php elseif ($contact_error): ?>
                <div class="form-message" style="color: #ffaaaa;">
                    <i class="fas fa-exclamation-triangle"></i> <?= $contact_error ?>
                </div>
            <?php endif; ?>
            
            <form method="POST" action="" id="contactForm">
                <div class="form-group">
                    <input type="text" name="name" placeholder="Ваше имя" required>
                </div>
                <div class="form-group">
                    <input type="email" name="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <textarea name="message" rows="4" placeholder="Ваше сообщение" required></textarea>
                </div>
                <button type="submit" name="contact_form"><i class="fas fa-feather-alt"></i> Отправить сообщение</button>
            </form>
        </div>
    </div>
    <footer>
        <i class="fas fa-heart" style="color:#ff66cc"></i> Razor_Z_Pi | <?php echo date('Y') ?>
        <br><small>Портфолио Full-Stack разработчика</small>
    </footer>
</div>

<script src="./js/app.js"></script>
</body>
</html>

<?php
if (!file_exists('contact_messages.json')) {
    file_put_contents('contact_messages.json', json_encode([]));
}
?>