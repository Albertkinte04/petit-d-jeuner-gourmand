// Panier d'achats
let cart = [];
let total = 0;

// Fonction pour ajouter des plats au panier
function addToCart(name, price, quantityId) {
    const quantity = document.getElementById(quantityId).value;

    // Vérifie si la quantité est valide
    if (quantity <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
    }

    // Ajoute au panier
    cart.push({ name, price, quantity: parseInt(quantity) });
    updateCart();
}

// Met à jour le panier et le total
function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");

    // Réinitialise l'affichage
    cartItems.innerHTML = "";
    total = 0;

    // Parcourt chaque élément du panier
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Ajoute l'élément au panier
        cartItems.innerHTML += `
            <li>
                ${item.name} x ${item.quantity} - ${itemTotal.toFixed(2)} FCFA
                <button onclick="removeFromCart(${index})">Supprimer</button>
            </li>
        `;
    });

    // Met à jour le total
    totalPrice.innerText = `Total : ${total.toFixed(2)} FCFA`;
}

// Fonction pour supprimer un plat
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Finaliser la commande
function finalizeOrder() {
    if (cart.length === 0) {
        alert("Votre panier est vide !");
    } else {
        alert(`Merci pour votre commande ! Total : ${total.toFixed(2)} FCFA`);
        cart = [];
        updateCart();
    }
}
function finalizeOrder() {
    // Récupération des champs
    const phoneNumber = document.getElementById("phone-number").value.trim();
    const address = document.getElementById("address").value.trim();

    // Vérification des champs obligatoires
    if (!phoneNumber) {
        alert("Veuillez entrer votre numéro de téléphone.");
        return;
    }

    if (!address) {
        alert("Veuillez entrer votre adresse de livraison.");
        return;
    }

    // Vérifie si le panier est vide
    if (cart.length === 0) {
        alert("Votre panier est vide !");
    } else {
        alert(`Merci pour votre commande ! Total : ${total.toFixed(2)} €\nNuméro : ${phoneNumber}\nAdresse : ${address}`);
        cart = [];
        updateCart();

        // Réinitialise les champs
        document.getElementById("phone-number").value = "";
        document.getElementById("address").value = "";
    }
}
function saveOrder(order) {
    db.collection("orders").add({
        customerName: order.name,
        phone: order.phone,
        address: order.address,
        items: order.items,
        totalPrice: order.totalPrice,
        createdAt: new Date()
    })
    .then(() => {
        alert("Commande enregistrée avec succès !");
    })
    .catch((error) => {
        console.error("Erreur lors de l'enregistrement :", error);
    });
}
const order = {
    name: "Jean Dupont",
    phone: "+242 065123456",
    address: "Rue Principale, Pointe-Noire",
    items: [
        { name: "Croissant", quantity: 2 },
        { name: "Beignet", quantity: 1 }
    ],
    totalPrice: 12.50
};

saveOrder(order);
function fetchOrders() {
    db.collection("orders")
        .orderBy("createdAt", "desc") // Trier par date
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
        })
        .catch((error) => {
            console.error("Erreur lors de la récupération :", error);
        });
}
