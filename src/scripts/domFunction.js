import '../styles/style.css';



const childrenRemover = (parentElement) => {
    while(document.getElementById(parentElement).hasChildNodes()){
        document.getElementById(parentElement).removeChild(document.getElementById(parentElement).firstChild);
    }
}

const childRemover = (parentElement,index) => {
    document.getElementById(parentElement).removeChild(document.getElementById(parentElement).childNodes[index]);
    console.log("masuk")
    console.log(parentElement)
    console.log(document.getElementById(parentElement).childNodes);
}

document.getElementById("addCancelButton").addEventListener('click',function(e){
    document.getElementById("addTaskBG").style.display="none";
})

document.getElementById("addConfirmButton").addEventListener('click',function(e){
    document.getElementById("addTaskBG").style.display="none";
    let tanggalInput = document.getElementById("datepicker").value;
    console.log(formatDateISO(tanggalInput));
})

const formatDateISO = (date) => {
    return date[6]+date[7]+date[8]+date[9]+"-"+date[3]+date[4]+"-"+date[0]+date[1];
}

export {childRemover,childrenRemover};