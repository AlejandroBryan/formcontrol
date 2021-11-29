
import Modal from './modal.js';
export default class Form{

constructor() {
  this.form = document.querySelector("#contact");
  this.allFields = document.querySelectorAll("#contact .bm-control");
  this.insertValidationElements() 

  this.name =  document.querySelector("#name")
  this.name.previousValue = ""

  this.email = document.querySelector("#email")
  this.email.previousValue = ""

  this.phone = document.querySelector("#phone")
  this.phone.previousValue = ""

  this.comment = document.querySelector("#comment")
  this.comment.previousValue = ""

  this.city = document.querySelector("#city")
  this.city.previousValue = ""

  this.state = document.querySelector("#i-state")
  this.state.previousValue = ""

  this.address = document.querySelector("#address")
  this.address.previousValue = ""

  this.zip = document.querySelector("#zip")
  this.zip.previousValue = ""

  this.modal =  new Modal;
  this.events()
  
}

// events

events() {

    this.form.addEventListener("submit",  e => {
     e.preventDefault();
       this.formSubmitHandler()
    })

    this.name.addEventListener("keyup", () => {
        this.isDifferent(this.name, this.nameHandler)
      })
  
      this.name.addEventListener("blur", () => {
        this.isDifferent(this.name, this.nameHandler)
      })

      this.phone.addEventListener("keyup", () => {
        this.isDifferent(this.phone, this.phoneHandler)
      })
  
      this.phone.addEventListener("blur", () => {
        this.isDifferent(this.phone, this.phoneHandler)
      })


    this.email.addEventListener("keyup", () => {
      this.isDifferent(this.email, this.emailHandler)
    })

    this.email.addEventListener("blur", () => {
      this.isDifferent(this.email, this.emailHandler)
    })
    
    this.phone.addEventListener("keyup", () => {
        this.isDifferent(this.phone, this.phoneHandler)
      })
  
      this.phone.addEventListener("blur", () => {
        this.isDifferent(this.phone, this.phoneHandler)
      })

      
    this.address.addEventListener("keyup", () => {
        this.isDifferent(this.address, this.addressHandler)
      })
  
      this.address.addEventListener("blur", () => {
        this.isDifferent(this.address, this.addressHandler)
      })

    this.comment.addEventListener("keyup", () => {
      this.isDifferent(this.comment, this.commentHandler)
    })

    this.comment.addEventListener("blur", () => {
      this.isDifferent(this.comment, this.commentHandler)
    })



}

// methods
isDifferent(el, handler) {
  if (el.previousValue != el.value) {
    handler.call(this)
  }
  el.previousValue = el.value
}


formSubmitHandler() {
this.name
thi    
this.emailAfterDelay()
this.commentImmediately()
this.commentAfterDelay()
this.phoneImmediately()
this.phoneAfterDelay()

if(!this.subject.errors && !this.email.errors && !this.text.errors) {
  this.submitHandler()
}

}




submitHandler() {
const email = this.email.value
const subject= this.subject.value
const text = this.text.value

const data = {email, subject, text}    

axios.post('/contact', data)
      .then((response) =>{
        new Spinner().show();
     if(response.status === 200) {
       new Spinner().hide();
      this.modal.show('information successfully submitted, I really appreciate it!', 'Success', 'success');
      this.form.reset();
     }

      })
      .catch(err =>{

        if(err){
          this.modal.show('There was an error while submitting this data' || err.response.data, 'Warning', 'warning');
        }
      })
      this.modal.close();
}
//name section

nameHandler() {
    this.name.errors = false
    this.nameImmediately()
    clearTimeout(this.name.timer)
    this.name.timer = setTimeout(() => this.nameAfterDelay(), 800)
  }
  
  nameImmediately() {
   
    if(this.name.value !== '' && this.name.value.length < 5){
     this.showValidationError(this.name, `Please provide a longer name.`);
    }
  
    if (this.name.value.length > 50) {
      this.showValidationError(this.name, "Your name cannot exceed 50 characters.")
    }
  
    if (!this.name.errors) {
      this.hideValidationError(this.name)
    }
  }

  nameAfterDelay() {
  
    if (this.name.value > 30 && this.name.value.length >= 1) {
      this.showValidationError(this.name, "Name is too short.")
    }
  
    if (!this.name.errors) {
      this.hideValidationError(this.name)
    }
  
  }
  
  
    


// email section

emailHandler() {
  this.email.errors = false
  clearTimeout(this.email.timer)
  this.email.timer = setTimeout(() => this.emailAfterDelay(), 800)
}

emailAfterDelay() {

  if (!/^\S+@\S+$/.test(this.email.value)) {
    this.showValidationError(this.email, "Please provide a valid email address.")
  }

  if (!this.email.value) {
    this.hideValidationError(this.email)
  }
 

  if (!this.email.errors){
    this.hideValidationError(this.email)
  }

 
}


// phone section

phoneHandler() {
    this.phone.errors = false
    this.phoneImmediately()
    clearTimeout(this.phone.timer)
    this.phone.timer = setTimeout(() => this.phoneAfterDelay(), 800)
  }
  
  phoneImmediately() {
    if(!/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(this.phone.value)){
     this.showValidationError(this.phone, "Please enter a valid phone number.")
    }
  
    if (!this.phone.errors) {
      this.hideValidationError(this.phone)
    }
  }
  
  phoneAfterDelay() {
  
    if (this.phone.value.length > 50) {
      this.showValidationError(this.phone, "Your message cannot exceed 50 characters.")
    }
  
    if(this.phone.value.length === 0){
        this.hideValidationError(this.phone)
    }
  
    if (!this.phone.errors) {
      this.hideValidationError(this.phone)
    }
  
  }

  // address section

addressHandler() {
    this.address.errors = false
    this.addressImmediately()
    clearTimeout(this.address.timer)
    this.address.timer = setTimeout(() => this.addressAfterDelay(), 800)
  }
  
  addressImmediately() {
    if(this.address.value.length < 4){
     this.showValidationError(this.address, `Please enter a valid address`)
    }
  
    if (!this.address.errors) {
      this.hideValidationError(this.address)
    }
  }
  
  addressAfterDelay() {
  
    if (this.address.value.length > 30) {
      this.showValidationError(this.address, "Your address cannot exceed 30 characters.")
    }
  
   
  
    if (!this.address.errors) {
      this.hideValidationError(this.address)
    }
  
  }



// comment section

commentHandler() {
  this.comment.errors = false
  this.commentImmediately()
  clearTimeout(this.comment.timer)
  this.comment.timer = setTimeout(() => this.commentAfterDelay(), 800)
}

commentImmediately() {
 
  if(this.comment.value !== '' && this.comment.value.length < 150){
   this.showValidationError(this.comment, `Please write at least 150 characters.`);
  }

  if (this.comment.value.length > 1000) {
    this.showValidationError(this.comment, "Your comment can not exceed 500 characters.")
  }

  if (!this.comment.errors) {
    this.hideValidationError(this.comment)
  }
}

commentAfterDelay() {

    if (this.comment.value < 50 && this.comment.value.length >= 1) {
      this.showValidationError(this.comment, "Your comment is too short.")
    }
  
    if (!this.comment.errors) {
      this.hideValidationError(this.comment)
    }
  
  }
  







hideValidationError(el) {
    el.nextElementSibling.classList.remove("liveValidateMessage--visible")
  }  

showValidationError(el, msg) {
  el.nextElementSibling.innerHTML =`<p>${msg}</p>`;
  el.nextElementSibling.classList.add("liveValidateMessage--visible");
  el.errors = true;
}

insertValidationElements() {

  this.allFields.forEach((el)=> {
    el.insertAdjacentHTML('afterend',
                     `
                         <div class="bm-alert bm-danger liveValidateMessage bm-small">
                             
                         </div>

                     `
         )
       }
    )
  }     
}
 