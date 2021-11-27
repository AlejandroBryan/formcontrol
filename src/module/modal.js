export default class Modal {
    constructor(){
      this.modal = document.querySelector("#my-modal")
      this.closeButton = document.querySelector(".bm-close-button")
      this.title = document.querySelector(".bm-modal-title")
      this.body = document.querySelector(".bm-modal-body")
     this.events()
   }
  
  
   events(){
  
      window.addEventListener('click', (e) => {
          if (e.target ==this.modal) {
            this.close();
          }
       })
  
       this.closeButton.addEventListener('click', () => {
  
        this.close();
  
  
       })
  
  }
  
  show(message, title, status) {
      this.modal.style.display = "block"; 
      this.title.innerText = title;
      this.title.style.color = `${status}`;
      this.body.innerHTML = ` <p>${message}</p>`;
      this.modal.style.color = `${status}`;
  }
  
  
  close(){
      this.modal.style.display = "none";
  }
  
  }