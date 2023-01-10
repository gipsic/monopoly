const $ = (q) => document.querySelectorAll(q);
    const logger = (...arg) => {
      console.log(...arg);
      
      let d = document.createElement("div");
      d.setAttribute("class", "log-item");
      d.setAttribute("time", moment().format("HH:mm:ss"));
      d.innerHTML = arg.join(" ");
      $(".log-content")[0].prepend(d);
    }
    const showPage = (id) => {
      $(".pages > .page").forEach(a => {
        if (a.id === "p-" + id) {
          a.style.display = 'block'
        } else {
          a.style.display = 'none'
        }
      })
    }