
const cars = [
    { name: "Bugatti", price: 3000000, img: "images/bugatti.jpg" },
    { name: "Lamborghini", price: 500000, img: "images/lamborghini.jpg" },
    { name: "Ferrari", price: 400000, img: "images/ferrari.jpg" },
    { name: "McLaren", price: 350000, img: "images/mclaren.jpg" },
    { name: "Porsche", price: 200000, img: "images/porsche.jpg" },
    { name: "Koenigsegg", price: 3200000, img: "images/koenigsegg.jpg" },
    { name: "Pagani", price: 2500000, img: "images/pagani.jpg" },
    { name: "Aston Martin", price: 300000, img: "images/aston martin.jpg" },
    { name: "Maserati", price: 150000, img: "images/maserati.jpg" },
    { name: "Bentley", price: 250000, img: "images/bentley.jpg" },
    { name: "Rolls-Royce", price: 450000, img: "images/rolls-royce.jpg" },
    { name: "Tesla", price: 130000, img: "images/tesla.jpg" },
    { name: "Rimac", price: 2100000, img: "images/rimac.jpg" },
    { name: "Lotus", price: 100000, img: "images/lotus.jpg" },
    { name: "Alfa Romeo", price: 80000, img: "images/alfa romeo.jpg" },
    { name: "Jaguar", price: 75000, img: "images/jaguar.jpg" },
    { name: "Mercedes-AMG", price: 180000, img: "images/mercedes-AMG.jpg" },
    { name: "BMW M", price: 90000, img: "images/bmw.jpg" },
    { name: "Audi R8", price: 160000, img: "images/audi.jpg" },
    { name: "Nissan GT-R", price: 115000, img: "images/nissan.jpg" },
    { name: "Chevrolet Corvette", price: 70000, img: "images/Chevrolet Corvette.jpg" },
    { name: "Ford GT", price: 500000, img: "images/ford gt.jpg" },
    { name: "Hennessey", price: 2000000, img: "images/hennessey.jpg" },
    { name: "SSC Tuatara", price: 1900000, img: "images/ssc.jpg" },
    { name: "Devel Sixteen", price: 1600000, img: "images/devel.jpg" },
    { name: "Zenvo", price: 1200000, img: "images/zenvo.jpg" },
    { name: "W Motors", price: 3400000, img: "images/w motors.jpg" },
    { name: "Acura NSX", price: 160000, img: "images/acura.jpg" },
    { name: "Maybach", price: 200000, img: "images/maybach.jpg" },
    { name: "Cadillac", price: 65000, img: "images/cadillac.jpg" },
    { name: "V-Series", price: 95000, img: "images/v-siries.jpg" }
];


const showroom = document.getElementById('carShowroom');
if (showroom) {
    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car.img}" alt="${car.name}" class="car-img">
            <h3>${car.name}</h3>
            <p>$${car.price.toLocaleString()}</p>
            <button onclick="saveForCheckout('${car.name}', ${car.price}, '${car.img}')">Buy Now</button>
        `;
        showroom.appendChild(card);
    });
}


function saveForCheckout(name, price, imgPath) {
    const selection = { name: name, price: price, img: imgPath };
    localStorage.setItem('userOrder', JSON.stringify(selection));
    window.location.href = "buy.html";
}


const checkoutPreview = document.getElementById('checkoutPreview');
if (checkoutPreview) {
    const data = JSON.parse(localStorage.getItem('userOrder'));
    if (data) {
        const rate = 129.00; 
        const priceSh = (data.price * rate).toLocaleString();
        
        checkoutPreview.innerHTML = `
            <div class="summary-card">
                <img src="${data.img}" alt="${data.name}" style="width:100%; max-width:450px; color:grey; border-radius:10px; border: 2px solid gold;">
                <h2 style="color:gold;">${data.name}</h2>
                <p>Price: $${data.price.toLocaleString()} USD</p>
                <p>Equivalent: ${priceSh} SH</p>
            </div>
        `;
    }
}


const purchaseForm = document.getElementById('purchaseForm');
if (purchaseForm) {
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const finalCar = JSON.parse(localStorage.getItem('userOrder'));
        let myGarage = JSON.parse(localStorage.getItem('myGarage')) || [];
        myGarage.push(finalCar);
        localStorage.setItem('myGarage', JSON.stringify(myGarage));
        alert("Purchase Confirmed! Added to your Garage.");
        window.location.href = "garage.html";
    });
}


const garageDisplay = document.getElementById('garageDisplay');
if (garageDisplay) {
    const myCars = JSON.parse(localStorage.getItem('myGarage')) || [];
    myCars.forEach((car, index) => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <button class="close-btn" onclick="removeOne(${index})">X</button>
            <img src="${car.img}" class="car-img">
            <h3>${car.name}</h3>
        `;
        garageDisplay.appendChild(card);
    });
}

function removeOne(index) {
    let myCars = JSON.parse(localStorage.getItem('myGarage'));
    myCars.splice(index, 1);
    localStorage.setItem('myGarage', JSON.stringify(myCars));
    location.reload();
}

const clearBtn = document.getElementById('clearGarageBtn');
if (clearBtn) { 
    clearBtn.onclick = () => { 
        if(confirm("Empty garage?")) {
            localStorage.removeItem('myGarage'); 
            location.reload(); 
        }
    }; 
}
