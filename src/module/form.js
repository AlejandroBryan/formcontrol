
import Modal from './modal.js';
export default class SubmitClientForm{

constructor() {
  this.form = document.querySelector("#contact");
  this.allFields = document.querySelectorAll("#contact .bm-input");
  this.insertValidationElements() 
  this.subject =  document.querySelector("#subject")
  this.subject.previousValue = ""
  this.email = document.querySelector("#email")
  this.email.previousValue = ""
  this.text = document.querySelector("#text")
  this.text.previousValue = ""
  this.modal =  new Modal;
  this.events()
  
}

// events
events() {
    this.form.addEventListener("submit",  e => {
     e.preventDefault();
       this.formSubmitHandler()
    })


    this.email.addEventListener("keyup", () => {
      this.isDifferent(this.email, this.emailHandler)
    })

    this.email.addEventListener("blur", () => {
      this.isDifferent(this.email, this.emailHandler)
    })

    this.text.addEventListener("keyup", () => {
      this.isDifferent(this.text, this.textHandler)
    })

    this.text.addEventListener("blur", () => {
      this.isDifferent(this.text, this.textHandler)
    })


    this.subject.addEventListener("keyup", () => {
      this.isDifferent(this.subject, this.subjectHandler)
    })

    this.subject.addEventListener("blur", () => {
      this.isDifferent(this.subject, this.subjectHandler)
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
this.emailAfterDelay()
this.textImmediately()
this.textAfterDelay()
this.subjectImmediately()
this.subjectAfterDelay()

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


// email section

emailHandler() {
  this.email.errors = false
  clearTimeout(this.email.timer)
  this.email.timer = setTimeout(() => this.emailAfterDelay(), 800)
}

emailAfterDelay() {

  if (!/^\S+@\S+$/.test(this.email.value)) {
    this.showValidationError(this.email, "You must provide a valid email address.")
  }

  if (!this.email.value) {
    this.hideValidationError(this.email)
  }
 

  if (!this.email.errors){
    this.hideValidationError(this.email)
  }

 
}
// email section



// text section

textHandler() {
  this.text.errors = false
  this.textImmediately()
  clearTimeout(this.text.timer)
  this.text.timer = setTimeout(() => this.textAfterDelay(), 800)
}

textImmediately() {
 
  if(this.text.value !== '' && this.text.value.length < 150){
   this.showValidationError(this.text, `You should provide more information.`);
  }

  if (this.text.value.length > 1000) {
    this.showValidationError(this.text, "Your message cannot exceed 500 characters.")
  }

  if (!this.text.errors) {
    this.hideValidationError(this.text)
  }
}

// text section 


// subject section

subjectHandler() {
  this.subject.errors = false
  this.subjectImmediately()
  clearTimeout(this.subject.timer)
  this.text.timer = setTimeout(() => this.subjectAfterDelay(), 800)
}

subjectImmediately() {
  if(this.subject.value !== '' && this.subject.value.length < 10){
   this.showValidationError(this.subject, "You should provide a longer title.")
  }

  if (!this.subject.errors) {
    this.hideValidationError(this.subject)
  }
}

subjectAfterDelay() {

  if (this.subject.value.length > 50) {
    this.showValidationError(this.subject, "Your message cannot exceed 50 characters.")
  }

  if (!this.subject.errors) {
    this.hideValidationError(this.subject)
  }

}


hideValidationError(el) {
    el.nextElementSibling.classList.remove("liveValidateMessage--visible")
  }  

showValidationError(el, msg) {
  el.nextElementSibling.innerHTML =`<p class="uk-text-small">${msg}</p>`;
  el.nextElementSibling.classList.add("liveValidateMessage--visible");
  el.errors = true;
}


textAfterDelay() {

  if (this.text.value < 50 && this.text.value.length >= 1) {
    this.showValidationError(this.text, "Your message is too short.")
  }

  if (!this.text.errors) {
    this.hideValidationError(this.text)
  }

}


insertValidationElements() {

  this.allFields.forEach((el)=> {
    el.insertAdjacentHTML('afterend',
                     `
                         <div class="uk-alert uk-border-rounded uk-alert-danger liveValidateMessage bm-small">
                             
                         </div>

                     `
         )
       }
    )
  }     
}
 