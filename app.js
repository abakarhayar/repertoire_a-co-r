var contacts = [];

    function ajouterContact() {
      var prenom = document.getElementById("prenom").value;
      var nom = document.getElementById("nom").value;
      var telephone = document.getElementById("telephone").value;

      if (prenom === "" || nom === "" || telephone === "") {
        alert("Merci de renseigner tous les éléments");
        return;
      }

      var contact = {
        prenom: prenom,
        nom: nom,
        telephone: telephone
      };

      contacts.push(contact);

      sauvegarderContacts();
      afficherContacts();
      viderChamps();
    }

    function afficherContacts() {
      var listeContacts = document.getElementById("contacts-liste");

      // Effacer le contenu de la table
      listeContacts.innerHTML = "";

      var headerRow = document.createElement("tr");

      var headerCell1 = document.createElement("th");
      headerCell1.textContent = "Prénom";
      headerRow.appendChild(headerCell1);

      var headerCell2 = document.createElement("th");
      headerCell2.textContent = "Nom";
      headerRow.appendChild(headerCell2);

      var headerCell3 = document.createElement("th");
      headerCell3.textContent = "Numéro de téléphone";
      headerRow.appendChild(headerCell3);

      var headerCell4 = document.createElement("th");
      headerCell4.textContent = "Modification";
      headerRow.appendChild(headerCell4);

      var headerCell5 = document.createElement("th");
      headerCell5.textContent = "Suppression";
      headerRow.appendChild(headerCell5);

      listeContacts.appendChild(headerRow);

      for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        var row = document.createElement("tr");

        var cell1 = document.createElement("td");
        cell1.textContent = contact.prenom;
        row.appendChild(cell1);

        var cell2 = document.createElement("td");
        cell2.textContent = contact.nom;
        row.appendChild(cell2);

        var cell3 = document.createElement("td");
        cell3.textContent = contact.telephone;
        row.appendChild(cell3);

        var cell4 = document.createElement("td");
        var modifierBtn = document.createElement("button");
        modifierBtn.innerHTML = '<i class="fas fa-edit"></i>';
        modifierBtn.addEventListener("click", (function(index) {
          return function() {
            modifierContact(index);
          };
        })(i));
        cell4.appendChild(modifierBtn);
        row.appendChild(cell4);

        var cell5 = document.createElement("td");
        var supprimerBtn = document.createElement("button");
        supprimerBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        supprimerBtn.addEventListener("click", (function(index) {
          return function() {
            supprimerContact(index);
          };
        })(i));
        cell5.appendChild(supprimerBtn);
        row.appendChild(cell5);

        listeContacts.appendChild(row);
      }
    }

    function viderChamps() {
      document.getElementById("prenom").value = "";
      document.getElementById("nom").value = "";
      document.getElementById("telephone").value = "";
    }

    function supprimerContact(index) {
      contacts.splice(index, 1);
      sauvegarderContacts();
      afficherContacts();
    }

    function modifierContact(index) {
      var contact = contacts[index];
      var prenom = prompt("Entrez le nouveau prénom", contact.prenom);
      var nom = prompt("Entrez le nouveau nom", contact.nom);
      var telephone = prompt("Entrez le nouveau numéro de téléphone", contact.telephone);

      if (prenom !== null && nom !== null && telephone !== null) {
        contact.prenom = prenom;
        contact.nom = nom;
        contact.telephone = telephone;
        sauvegarderContacts();
        afficherContacts();
      }
    }

    function sauvegarderContacts() {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function chargerContacts() {
      var contactsData = localStorage.getItem("contacts");
      if (contactsData) {
        contacts = JSON.parse(contactsData);
        afficherContacts();
      }
    }