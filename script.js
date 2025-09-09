
// Simple auth using localStorage
function registerUser(ev){ev.preventDefault();const u=document.getElementById('reg-username').value;const p=document.getElementById('reg-password').value;let users=JSON.parse(localStorage.getItem('rfz_users')||'[]');if(users.find(x=>x.username===u)){alert('Username sudah terpakai');return}users.push({username:u,password:p});localStorage.setItem('rfz_users',JSON.stringify(users));alert('Registrasi berhasil');location.href='login.html'}
function loginUser(ev){ev.preventDefault();const u=document.getElementById('login-username').value;const p=document.getElementById('login-password').value;let users=JSON.parse(localStorage.getItem('rfz_users')||'[]');const ok=users.find(x=>x.username===u && x.password===p);if(ok){localStorage.setItem('rfz_session',JSON.stringify({username:u}));location.href='index.html'}else{alert('Login gagal')}} 
function ensureAuth(){if(!localStorage.getItem('rfz_session')){location.href='login.html'}} 
function logout(){localStorage.removeItem('rfz_session');location.href='login.html'}

// Tabs
function openCategory(name, btn){document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active')); if(btn) btn.classList.add('active'); document.querySelectorAll('.category').forEach(c=>c.style.display='none'); const el=document.getElementById(name); if(el) el.style.display='grid'}

// Cart (localStorage)
let CART = JSON.parse(localStorage.getItem('rfz_cart')||'[]');
function saveCart(){localStorage.setItem('rfz_cart',JSON.stringify(CART)); updateCartCount()}
function addToCart(id,name,price,img){ const it = CART.find(x=>x.id===id); if(it) it.qty++; else CART.push({id,name,price,qty:1,img}); saveCart(); alert(name + ' ditambahkan ke keranjang') }
function updateCartCount(){const el=document.getElementById('cart-count'); if(el){ const total=CART.reduce((s,i)=>s+i.qty,0); el.textContent=total }} 
function renderCart(){ensureAuth(); const container=document.getElementById('cart-items'); if(!container) return; container.innerHTML=''; let total=0; CART.forEach(item=>{ total+=item.price*item.qty; const div=document.createElement('div'); div.className='card'; div.style.display='flex'; div.style.alignItems='center'; div.style.gap='12px'; div.innerHTML=`<img src="${item.img}" style="width:80px;height:60px;object-fit:cover;border-radius:6px"><div style="flex:1"><strong>${item.name}</strong><div>Rp ${item.price.toLocaleString('id')}</div></div><div><input type="number" value="${item.qty}" min="1" style="width:60px" onchange="changeQty('${item.id}',this.value)"></div>`; container.appendChild(div) }); document.getElementById('cart-total').textContent = total.toLocaleString('id') }
function changeQty(id,val){ const it=CART.find(x=>x.id===id); if(it){it.qty = parseInt(val)||1; saveCart(); renderCart();} }
function checkoutSubmit(ev){ev.preventDefault(); alert('Pembayaran diterima. Terima kasih!'); CART=[]; saveCart(); location.href='index.html' }

document.addEventListener('DOMContentLoaded',()=>{ updateCartCount(); // default open first category
  const first = document.querySelector('.tab-btn'); if(first) openCategory(first.dataset_cat, first);
  if(document.getElementById('loginForm')) document.getElementById('loginForm').addEventListener('submit',loginUser);
  if(document.getElementById('registerForm')) document.getElementById('registerForm').addEventListener('submit',registerUser);
  if(document.getElementById('checkoutForm')) document.getElementById('checkoutForm').addEventListener('submit',checkoutSubmit);
  if(document.getElementById('cart-items')) renderCart();
});
