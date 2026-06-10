const themeToggle=document.querySelector(".theme-toggle").addEventListener("click",function(event){
    if(event.target.checked){
        document.documentElement.setAttribute("data-theme","dark");
    }else{
        document.documentElement.setAttribute("data-theme","light");
    }
});
const glowObjs=document.querySelectorAll("#glow");
const onScroll=document.addEventListener("scroll",()=>{
  document.body.classList.add('user-is-moving');
  console.log("scrolling");
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    document.body.classList.remove('user-is-moving');
    console.log("fade");
  }, 150);
});