// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJ8vxOZ6Gx7N0cfidTPuS2EkDHS5R4PXQ",
  authDomain: "linkabsen-bb38f.firebaseapp.com",
  databaseURL: "https://linkabsen-bb38f-default-rtdb.firebaseio.com",
  projectId: "linkabsen-bb38f",
  storageBucket: "linkabsen-bb38f.firebasestorage.app",
  messagingSenderId: "909980411728",
  appId: "1:909980411728:web:b2d154a57310561fa1ae55"
};
// Inisialisasi Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

// Referensi ke elemen HTML
const inputData = document.getElementById("inputData");
const dataList = document.getElementById("dataList");
const passwordInput = document.getElementById("passwordInput");

// Fungsi untuk menyimpan data
function saveData() {
    const data = inputData.value;
    if (data) {
        db.collection("data").add({
            value: data
        }).then(() => {
            inputData.value = "";
            loadData();
        });
    }
}

// Fungsi untuk memuat data
function loadData() {
    dataList.innerHTML = "";
    db.collection("data").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const li = document.createElement("li");
            li.textContent = doc.data().value;
            dataList.appendChild(li);
        });
    });
}

// Fungsi untuk menghapus data dengan password
function deleteData() {
    const password = passwordInput.value;
    if (password === "082324609822") {
        db.collection("data").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                db.collection("data").doc(doc.id).delete();
            });
            loadData();
        });
    } else {
        alert("Password salah!");
    }
}

// Panggil loadData untuk pertama kali
loadData();
