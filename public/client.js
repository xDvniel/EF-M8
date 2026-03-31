const registerForm = document.getElementById('registerForm');

if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const message = document.getElementById('registerMessage');

    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      message.textContent = data.mensaje || data.error;

    } catch {
      message.textContent = 'Error en registro';
    }
  });
}

const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const message = document.getElementById('loginMessage');

    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        message.textContent = 'Login exitoso';
      } else {
        message.textContent = data.error;
      }

    } catch {
      message.textContent = 'Error en login';
    }
  });
}

const perfilBtn = document.getElementById('perfilBtn');

if (perfilBtn) {
  perfilBtn.addEventListener('click', async () => {
    const token = localStorage.getItem('token');
    const perfilData = document.getElementById('perfilData');

    try {
      const res = await fetch('/perfil', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      perfilData.textContent = JSON.stringify(data, null, 2);

    } catch {
      perfilData.textContent = 'Error al obtener perfil';
    }
  });
}