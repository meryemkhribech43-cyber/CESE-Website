forms.forEach(form => {
  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      // Afficher une alerte Bootstrap
      const alertBox = document.getElementById('successAlert');
      alertBox.classList.remove('d-none');
    }
    form.classList.add('was-validated');
  });
});