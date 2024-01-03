fetch("https://fakestoreapi.com/products/1")
  .then((res) => res.json())
  .then((json) => console.log(json));
console.log(json);

var content = document.getElementById("content");

const show = json.map((item, index) => {
  return  ` <div class="card" style="width: 18rem;">
    <img src="" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"></h5>
      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
    `
});

content.innerHTML = show