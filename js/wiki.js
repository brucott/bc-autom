
/**
 * GESTION DU WIKI BCautom
 * Ce script permet de filtrer les articles par texte et par catégorie.
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('wikiSearch');
    const cards = document.querySelectorAll('.wiki-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noResult = document.getElementById('noResult');

    // 1. Fonction principale de filtrage
    function filterArticles() {
        const searchText = searchInput.value.toLowerCase();
        const activeCategory = document.querySelector('.filter-btn.active').dataset.filter;
        let hasVisibleCards = false;

        cards.forEach(card => {
            const title = card.querySelector('h3').innerText.toLowerCase();
            const description = card.querySelector('p').innerText.toLowerCase();
            const tags = card.dataset.tags.toLowerCase();
            const category = card.dataset.category;

            // Vérifie si le texte correspond
            const matchesSearch = title.includes(searchText) || 
                                description.includes(searchText) || 
                                tags.includes(searchText);
            
            // Vérifie si la catégorie correspond
            const matchesCategory = (activeCategory === 'all' || category === activeCategory);

            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                hasVisibleCards = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Affiche un message si rien n'est trouvé
        noResult.style.display = hasVisibleCards ? 'none' : 'block';
    }

    // 2. Écouteur sur la barre de recherche (clavier)
    searchInput.addEventListener('input', filterArticles);

    // 3. Écouteur sur les boutons de catégories
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Change le bouton actif visuellement
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Lance le filtrage
            filterArticles();
        });
    });
});