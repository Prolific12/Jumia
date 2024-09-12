const search = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchButton");
const productDiv = document.getElementById("productDiv");
const product = document.getElementById("product");
const cool = false;
const goodSection = document.getElementById("goodSection");
const fullname = document.getElementById("fullname");
const email = document.getElementById("signInput");
const password = document.getElementById("password");
const cpassword = document.getElementById("cpassword");
const spaneye = document.getElementById("spaneye");
const divSection = document.getElementById("divSection");
const pdisplay = document.getElementById("pdisplay");
const logOut = document.getElementById("logOut");
const searchDisplay = document.getElementById("searchDisplay");

const create = ()=>{
    if (!email.value || !password.value || !cpassword.value) {
        alert("Please input your details")
    }
    if (password.value !== cpassword.value) {
        alert("Passwords do not match");
        return;
    }
    else{
        fetch('http://localhost:1300/accounts')
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch accounts');
            }
            return res.json();
        }).then(accounts =>{
            const emailExists = accounts.some(account => account.email === email);

            if (emailExists) {
                alert("This email is already registered. Please use a different email.");
            } else{
                const account = {
                    fullname: fullname.value,
                    email: email.value,
                    password: password.value,
                }
                fetch('http://localhost:1300/accounts',{
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(account)
                }).then((response)=>{
                    if (response.ok) {
                        localStorage.setItem('user', JSON.stringify(account));
                        alert("You have successfully created your account");
                        console.log(account);
                        window.location.href = "dashboard.html";
                    } else {
                        alert("Failed to create account");
                    }
                }).catch(error => {
                    console.error("Error fetching accounts:", error);
                    alert("An error occurred while checking your email.")
                });
            }
        }).catch(error => {
            console.error("Error fetching account: ", error);
            alert("An error occurred while checking your email.")
        })
    }
}

    const signin = () => {
        const log_email = document.getElementById("log_email").value.trim();
        const log_pass = document.getElementById("log_pass").value.trim();
        if (log_email && log_pass) {
            fetch('http://localhost:1300/accounts')
            .then(res =>{
                if (!res.ok) {
                    throw new Error('Failed to fetch accounts')
                }
                return res.json();
            })
            .then(data => {
                console.log('Fetch accounts:', data);
                // if (log_email === data.email && log_pass === data.password) {
                //     alert("Login Successful!");
                //     window.location.href = "Dashboard.html";
                // } else (error) => {
                //     alert("Incorrect email or password");
                //     console.log(error);
                // }
                const user = data.find(accounts => {
                    console.log(`Checking account: ${accounts.email} vs ${log_email}`);
                    return accounts.email === log_email && accounts.password === log_pass
                });

                if (user) {
                    // Store user info in session storage
                    localStorage.setItem('user', JSON.stringify(user));
                    
                    // Redirect to dashboard
                    alert("Login successful! Redirecting to your dashboard...");
                    window.location.href = 'dashboard.html';
                } else {
                    // If no user matches, show error message
                    alert("Incorrect email or password");
                }
            }).catch(error => {
                console.error("Error during login:", error);
                alert("An error occurred while logging in")
            })
        } else {
            alert ("Please Enter Your Email and Password");
            // console.log(err);
        }
    }

    function logOutBtn(){
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            sessionStorage.removeItem('user');
            window.location.href = 'signup.html';
        }
    }
    

// window.addEventListener("DOMContentLoaded", () => {
//     fetch('http://localhost:1300/accounts')
//     .then(res => res.json())
//     .then((data) => {
//         data.forEach((account) => {
//             pdisplay.innerHTML += `<p>${account.email}</p>`;
//         });
//     })
//     .catch((err) => {
//         console.error("Error fetching accounts:", err);
//     });
// });



searchBtn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the page from refreshing
    const searchValue = search.value.trim(); // Get the search input value

    const searchvalue = search.value.toLowerCase();
    if (searchValue) {
        // Redirect to another page with the search value as a query parameter
        window.location.href = `search.html?search=${encodeURIComponent(searchValue)}`;
    } else {
        alert("Please enter a search term");
    }
})

// const showItem = ()=>{
//     fetch(`http://localhost:1234/products`)
//     .then(res=>res.json())
//     .then((data)=>(
    //         data.map((product) => {
        //             console.log(product.id);
//             productDiv.innerHTML += `
//                     <div id="product" onclick="produce()">
//                         <img class="rounded" width="188px" height="250px" src=${product.img}>
//                         <div class="row d-flex align-items-center justify-content-center">
//                             <span>${product.name}</span>
//                             <span><i class="fa-solid fa-naira-sign"></i>${product.price}</span>
//                         </div>
//                     </div>
//                 `
//                         // </a>
//                     /*</a>*/
//         })
//     ))
// }


const showItem = () => {
    fetch('http://localhost:1234/products')
    .then(res => res.json())
    .then((data) => {
        console.log("Fetched data:", data); // Check if data is fetched
        const productsContainer = document.querySelector('#productDiv');
        
        if (!productsContainer) {
            console.error("Error: #productDiv not found in the DOM.");
            return;
        }

        data.forEach((product) => {
            console.log("Product data:", product); // Log each product

            // Create the product container div
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');  // Added class instead of id
            productDiv.setAttribute('onclick', `window.location.href='goods.html?id=${product.id}'`);
            
            // Add inner HTML for product
            productDiv.innerHTML = `
            <img class="rounded" width="188px" height="250px" src="${product.img}" alt="${product.name}">
            <div class="row d-flex align-items-center justify-content-center">
            <span>${product.name}</span>
            <span><i class="fa-solid fa-naira-sign"></i>${product.price}</span>
            </div>
            `;
            
            // Append the productDiv to the container in the DOM
            productsContainer.appendChild(productDiv);
        });
    })
    .catch((err) => {
        console.error("Error fetching products:", err);
    });
}

window.addEventListener("DOMContentLoaded", showItem);
// showItem()
// product;

// product.addEventListener("click", (produce)=>{
//     fetch(`http://localhost:1234/products/${produce.id}`)
//     .then(res=>res.json())
//     .then((data)=>{
//         data.map((product)=>{
//             goodSection.innerHTML = `
//                 <div id="divSection">
//                     <div>
//                         <div>${product.img}</div>
//                         <div>
//                             <i class="fa-brands fa-facebook fa-2xl" style="color: #000000;"></i>
//                             <i class="fa-brands fa-square-twitter fa-2xl" style="color: #000000;"></i>
//                         </div>
//                     </div>
//                     <div>
//                         <span>${produce.name}</span>
//                         <span>${produce.brand}</span>
//                         <span>${produce.price}</span>
//                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                         <i class="fa-solid fa-star" style="color: #FFD43B;"></i>
//                         <i class="fa-regular fa-star" style="color: #FFD43B;"></i>
//                     </div>
//                 </div>
//             `
//         })
//     })
// })

// const produce = (id)=>{
//     console.log("Me");
// }


// product.addEventListener("click", (id)=>{
//     console.log("Me");
//     fetch(`https://localhost:1234/products/${id}`)
//     .then(res=>res.json())
//     .then((data)=>{
//         // console.log(data);
//         console.log(data.id);
//     });
// })

// const logout = ()=>{
//     // cools = false;
//     fetch('https://localhost:1300/account',{})
//     .then(res=>res.json())
//     .then((data)=>{
//         sessionStorage(email);
//         stop(sessionStorage(email));
//     })
//     // if () {
//     // }
// }

