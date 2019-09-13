// Code by Hamilton
const options = {
  behavior: "smooth",
  block: "start",
  inline: "nearest"
};

// Make all dt elements click forward to themselves
document.querySelectorAll("section").forEach(o=>{
  o.addEventListener("click",e=> o.scrollIntoView(options) )
});

// Make each side link bring forward that element
document.querySelectorAll("nav a").forEach(o=>{
  o.addEventListener("click",e=>{ e.preventDefault();
    document.querySelector(o.attributes.href.value).scrollIntoView(options)
  })
})

// When an element is scrolled into or out of view, it will change it's side link
window.addEventListener("scroll",e=>{
  const d = document.documentElement.scrollTop||document.body.scrollTop;
  const h = window.innerHeight;
  document.querySelectorAll("section").forEach(o=>{
    document.querySelector(`[href='#${o.id}']`).parentElement
      .classList[(o.getBoundingClientRect().top<h*0.5)?'add':'remove']("active");
  });
})