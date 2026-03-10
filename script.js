// Attendre que le DOM soit complètement chargé
$(document).ready(function () {

    // ***************************
    // BASIC INTERACTION
    // ***************************

    // 1. Changer la couleur de fond de la navbar au scroll
    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            $('.navbar').css('background-color', '#f8f9fa');
        } else {
            $('.navbar').css('background-color', 'white');
        }
    });

    // 2. Ajouter un badge dynamiquement au titre du hero
    $('.hero-section h1').append('<span class="badge bg-turquoise ms-3">Nouveau</span>');

    // 3. Bouton pour cacher/afficher une section (ex: section Équipe)
    $('.container').append('<button id="toggleTeamBtn" class="btn btn-outline-turquoise mb-3">Cacher/Montrer l\'équipe</button>');
    $('#toggleTeamBtn').click(function () {
        $('#equipe').toggle();
    });

    // 4. Bouton "Back to Top" qui apparaît après le scroll
    $('body').append('<button id="backToTop" class="btn btn-turquoise" style="position:fixed; bottom:20px; right:20px; display:none; z-index:1000;">↑ Haut</button>');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });
    $('#backToTop').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    // ***************************
    // DOM MANIPULATION
    // ***************************

    // 5. Ajouter dynamiquement une carte d'activité
    $('#cequonfait .row').append(`
        <div class="col-md-6 col-lg-4">
            <div class="card h-100 border-0 shadow-sm hover-card">
                <div class="card-body">
                    <div class="d-flex align-items-center mb-3">
                        <span class="display-4 fw-bold" style="color: #1CA7A6; line-height: 1;">06</span>
                        <h3 class="h4 fw-bold ms-3 mb-0">Nouvelle Activité</h3>
                    </div>
                    <p class="text-muted">Atelier découverte : initiation à jQuery et aux animations web.</p>
                </div>
            </div>
        </div>
    `);

    // 6. Supprimer une carte membre (sauf Hassan Farsi)
    $('#equipe .card').each(function () {
        let name = $(this).find('h5').text();
        if (name !== 'Hassan Farsi') {
            $(this).append('<button class="btn btn-sm btn-outline-danger mt-2 delete-member">✖ Supprimer</button>');
        }
    });
    $(document).on('click', '.delete-member', function () {
        $(this).closest('.col-sm-6').remove();
    });

    // 7. Changer la couleur de tous les titres de section
    $('section h2').css('color', '#1CA7A6');

    // 8. Ajouter un badge "New" à la première carte activité
    $('#cequonfait .card:first .card-body').prepend('<span class="badge bg-turquoise mb-2">New</span>');

    // ***************************
    // EVENTS
    // ***************************

    // 9. Animation hover sur toutes les cartes
    $('.card').hover(
        function () { $(this).addClass('shadow-lg'); },
        function () { $(this).removeClass('shadow-lg'); }
    );

    // 10. Alerte quand on clique sur une carte membre
    $('#equipe .card').click(function () {
        alert('Membre cliqué : ' + $(this).find('h5').text());
    });

    // 11. Double-clic agrandit la carte
    $('.card').dblclick(function () {
        $(this).toggleClass('p-4 p-5');
    });

    // 12. Tooltip sur les icônes sociales
    $('.social-links a').attr('title', 'Visitez notre page').tooltip();

    // 13. Changer la couleur de fond avec une touche (ex: touche 'D')
    $(document).keypress(function (e) {
        if (e.which === 100 || e.which === 68) { // 'd' ou 'D'
            $('body').css('background-color', '#e0f7f7');
        }
    });

    // ***************************
    // ANIMATIONS
    // ***************************

    // 14. Faire apparaître les sections au scroll
    $(window).on('scroll', function () {
        $('section').each(function () {
            let top = $(this).offset().top;
            let bottom = top + $(this).outerHeight();
            let scrollTop = $(window).scrollTop();
            let windowHeight = $(window).height();
            if (scrollTop + windowHeight > top + 100 && scrollTop < bottom - 100) {
                $(this).fadeTo(500, 1);
            }
        });
    });

    // 15. Bannière coulissante - Avec nouveau texte
    $('body').prepend('<div id="announcement" class="bg-turquoise text-white text-center py-2" style="display:none;">🎉 Bienvenue au CESE Club !</div>');
    $('#announcement').slideDown(1000);
    // 16. Animation du texte du hero
    $('.hero-section h1').hide().fadeIn(2000);

    // 17. Rebond des cartes au survol
    $('.card').hover(
        function () { $(this).effect('bounce', { times: 1 }, 200); }
    );

    // 18. Barre de progression au scroll
    $('body').append('<div id="scrollProgress" style="height:5px; background:#1CA7A6; width:0%; position:fixed; top:0; left:0; z-index:9999;"></div>');
    $(window).scroll(function () {
        let scrollPercent = ($(window).scrollTop() / ($(document).height() - $(window).height())) * 100;
        $('#scrollProgress').css('width', scrollPercent + '%');
    });

    // ***************************
    // TRAVERSING
    // ***************************

    // 19. Mettre en évidence un membre et retirer des autres
    $('#equipe .card').click(function () {
        $(this).closest('.row').find('.card').removeClass('border border-turquoise border-3');
        $(this).addClass('border border-turquoise border-3');
    });

    // 20. Première et dernière carte activité stylées
    $('#cequonfait .card:first').addClass('bg-light');
    $('#cequonfait .card:last').addClass('bg-light');

    // 21. Modifier un élément avec .find() (CORRIGÉ)
    $('#cellules .card').find('.badge.bg-turquoise').each(function() {
        $(this).text('🔹 ' + $(this).text());
    });

    // 22. .parent() change le fond quand on clique sur un bouton
    $('.delete-member').click(function () {
        $(this).parent().parent().css('background-color', '#ffe6e6');
    });

    // 23. Compter les cartes
    let cardCount = $('.card').length;
    $('footer .container').append('<p class="text-muted small">Nombre total de cartes : ' + cardCount + '</p>');

    // ***************************
    // CHAINING PRACTICE
    // ***************************

    // 24. Cacher, changer couleur, réapparaître
    $('.hero-section h1').hide().css('color', '#128C8C').fadeIn(1000);

    // 25. Animer et styler une carte en une commande
    $('#equipe .card:first').hide().addClass('border border-primary').slideDown(500);

    // 26. Appliquer plusieurs changements CSS à toutes les cartes
    $('.card').css({
        'border-radius': '15px',
        'transition': 'all 0.3s',
        'box-shadow': '0 5px 15px rgba(0,0,0,0.1)'
    });

    // ***************************
    // ADVANCED EFFECTS
    // ***************************

    // 27. Slider d'image de fond (simulé)
    let images = ['url("images/bg1.jpg")', 'url("images/bg2.jpg")', 'url("images/bg3.jpg")'];
    let i = 0;
    setInterval(() => {
        $('.hero-section').css('background-image', images[i % images.length]);
        i++;
    }, 3000);

    // 28. Effet parallax
    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        $('.hero-section').css('background-position-y', -scroll / 2);
    });

    // 29. Animation de texte typographique
    let title = $('.hero-section h1').text();
    $('.hero-section h1').html('');
    for (let char of title) {
        $('.hero-section h1').append(`<span style="opacity:0;">${char}</span>`);
    }
    $('.hero-section h1 span').each(function (i) {
        $(this).delay(i * 50).animate({ opacity: 1 }, 100);
    });

    // 30. Popup modale après 10 secondes
    setTimeout(() => {
        $('body').append(`
            <div class="modal fade show" id="popupModal" tabindex="-1" style="display:block; background:rgba(0,0,0,0.5);">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Rappel</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            N'oubliez pas de nous rejoindre ! 🚀
                        </div>
                    </div>
                </div>
            </div>
        `);
        $('#popupModal .btn-close').click(() => $('#popupModal').remove());
    }, 10000);

    // 31. Indicateur de scroll (déjà fait à l'étape 18)

    // ***************************
    // SMART LOGIC
    // ***************************

    // 32. Verrouiller après 300px de scroll (CORRIGÉ)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('body').css('overflow', 'hidden');
            $('#lockOverlay').remove();
            $('body').append('<div id="lockOverlay" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); color:white; display:flex; align-items:center; justify-content:center; z-index:10000;">🔒 Scroll verrouillé - Rechargez la page</div>');
        }
    });

    // 33. Dark mode toggle
    $('body').append('<button id="darkModeToggle" class="btn btn-sm btn-secondary position-fixed top-0 end-0 m-3">🌙 Dark</button>');
    $('#darkModeToggle').click(function () {
        $('body').toggleClass('bg-dark text-white');
        $('.navbar, footer').toggleClass('bg-dark text-white');
        $('.card').toggleClass('bg-secondary text-white');
    });
});