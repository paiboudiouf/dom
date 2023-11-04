// Récupérer tous les éléments d'article
var articleElements = document.querySelectorAll('.article');

// Tableau pour stocker les informations d'article
var articles = [];

// Boucle à travers tous les éléments d'article pour extraire les informations d'article
articleElements.forEach(function(articleElement) {
  var nom = articleElement.getAttribute('data-nom');
  var prix = parseFloat(articleElement.getAttribute('data-prix'));
  var quantite = parseInt(articleElement.getAttribute('data-quantite'));

  // Ajouter les informations d'article au tableau des articles
  articles.push({
    nom: nom,
    prix: prix,
    quantite: quantite
  });
});
// Fonction pour mettre à jour le panier
function updateCart() {
    var total = 0;
    var quantiteTotal = 0;
    var cartItems = document.getElementById("cart-items");
    var cartTotal = document.getElementById("cart-total");
// Vider le panier
cartItems.innerHTML = "";

// Boucler à travers les articles
for (var i = 0; i < articles.length; i++) {
  // Créer une ligne pour chaque article
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");

 // Vérifier si l'article est déjà dans le panier
  var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  for (var j = 0; j < cartItemNames.length; j++) {
    if (cartItemNames[j].innerText == articles[i].nom) {
      alert("Cet article est déjà ajouté au panier");
      return;
    }
  }
      var cartRowContents = `<div class="cart-item cart-column">
                              <span class="cart-item-title">${articles[i].nom}</span>
                          </div>
                          <span class="cart-price cart-column">${articles[i].prix} €</span>
                          <div class="cart-quantity cart-column">
                              <input class="cart-quantity-input" type="number" value="${articles[i].quantite}">
                              <button class="btn btn-danger" type="button">Supprimer</button>
                          </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
}

// Ajouter un gestionnaire d'événements pour les boutons "Plus" et "Moins"
articleElements.forEach(function(articleElement) {
  var plusButton = articleElement.querySelector("[data-action='plus']");
  var minusButton = articleElement.querySelector("[data-action='minus']");
  var quantityElement = articleElement.querySelector(".count");

  plusButton.addEventListener("click", function() {
    var articleIndex = articles.findIndex(function(article) {
      return article.nom === articleElement.getAttribute('data-nom');
    });
    articles[articleIndex].quantite++;
    quantityElement.innerText = articles[articleIndex].quantite;
    updateCart();
  });

  minusButton.addEventListener("click", function() {
    var articleIndex = articles.findIndex(function(article) {
      return article.nom === articleElement.getAttribute('data-nom');
    });

    if (articles[articleIndex].quantite > 1) {
      articles[articleIndex].quantite--;
      quantityElement.innerText = articles[articleIndex].quantite;
      updateCart();
    } else {
      alert("La quantité minimale est 1.");
    }
  });

  