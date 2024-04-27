let container = document.getElementById('container')

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(data => {
    data.products.forEach(item => {
      console.log(item);

      let div = `
        <div class="card" style="width: 18rem;">
          <img src="${item.thumbnail}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${item.title}</h5>
            <h6 class="card-title">${item.category}</h6>
            <p class="card-text">${item.description}</p>
            <h6 class="card-title"> Price $${item.price}</h6>
            <span class='span' ><img class='rating' src="rating stars.png"/>${item.rating}</span>
          </div>
        </div>
      `;
      
      let divElement = document.createElement('div');
      divElement.innerHTML = div;
      container.appendChild(divElement);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
