document.addEventListener("DOMContentLoaded", () => {
    const input1 = document.querySelector("#expans");
    const input2 = document.querySelector("#amount");
    const submit = document.querySelector("#expans_form");
    const list = document.querySelector(".list");
   let expanslist = JSON.parse(localStorage.getItem("expanslist")) || [];
    let initalprice=0;
    
     price = expanslist.reduce((sum, currentvalue) => sum + currentvalue.amount, initalprice);
    expanslist.forEach(expans => render(expans, list));
    renderprice(price);







    submit.addEventListener("submit", (e) => {
        console.log("working");
        e.preventDefault();
        let expansname = input1.value.trim();
        let eamount = parseFloat(input2.value.trim());
       

        if (expansname !== "" && eamount > 0 && eamount !== NaN) {
            let obj1 = {
                name: expansname,
                amount: eamount,
                id: Date.now()
            };

            expanslist.push(obj1);
         savedata(expanslist);
            
            render(obj1, list);
            initalprice=0;
            price = expanslist.reduce((sum, currentvalue) => sum + currentvalue.amount, initalprice);
            renderprice(price);

               
          
            input1.value="";
            input2.value="";
       

        }
        else{
           
            throwerror();
            input1.value="";
            input2.value="";
       
        }


      


    })


    function throwerror(){
    
        let iteam = document.querySelector(".scrool");
        let div=document.createElement('div');
        div.id="error1"

        let span = document.createElement('span');
        span.innerHTML=`please enter right vales  `;
        span.classList="error";

        let btn = document.createElement('button');
        btn.classList = "red_button";
        let img=document.createElement('img');
        

        btn.innerHTML=`<img src="cross.svg"></img>`;
        btn.classList = "errorbtn";
        div.appendChild(span);
        div.appendChild(btn);
        iteam.insertAdjacentElement("afterbegin",div);
        btn.addEventListener("click",()=>{
             div.remove();
        })

    }
    function render(expans, list) {
        let iteam = document.createElement('li');
        let span = document.createElement('span');
        let btn = document.createElement('button');
        btn.textContent = "delete";
        btn.classList = "red_button";
        span.innerHTML = `${expans.name}  -  $${expans.amount}.00`;
        iteam.appendChild(span);
        iteam.appendChild(btn);
        list.appendChild(iteam);
        let remove=document.getElementById('error1');
        if(remove!==null){
        remove.remove()}
        btn.addEventListener("click",(e)=>{
             expanslist=expanslist.filter(t =>t.id !== expans.id)
            savedata(expanslist);
            initalprice=0;
            price = expanslist.reduce((sum, currentvalue) => sum + currentvalue.amount, initalprice);
            iteam.remove();
            renderprice(price)
          
        })
    }
})

     function savedata(expans) {
    localStorage.setItem("expanslist", JSON.stringify(expans));
     }



   
    function renderprice(price){

        let priceholder = document.getElementById('total');
        priceholder.innerHTML=`Total-$${price}`;
       
 
 
    }