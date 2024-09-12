let imgUrl;
const img = document.getElementById("img");
const form = document.getElementById("form");
const div1 = document.getElementById('div1');
const itemName = document.getElementById("itemName");
const itemPrice = document.getElementById("itemPrice");
const category = document.getElementById("category");
const description = document.getElementById("description");
const brand = document.getElementById("brand");

category.value = "select"

const handleSelectImage = (ev) => {
    const file = ev.target.files[0]

    const reader = new FileReader()

    reader.addEventListener("load", (e)=>{
        const result = e.target.result;
        img.src = result;
        imgUrl = result;
    })
    reader.readAsDataURL(file)
};

const disItems = () => {
    fetch('http://localhost:1500/products').then(res=>res.json())
    .then((data)=>{
        for (let index = 0; index < data.length; index++) {
            const product = data[index];
            div1.innerHTML = `
            <div className="col-10 col-md-4 col-lg-3 mx-auto" key={product.id}>
            <div className="my-2 p-3 productDiv">
                <div className='d-flex align-items-center justify-content-center rounded-4 productImage' style={{ width: "100%", height: "250px"}}>
                    <img className='' width={"90%"} height={"90%"} src=${product.img} alt=${product.name} />
                </div>
                <div className="card-body">
                    <h5 className='productText'>${product.name}</h5>
                    <h6 className='productText'>${product.description}</h6>
                    <p className='productText'>N${product.price}</p>
                    <p className='productText'>${product.brand}</p>
                </div>
                <div className='d-flex justify-content-between p-3'>
                    <button className='buttonLink' onClick="">Edit Product</button>
                    <button className='buttonLink' onClick="">Delete</button>
                </div>
            </div>
        </div>
            `;
        }
    }).catch(err => {
        console.log(err.message);
    })

}

disItems();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let item = {
        name: itemName.value,
        price: Number(itemPrice.value),
        description: description.value,
        category: category.value,
        brand: brand.value,
        img: imgUrl
    }
    fetch('http://localhost:1234/products', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(item)
    }).then(() => {
        alert("Item Posted Successfully!!");
        window.location.href = "admin.html";
    })
})