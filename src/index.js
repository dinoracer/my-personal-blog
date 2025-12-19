const converter = new showdown.Converter();

const output = document.getElementById("content");

async function fetchFileFrom(file) {
  return fetch(file).then((response) => response.text());
}

async function loadFileFrom(file) {
  let md = await fetchFileFrom(file);
  output.innerHTML = converter.makeHtml(md);
}

function reset() {
  output.innerHTML = "";
  let folder = "";
  fetch("Posts/index.json")
    .then((response) => response.json())
    .then((json) => {
      folder = json;

      folder.forEach((element) => {
        let child = document.createElement("button");
        child.setAttribute("class", "post-preview");
        child.addEventListener("click", () => {
          loadFileFrom("Posts/" + element);
        });

        child.innerHTML = element.slice(0, -3);
        output.appendChild(child);
      });
    });
}

reset();
