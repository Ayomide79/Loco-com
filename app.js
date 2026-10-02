(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var money = function (n) { return "$" + Number(n).toLocaleString("en-US"); };
  var active = function () { return window.CARS.filter(function (c) { return c.active; }); };
  var byId = function (id) { return active().filter(function (c) { return c.id === id; })[0]; };
  var param = function (k) { return new URLSearchParams(location.search).get(k); };
  var el = function (tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { if (k === "text") e.textContent = attrs[k]; else e.setAttribute(k, attrs[k]); });
    (kids || []).forEach(function (k) { e.appendChild(k); });
    return e;
  };

  // Shared header/footer
  var h = $("#site-header");
  if (h) h.innerHTML = '<div class="wrap"><a href="index.html" class="logo">LOCO<b>.com</b></a><nav><a href="index.html#cars">Cars</a><a href="#contact">Contact</a></nav></div>';
  var f = $("#site-footer");
  if (f) {
    var C = window.CONTACT;
    f.innerHTML = '<div class="wrap cols"><div><strong style="color:#fff;font-size:1.2rem">LOCO.com</strong><p>Request a car, get a reply from the owner. Payment is arranged directly with the owner after approval.</p></div>' +
      '<div><strong style="color:#fff">Email</strong>' + C.emails.map(function (e) { return '<div><a href="mailto:' + e + '">' + e + '</a></div>'; }).join("") + '</div>' +
      '<div><strong style="color:#fff">Phone</strong>' + C.phones.map(function (p) { return '<div><a href="tel:' + p.replace(/\D/g, "") + '">' + p + '</a></div>'; }).join("") + '</div></div>';
  }

  // Home: car grid
  var grid = $("#car-grid");
  if (grid) {
    var cars = active();
    if (!cars.length) grid.replaceWith(el("div", { "class": "panel", text: "No cars are listed yet. Check back soon or contact us below." }));
    cars.forEach(function (c) {
      var a = el("a", { "class": "card", href: "car.html?id=" + encodeURIComponent(c.id) }, [
        el("img", { "class": "ph", src: c.images[0] || "placeholder.svg", alt: c.name, loading: "lazy" }),
        el("div", { "class": "bd" }, [
          el("h3", { text: c.name }),
          el("p", { text: c.description }),
          el("div", { "class": "price", text: money(c.price_per_day) + " / day" })
        ])
      ]);
      grid.appendChild(a);
    });
  }

  // Car page
  var box = $("#car-detail");
  if (box) {
    var car = byId(param("id"));
    if (!car) { box.appendChild(el("div", { "class": "panel", text: "This car is not available." })); }
    else {
      document.title = car.name + " | LOCO.com";
      var main = el("img", { "class": "gal-main", src: car.images[0], alt: car.name });
      var left = el("div", {}, [main]);
      if (car.images.length > 1) {
        var th = el("div", { "class": "thumbs" });
        car.images.forEach(function (src, i) {
          var t = el("img", { src: src, alt: car.name + " photo " + (i + 1), "class": i ? "" : "on" });
          t.onclick = function () { main.src = src; Array.prototype.forEach.call(th.children, function (x) { x.className = ""; }); t.className = "on"; };
          th.appendChild(t);
        });
        left.appendChild(th);
      }
      var avail = car.booked.length
        ? el("div", {}, [el("p", { text: "Already booked:" }), el("ul", {}, car.booked.map(function (b) { return el("li", { text: b.from + " to " + b.to }); }))])
        : el("p", { "class": "okbox", text: "Open for any dates right now." });
      var right = el("div", { "class": "panel" }, [
        el("h1", { style: "font-size:2rem", text: car.name }),
        el("div", { "class": "price", style: "margin-bottom:12px", text: money(car.price_per_day) + " / day" }),
        el("p", { style: "white-space:pre-line", text: car.description }),
        el("h3", { text: "Availability" }), avail,
        el("a", { "class": "btn", style: "display:block;margin-top:12px", href: "booking.html?car=" + encodeURIComponent(car.id), text: "Request this car" })
      ]);
      box.appendChild(left); box.appendChild(right);
    }
  }

  // Booking page
  var form = $("#booking-form");
  if (form) {
    var sel = $("#car-select");
    active().forEach(function (c) { sel.appendChild(el("option", { value: c.id, text: c.name + " (" + money(c.price_per_day) + "/day)" })); });
    if (param("car") && byId(param("car"))) sel.value = param("car");
    form.addEventListener("submit", function (e) {
      var c = byId(sel.value), err = $("#form-error");
      err.style.display = "none";
      var fail = function (m) { e.preventDefault(); err.textContent = m; err.style.display = "block"; err.scrollIntoView({ behavior: "smooth", block: "center" }); };
      if (!c) return fail("Choose a car.");
      var a = new Date(form.pickup_time.value), b = new Date(form.dropoff_time.value);
      if (isNaN(a) || isNaN(b)) return fail("Enter pickup and drop-off date and time.");
      if (a < new Date()) return fail("Pickup time must be in the future.");
      if (b <= a) return fail("Drop-off must be after pickup.");
      var clash = c.booked.some(function (r) { return a < new Date(r.to + "T23:59:59") && b > new Date(r.from + "T00:00:00"); });
      if (clash) return fail("Those dates overlap an existing booking for this car. Choose different dates.");
      $("#car-name").value = c.name;
      e.preventDefault();
      if (!window.FORM_ENDPOINT) return fail("Booking is not connected yet. Please call or email us using the details below.");
      var btn = $("#send-btn"); btn.disabled = true; btn.textContent = "Sending...";
      fetch(window.FORM_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) })
        .then(function (r) { if (r.ok) location.href = "thanks.html"; else throw new Error(); })
        .catch(function () { btn.disabled = false; btn.textContent = "Send rental request"; fail("Could not send your request. Please try again or call us."); });
    });
  }
})();
