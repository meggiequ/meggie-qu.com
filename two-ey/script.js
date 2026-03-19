const FLOWER_SVG = `<svg viewBox="0 0 83 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="27.963" cy="28.9984" rx="7.5438" ry="12.1861" transform="rotate(-35.4507 27.963 28.9984)" fill="white"/>
<ellipse cx="36.2123" cy="58.5126" rx="6.61596" ry="10.6873" transform="rotate(7.38623 36.2123 58.5126)" fill="white"/>
<ellipse cx="51.2361" cy="51.7144" rx="7.8848" ry="12.737" transform="rotate(-49.9533 51.2361 51.7144)" fill="white"/>
<ellipse cx="24.5864" cy="46.1525" rx="7.95845" ry="12.856" transform="rotate(-104.94 24.5864 46.1525)" fill="white"/>
<ellipse cx="58.1102" cy="35.6972" rx="6.95529" ry="13.8509" transform="rotate(-104.94 58.1102 35.6972)" fill="white"/>
<ellipse cx="44.0861" cy="24.3728" rx="6.95529" ry="13.8509" transform="rotate(-164.233 44.0861 24.3728)" fill="white"/>
<circle cx="40.9169" cy="40.2141" r="10.4453" transform="rotate(-25.828 40.9169 40.2141)" fill="white"/>
<circle cx="40.6474" cy="40.9893" r="5.22263" transform="rotate(-25.828 40.6474 40.9893)" fill="#FEB16F"/>
</svg>`;

function rand(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}
function overlaps(ax, ay, ar, bx, by, br, pad) {
  const dx = ax - bx, dy = ay - by;
  return Math.sqrt(dx*dx + dy*dy) < (ar + br + pad);
}

(function initFlowers() {
  const bg = document.getElementById('flowerBg');
  const vw = window.innerWidth, vh = window.innerHeight;
  const scale = Math.max(1, vw / 1440);
  const sizes = [60,72,88,100,116,130].map(s => Math.round(s * scale));
  const areaPerFlower = 38000 * Math.pow(vw / 390, 0.6);
  const count = Math.max(4, Math.round((vw * vh) / areaPerFlower));
  const placed = [];

  for (let i = 0; i < count; i++) {
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const r = size / 2;
    let cx, cy, ok = false;
    for (let a = 0; a < 300; a++) {
      cx = r + Math.random() * (vw - size);
      cy = r + Math.random() * (vh - size);
      ok = placed.every(p => !overlaps(cx, cy, r, p.cx, p.cy, p.r, 20));
      if (ok) break;
    }
    placed.push({ cx, cy, r });

    const el = document.createElement('div');
    el.className = 'flower';
    const dur = 14 + Math.random() * 18;
    const delay = -(Math.random() * dur);
    const opacity = 0.55 + Math.random() * 0.45;
    const drift = size * 0.55;
    el.style.cssText = `
      left:${cx-r}px; top:${cy-r}px;
      width:${size}px; height:${size}px;
      opacity:${opacity};
      animation-duration:${dur}s;
      animation-delay:${delay}s;
      --x1:${rand(-drift,drift)}px; --y1:${rand(-drift,drift)}px;
      --x2:${rand(-drift,drift)}px; --y2:${rand(-drift,drift)}px;
      --x3:${rand(-drift*.5,drift*.5)}px; --y3:${rand(-drift*.5,drift*.5)}px;
      --r1:${rand(-40,40)}deg; --r2:${rand(-80,80)}deg; --r3:${rand(-120,120)}deg;
    `;
    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 83 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="27.963" cy="28.9984" rx="7.5438" ry="12.1861" transform="rotate(-35.4507 27.963 28.9984)" fill="white"/>
<ellipse cx="36.2123" cy="58.5126" rx="6.61596" ry="10.6873" transform="rotate(7.38623 36.2123 58.5126)" fill="white"/>
<ellipse cx="51.2361" cy="51.7144" rx="7.8848" ry="12.737" transform="rotate(-49.9533 51.2361 51.7144)" fill="white"/>
<ellipse cx="24.5864" cy="46.1525" rx="7.95845" ry="12.856" transform="rotate(-104.94 24.5864 46.1525)" fill="white"/>
<ellipse cx="58.1102" cy="35.6972" rx="6.95529" ry="13.8509" transform="rotate(-104.94 58.1102 35.6972)" fill="white"/>
<ellipse cx="44.0861" cy="24.3728" rx="6.95529" ry="13.8509" transform="rotate(-164.233 44.0861 24.3728)" fill="white"/>
<circle cx="40.9169" cy="40.2141" r="10.4453" transform="rotate(-25.828 40.9169 40.2141)" fill="white"/>
<circle cx="40.6474" cy="40.9893" r="5.22263" transform="rotate(-25.828 40.6474 40.9893)" fill="#FEB16F"/>
</svg>`;
    bg.appendChild(el);
  }
})();

// Hide balloons when RSVP section is visible
(function initBalloonVisibility() {
  const rsvpSection = document.getElementById('rsvp');
  const balloonRow = document.querySelector('.balloon-row');
  if (!rsvpSection || !balloonRow) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      balloonRow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      if (e.isIntersecting) {
        balloonRow.style.opacity = '0';
        balloonRow.style.transform = 'translateY(20px)';
        balloonRow.style.pointerEvents = 'none';
      } else {
        balloonRow.style.opacity = '1';
        balloonRow.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  observer.observe(rsvpSection);
})();

// RSVP toggle
let selectedRsvp = 'going';
function selectBalloon(val) {
  // Pre-select the RSVP toggle
  const btn = document.querySelector(`.rsvp-toggle-btn[data-val="${val}"]`);
  if (btn) {
    document.querySelectorAll('.rsvp-toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedRsvp = val;
  }
  // Smooth scroll to RSVP section
  const rsvpSection = document.getElementById('rsvp');
  if (rsvpSection) {
    rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function selectRsvp(btn) {
  document.querySelectorAll('.rsvp-toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  selectedRsvp = btn.dataset.val;
}

// RSVP submit — connects to Airtable
async function submitRsvp() {
  const name = document.getElementById('rsvpName').value.trim();
  const phone = document.getElementById('rsvpPhone') ? document.getElementById('rsvpPhone').value.trim() : '';
  const guests = document.getElementById('rsvpGuests').value;
  const dietary = document.getElementById('rsvpDietary').value.trim();

  if (!name) {
    document.getElementById('rsvpName').focus();
    return;
  }

  const btn = document.querySelector('.rsvp-submit');
  btn.textContent = '...';
  btn.disabled = true;

  // ── AIRTABLE CONFIG ──
  const AIRTABLE_BASE_ID = 'appUT8qGxJExCheH8';
  const AIRTABLE_TOKEN   = 'patRKUzMDnmpmDWQP';
  const TABLE_NAME       = 'RSVPs';

  try {
    const res = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          'Name': name,
          'Phone number': phone,
          'Attending': selectedRsvp === 'going' ? 'Yes' : selectedRsvp === 'maybe' ? 'Maybe' : 'No',
          'Number of Guests': guests || '0',
          'Dietary Restrictions': dietary
        }
      })
    });

    if (res.ok) {
      document.getElementById('rsvpForm').style.display = 'none';
      document.getElementById('rsvpSuccess').classList.add('show');
    } else {
      const err = await res.json();
      console.error('Airtable error:', err);
      btn.textContent = 'RSVP';
      btn.disabled = false;
      alert('Something went wrong. Please try again.');
    }
  } catch(e) {
    console.error('Network error:', e);
    btn.textContent = 'RSVP';
    btn.disabled = false;
    alert('Something went wrong. Please check your connection and try again.');
  }
}