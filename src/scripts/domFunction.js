import '../styles/style.css';

const pageLoad = () => {
    document.getElementById()
}

const childrenRemover = (parentElement) => {
    while(document.getElementById(parentElement).hasChildNodes()){
        document.getElementById(parentElement).removeChild(document.getElementById(parentElement).firstChild);
    }
}

const childRemover = (parentElement,index) => {
    document.getElementById(parentElement).removeChild(document.getElementById(parentElement).childNodes[index]);
}

export {childRemover,childrenRemover};