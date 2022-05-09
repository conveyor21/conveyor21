var Number = 0;
                var tbody = document.getElementById('tbody1');

                function AddItemToTable(Time,Shape,Color,ObjectCount, Status){
                    let trow = document.createElement("tr");
                    let td1 = document.createElement('td');
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let td4 = document.createElement('td');
                    let td5 = document.createElement('td');
                    let td6 = document.createElement('td');

                    td1.innerHTML = ++Number;
                    td2.innerHTML = Time;
                    td3.innerHTML = Shape;
                    td4.innerHTML = Color;
                    td5.innerHTML = ObjectCount;
                    td6.innerHTML = Status;

                    trow.appendChild(td1);
                    trow.appendChild(td2);
                    trow.appendChild(td3);
                    trow.appendChild(td4);
                    trow.appendChild(td5);
                    trow.appendChild(td6);

                    tbody.appendChild(trow);
                }

                function AddAllItemToTable(TheObject){
                    Number=0;
                    tbody.innerHTML="";
                    TheObject.forEach(element => {
                        AddItemToTable(element.Time, element.Shape, element.Color, element.ObjectCount, element.Status);
                    });
                }

                import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
                
                const firebaseConfig = {
                    apiKey: "AIzaSyDW67AzpHjog5kJNMZVFKaoUtNcHwnktgY",
                    authDomain: "testmode-e795e.firebaseapp.com",
                    databaseURL: "https://testmode-e795e-default-rtdb.firebaseio.com",
                    projectId: "testmode-e795e",
                    storageBucket: "testmode-e795e.appspot.com",
                    messagingSenderId: "667651486025",
                    appId: "1:667651486025:web:7cec217a50a713f7862a98",
                };

                const app = initializeApp(firebaseConfig);

                import { getDatabase, ref, child, onValue, get }
                from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

                const db = getDatabase();

                function GetAllDataOnce(){
                    const dbRef = ref(db);

                    get(child(dbRef, "ObjectData"))
                    .then((snapshot)=>{
                        var objects =[];

                        snapshot.forEach(childSnapshot => {
                            objects.push(childSnapshot.val());
                        });
                        AddAllItemToTable(objects);
                    });
                }

                function GetAllDataRealtime(){
                    const dbRef = ref(db, "ObjectData");

                    onValue(dbRef,(snapshot)=> {
                        var objects =[];

                        snapshot.forEach(childSnapshot => {
                            objects.push(childSnapshot.val());
                        });
                        AddAllItemToTable(objects);
                    });
                }

                window.onload = GetAllDataRealtime;